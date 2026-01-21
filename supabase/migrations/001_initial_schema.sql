-- ============================================
-- Dreamssaver Database Schema for Supabase
-- Initial Migration
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. SUBSCRIPTION PLANS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscription_plans (
    id TEXT PRIMARY KEY DEFAULT 'free',
    plan_name TEXT UNIQUE NOT NULL,
    monthly_price DECIMAL(10, 2) NOT NULL,
    insight_limit INTEGER, -- NULL means unlimited
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 2. USERS TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    current_plan_id TEXT DEFAULT 'free' REFERENCES subscription_plans(id) ON DELETE SET DEFAULT,
    insights_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- 3. LOOKUP TABLES (Reference Data)
-- ============================================

-- Lookup: Emotions/Moods
CREATE TABLE IF NOT EXISTS lookup_emotions (
    mood_id SERIAL PRIMARY KEY,
    mood_label TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Lookup: Dream Clarity Levels
CREATE TABLE IF NOT EXISTS lookup_clarity (
    clarity_id SERIAL PRIMARY KEY,
    clarity_label TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 4. DREAM RECORDINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS dream_recordings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recording_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    dream_text TEXT NOT NULL,
    time_of_sleep_approx TEXT,
    mood_upon_waking TEXT NOT NULL,
    dream_clarity TEXT NOT NULL,
    lucid_status BOOLEAN DEFAULT FALSE,
    pre_sleep_activities TEXT,
    key_symbols TEXT[] DEFAULT '{}',
    key_people TEXT[] DEFAULT '{}',
    dream_category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE dream_recordings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own dreams
CREATE POLICY "Users can view own dreams" ON dream_recordings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own dreams" ON dream_recordings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dreams" ON dream_recordings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own dreams" ON dream_recordings
    FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_dream_recordings_user_id ON dream_recordings(user_id);
CREATE INDEX idx_dream_recordings_recording_date ON dream_recordings(recording_date);
CREATE INDEX idx_dream_recordings_user_date ON dream_recordings(user_id, recording_date);

-- ============================================
-- 5. DREAM TAGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS dream_tags (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    recording_id TEXT NOT NULL REFERENCES dream_recordings(id) ON DELETE CASCADE,
    tag_type TEXT NOT NULL CHECK (tag_type IN ('SYMBOL', 'PERSON', 'PLACE', 'OBJECT')),
    tag_value TEXT NOT NULL,
    tag_intensity INTEGER CHECK (tag_intensity >= 1 AND tag_intensity <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE dream_tags ENABLE ROW LEVEL SECURITY;

-- Policy: Users can access tags for their own dreams
CREATE POLICY "Users can view own dream tags" ON dream_tags
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM dream_recordings
            WHERE dream_recordings.id = dream_tags.recording_id
            AND dream_recordings.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own dream tags" ON dream_tags
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM dream_recordings
            WHERE dream_recordings.id = dream_tags.recording_id
            AND dream_recordings.user_id = auth.uid()
        )
    );

-- Indexes
CREATE INDEX idx_dream_tags_recording_id ON dream_tags(recording_id);
CREATE INDEX idx_dream_tags_tag_value ON dream_tags(tag_value);
CREATE INDEX idx_dream_tags_tag_type ON dream_tags(tag_type);
CREATE INDEX idx_dream_tags_type_value ON dream_tags(tag_type, tag_value);

-- ============================================
-- 6. AI INSIGHTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_insights (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    recording_id TEXT UNIQUE NOT NULL REFERENCES dream_recordings(id) ON DELETE CASCADE,
    insight_text TEXT NOT NULL,
    emotional_tone_tags JSONB,
    trend_summary TEXT,
    symbols TEXT[] DEFAULT '{}',
    themes TEXT[] DEFAULT '{}',
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- Policy: Users can access insights for their own dreams
CREATE POLICY "Users can view own insights" ON ai_insights
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM dream_recordings
            WHERE dream_recordings.id = ai_insights.recording_id
            AND dream_recordings.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own insights" ON ai_insights
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM dream_recordings
            WHERE dream_recordings.id = ai_insights.recording_id
            AND dream_recordings.user_id = auth.uid()
        )
    );

-- Indexes
CREATE INDEX idx_ai_insights_recording_id ON ai_insights(recording_id);
CREATE INDEX idx_ai_insights_generated_at ON ai_insights(generated_at);

-- ============================================
-- 7. USER INSIGHT COUNTERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_insight_counters (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    insights_remaining INTEGER NOT NULL DEFAULT 5,
    last_reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE user_insight_counters ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own counter
CREATE POLICY "Users can view own counter" ON user_insight_counters
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own counter" ON user_insight_counters
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA: Subscription Plans
-- ============================================
INSERT INTO subscription_plans (id, plan_name, monthly_price, insight_limit) VALUES
    ('free', 'Free Tier', 0.00, 5),
    ('premium', 'Premium', 8.00, NULL) -- NULL = unlimited
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SEED DATA: Lookup Emotions
-- ============================================
INSERT INTO lookup_emotions (mood_label) VALUES
    ('Elated'),
    ('Happy'),
    ('Peaceful'),
    ('Neutral'),
    ('Confused'),
    ('Anxious'),
    ('Sad'),
    ('Fearful'),
    ('Nostalgic'),
    ('Excited')
ON CONFLICT (mood_label) DO NOTHING;

-- ============================================
-- SEED DATA: Lookup Clarity
-- ============================================
INSERT INTO lookup_clarity (clarity_label) VALUES
    ('Extremely Vivid'),
    ('Very Clear'),
    ('Moderately Clear'),
    ('Somewhat Vague'),
    ('Very Vague'),
    ('Fragmented')
ON CONFLICT (clarity_label) DO NOTHING;

-- ============================================
-- FUNCTION: Create user profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, current_plan_id, insights_used)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NULL),
        'free',
        0
    );
    
    -- Initialize insight counter
    INSERT INTO public.user_insight_counters (user_id, insights_remaining)
    VALUES (NEW.id, 5);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Automatically create user profile when auth user is created
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FUNCTION: Update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_subscription_plans_updated_at
    BEFORE UPDATE ON subscription_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dream_recordings_updated_at
    BEFORE UPDATE ON dream_recordings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_insight_counters_updated_at
    BEFORE UPDATE ON user_insight_counters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
