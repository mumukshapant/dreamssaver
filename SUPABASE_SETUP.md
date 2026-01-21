# Supabase Setup Guide for Dreamssaver

This guide will help you set up Supabase authentication and database for your Dreamssaver application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: `dreamssaver` (or your preferred name)
   - Database Password: Choose a strong password (save this!)
   - Region: Choose the closest region to your users
4. Wait for the project to be created (takes ~2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

## Step 4: Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. Wait for the migration to complete

This will create:
- All necessary tables (users, dream_recordings, ai_insights, etc.)
- Row Level Security (RLS) policies
- Indexes for performance
- Seed data (subscription plans, lookup tables)
- Triggers for automatic user profile creation

## Step 5: Configure Email Authentication (Optional but Recommended)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates if desired (under **Authentication** → **Email Templates**)

For development, you can use Supabase's built-in email service. For production, consider configuring a custom SMTP server.

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click "Sign Up / Log In"
4. Try creating a new account with your email
5. Check your email for the confirmation link (if email confirmation is enabled)
6. After confirming, try logging in

## Step 7: Verify Database Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see the following tables:
   - `subscription_plans`
   - `users`
   - `dream_recordings`
   - `dream_tags`
   - `ai_insights`
   - `user_insight_counters`
   - `lookup_emotions`
   - `lookup_clarity`

3. Check that seed data was inserted:
   - `subscription_plans` should have 2 rows (Free and Premium)
   - `lookup_emotions` should have 10 rows
   - `lookup_clarity` should have 6 rows

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env.local` file has the correct `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after changing environment variables

### "User not found" after signup
- Check that the `handle_new_user()` trigger function was created
- Verify the trigger is attached to `auth.users` table
- Check the Supabase logs under **Logs** → **Postgres Logs**

### RLS Policy Errors
- Make sure Row Level Security is enabled on all tables
- Verify the policies allow authenticated users to access their own data
- Check the policies in **Authentication** → **Policies**

### Migration Errors
- Make sure you're running the migration as a database superuser
- Check for any syntax errors in the SQL
- Verify all extensions are enabled (uuid-ossp)

## Next Steps

1. **Configure Prisma** (if still using it):
   - Update your `DATABASE_URL` in `.env.local` to point to your Supabase database
   - The connection string format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

2. **Set up API routes** for dream recording and AI insights

3. **Create dashboard page** for authenticated users

4. **Implement dream submission** functionality

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
