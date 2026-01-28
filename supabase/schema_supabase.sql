-- ============================================
-- Dreamssaver – Supabase-native schema
-- Uses Supabase Auth (auth.users). Run in Supabase SQL Editor.
--
-- Steps:
-- 1. Supabase Dashboard > SQL Editor > New query
-- 2. Paste this ENTIRE file and click Run
-- 3. If you see "table not in schema cache": ensure the script ran with no
--    errors, then go to Table Editor and confirm "dream_recordings" exists.
--    Wait 10–20 sec or use Settings > API and reload if needed.
--
-- If you already have the old schema (users with password, VARCHAR ids),
-- run first: DROP VIEW IF EXISTS dream_with_insights, user_dashboard_summary;
--   DROP TABLE IF EXISTS ai_insights, user_insight_counters, dream_tags,
--   dream_recordings, users CASCADE;
--   DROP TABLE IF EXISTS lookup_emotions, lookup_clarity, subscription_plans CASCADE;
-- Then run this file.
-- ============================================

-- ============================================
-- 1. SUBSCRIPTION PLANS
-- ============================================
CREATE TABLE IF NOT EXISTS subscription_plans (
    id TEXT PRIMARY KEY,
    plan_name TEXT UNIQUE NOT NULL,
    monthly_price DECIMAL(10, 2) NOT NULL,
    insight_limit INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. USERS (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    current_plan_id TEXT DEFAULT 'free' REFERENCES subscription_plans(id) ON DELETE SET DEFAULT,
    insights_used INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- 3. LOOKUP TABLES
-- ============================================
CREATE TABLE IF NOT EXISTS lookup_emotions (
    mood_id SERIAL PRIMARY KEY,
    mood_label TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lookup_clarity (
    clarity_id SERIAL PRIMARY KEY,
    clarity_label TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. DREAM RECORDINGS
-- ============================================
CREATE TABLE IF NOT EXISTS dream_recordings (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recording_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    dream_text TEXT NOT NULL,
    title TEXT,
    time_of_sleep_approx TEXT,
    mood_upon_waking TEXT NOT NULL,
    dream_clarity TEXT NOT NULL,
    lucid_status BOOLEAN DEFAULT FALSE,
    pre_sleep_activities TEXT,
    key_symbols TEXT[] DEFAULT '{}',
    key_people TEXT[] DEFAULT '{}',
    dream_category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE dream_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own dreams" ON dream_recordings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own dreams" ON dream_recordings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dreams" ON dream_recordings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own dreams" ON dream_recordings
    FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_dream_recordings_user_id ON dream_recordings(user_id);
CREATE INDEX IF NOT EXISTS idx_dream_recordings_recording_date ON dream_recordings(recording_date);

-- ============================================
-- 5. DREAM TAGS
-- ============================================
CREATE TABLE IF NOT EXISTS dream_tags (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    recording_id TEXT NOT NULL REFERENCES dream_recordings(id) ON DELETE CASCADE,
    tag_type TEXT NOT NULL,
    tag_value TEXT NOT NULL,
    tag_intensity INTEGER CHECK (tag_intensity >= 1 AND tag_intensity <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE dream_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own dream tags" ON dream_tags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM dream_recordings dr
            WHERE dr.id = dream_tags.recording_id AND dr.user_id = auth.uid()
        )
    );

CREATE INDEX IF NOT EXISTS idx_dream_tags_recording_id ON dream_tags(recording_id);

-- ============================================
-- 6. AI INSIGHTS
-- ============================================
CREATE TABLE IF NOT EXISTS ai_insights (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    recording_id TEXT UNIQUE NOT NULL REFERENCES dream_recordings(id) ON DELETE CASCADE,
    insight_text TEXT NOT NULL,
    emotional_tone_tags JSONB,
    trend_summary TEXT,
    symbols TEXT[] DEFAULT '{}',
    themes TEXT[] DEFAULT '{}',
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own insights" ON ai_insights
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM dream_recordings dr
            WHERE dr.id = ai_insights.recording_id AND dr.user_id = auth.uid()
        )
    );

CREATE INDEX IF NOT EXISTS idx_ai_insights_recording_id ON ai_insights(recording_id);

-- ============================================
-- 7. USER INSIGHT COUNTERS
-- ============================================
CREATE TABLE IF NOT EXISTS user_insight_counters (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    insights_remaining INTEGER NOT NULL DEFAULT 5,
    last_reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_insight_counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own counter" ON user_insight_counters
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own counter" ON user_insight_counters
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- SEED: Subscription plans
-- ============================================
INSERT INTO subscription_plans (id, plan_name, monthly_price, insight_limit) VALUES
    ('free', 'Free Tier', 0.00, 5),
    ('premium', 'Premium', 8.00, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SEED: Lookups
-- ============================================
INSERT INTO lookup_emotions (mood_label) VALUES
    ('Elated'), ('Happy'), ('Peaceful'), ('Neutral'), ('Confused'),
    ('Anxious'), ('Sad'), ('Fearful'), ('Nostalgic'), ('Excited')
ON CONFLICT (mood_label) DO NOTHING;

INSERT INTO lookup_clarity (clarity_label) VALUES
    ('Extremely Vivid'), ('Very Clear'), ('Moderately Clear'),
    ('Somewhat Vague'), ('Very Vague'), ('Fragmented')
ON CONFLICT (clarity_label) DO NOTHING;

-- ============================================
-- TRIGGER: Create user profile on Supabase signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, current_plan_id)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
        'free'
    );
    INSERT INTO public.user_insight_counters (user_id, insights_remaining)
    VALUES (NEW.id, 5);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- TRIGGER: updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_subscription_plans_updated_at ON subscription_plans;
CREATE TRIGGER tr_subscription_plans_updated_at
    BEFORE UPDATE ON subscription_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_users_updated_at ON users;
CREATE TRIGGER tr_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_dream_recordings_updated_at ON dream_recordings;
CREATE TRIGGER tr_dream_recordings_updated_at
    BEFORE UPDATE ON dream_recordings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tr_user_insight_counters_updated_at ON user_insight_counters;
CREATE TRIGGER tr_user_insight_counters_updated_at
    BEFORE UPDATE ON user_insight_counters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- VIEWS
-- ============================================
DROP VIEW IF EXISTS dream_with_insights;
DROP VIEW IF EXISTS user_dashboard_summary;

CREATE VIEW user_dashboard_summary AS
SELECT
    u.id AS user_id,
    u.email,
    u.name,
    u.current_plan_id,
    u.insights_used,
    sp.plan_name,
    sp.insight_limit,
    COUNT(DISTINCT dr.id) AS total_dreams,
    COUNT(DISTINCT CASE WHEN dr.lucid_status THEN dr.id END) AS lucid_dreams,
    COUNT(DISTINCT CASE WHEN dr.dream_category = 'Nightmare' THEN dr.id END) AS nightmares,
    COUNT(DISTINCT ai.id) AS total_insights,
    COALESCE(uic.insights_remaining,
        CASE WHEN sp.insight_limit IS NULL THEN NULL ELSE GREATEST(0, sp.insight_limit - u.insights_used) END
    ) AS insights_remaining
FROM users u
LEFT JOIN subscription_plans sp ON u.current_plan_id = sp.id
LEFT JOIN dream_recordings dr ON u.id = dr.user_id
LEFT JOIN ai_insights ai ON dr.id = ai.recording_id
LEFT JOIN user_insight_counters uic ON u.id = uic.user_id
GROUP BY u.id, u.email, u.name, u.current_plan_id, u.insights_used, sp.plan_name, sp.insight_limit, uic.insights_remaining;

CREATE VIEW dream_with_insights AS
SELECT
    dr.id,
    dr.user_id,
    dr.recording_date,
    dr.dream_text,
    dr.title,
    dr.mood_upon_waking,
    dr.dream_clarity,
    dr.lucid_status,
    dr.dream_category,
    dr.key_symbols,
    dr.key_people,
    dr.created_at,
    ai.id AS insight_id,
    ai.insight_text,
    ai.emotional_tone_tags,
    ai.trend_summary,
    ai.symbols AS ai_symbols,
    ai.themes,
    ai.generated_at
FROM dream_recordings dr
LEFT JOIN ai_insights ai ON dr.id = ai.recording_id;

-- ============================================
-- Backfill existing auth users into public.users
-- (run once if you already have users who signed up before this schema)
-- ============================================
INSERT INTO public.users (id, email, name, current_plan_id)
SELECT id, email, COALESCE(raw_user_meta_data->>'name', raw_user_meta_data->>'full_name'), 'free'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_insight_counters (user_id, insights_remaining)
SELECT id, 5 FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- Expose tables to Supabase API (fixes "schema cache" errors)
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.subscription_plans TO anon, authenticated;
GRANT ALL ON public.users TO anon, authenticated;
GRANT ALL ON public.dream_recordings TO anon, authenticated;
GRANT ALL ON public.dream_tags TO anon, authenticated;
GRANT ALL ON public.ai_insights TO anon, authenticated;
GRANT ALL ON public.user_insight_counters TO anon, authenticated;
GRANT SELECT ON public.lookup_emotions TO anon, authenticated;
GRANT SELECT ON public.lookup_clarity TO anon, authenticated;
GRANT SELECT ON public.user_dashboard_summary TO anon, authenticated;
GRANT SELECT ON public.dream_with_insights TO anon, authenticated;
