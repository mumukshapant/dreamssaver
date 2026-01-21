# Dreamssaver

## Project Description
a web application that is used for dream journalling. It tracks your dreams and gives insights using AI. For AI, we will use Gemini. The application should be stylised in a dreamy manner. 

There will be a landing page to describe the product along with a text box where user can submit their dream by signing up or logging in. 

There will be a dashboard page for the user that will display all of their recordings. If they click on a recording, they should be taken to another page that contains their recording and meta information along with the AI insights. 

The users will get only 5 free AI insights for the free tier, but they can record as many dreams as they want.

There will be one subscription that allows users unlimited AI insights for $8 per month.  

## Product Requirements Document
PRODUCT REQUIREMENTS DOCUMENT (PRD) - Dreamssaver

VERSION: 1.0
DATE: October 26, 2023
AUTHORS: [Team Name]

1. INTRODUCTION

1.1. PURPOSE
This Product Requirements Document (PRD) details the requirements, goals, features, and specifications for Dreamssaver, a web application designed for detailed dream journaling, tracking, and AI-powered analysis. The application aims to provide users with insights into their subconscious by leveraging the Gemini AI model.

1.2. GOALS
*   To provide a secure, private, and aesthetically pleasing platform for users to record their dreams.
*   To offer users valuable self-reflection insights by analyzing recurring symbols, emotional cycles, and thematic trends in their dream journals using AI.
*   To facilitate the user's desire for self-understanding and potentially lucid dreaming.
*   To establish a clear tiered subscription model for accessing advanced AI insights.

1.3. TARGET AUDIENCE
Individuals interested in dream interpretation, mental wellness, self-reflection, self-improvement, and those actively pursuing lucid dreaming techniques.

2. PRODUCT OVERVIEW

Dreamssaver is a dreamy-styled web application where users can log their nocturnal experiences. The core functionality revolves around text input for dream narratives, structured metadata capture, and subsequent analysis via Gemini AI, focusing on identifying long-term patterns in symbols, emotions, and life event correlations.

3. USER STORIES & FEATURES

3.1. User Onboarding & Access (Authentication)
| ID | User Story | Priority |
| :--- | :--- | :--- |
| USR-1.1 | As a new user, I want to sign up easily so I can start logging dreams immediately. | High |
| USR-1.2 | As a returning user, I want to log in securely to access my past entries. | High |

3.2. Landing Page
| ID | User Story | Priority |
| :--- | :--- | :--- |
| LP-2.1 | As a visitor, I want to see a clear description of Dreamssaver, highlighting the AI insight features. | High |
| LP-2.2 | As a visitor, I want to find an obvious call-to-action (CTA) to sign up or log in to submit my first dream. | High |

3.3. Dream Input (Recording)
| ID | User Story | Priority |
| :--- | :--- | :--- |
| DR-3.1 | As a user, I want a dedicated interface to input the details of my recent dream. | High |
| DR-3.2 | As a user, I want to input the main text narrative of my dream. | High |
| DR-3.3 | As a user, I want to easily select my mood upon waking using a dropdown menu. | High |
| DR-3.4 | As a user, I want to rate the clarity of my recalled dream using a dropdown menu. | High |
| DR-3.5 | As a user, I want to optionally record meta-information about the dream event. | High |

3.4. Dashboard & Management
| ID | User Story | Priority |
| :--- | :--- | :--- |
| DB-4.1 | As a logged-in user, I want to see a dashboard summarizing all my dream recordings in chronological order. | High |
| DB-4.2 | As a user, I want to click on any recording from the dashboard to view its full details and AI insights. | High |
| DB-4.3 | As a user, I want to see visualizations on my dashboard summarizing my dream data trends. | Medium |

3.5. AI Insight Generation (Core Value)
| ID | User Story | Priority |
| :--- | :--- | :--- |
| AI-5.1 | As a user, I want the system to generate AI insights based on the content of my dream narrative and associated metadata. | High |
| AI-5.2 | As a Free Tier user, I want to receive AI analysis on my first 5 insights generated, and then be notified that I must upgrade for more. | High |
| AI-5.3 | As a Premium user, I want unlimited access to AI analysis on all my dream entries. | High |
| AI-5.4 | As a user viewing a specific dream entry, I want to see the generated AI insights displayed clearly alongside the original entry. | High |

4. FUNCTIONAL REQUIREMENTS

4.1. Meta Information Fields (Data Schema)
The system must capture and store the following metadata for every dream entry:
*   Date of recording.
*   Approximate Time of dream (if known/estimated).
*   Time of sleep (estimated start time).
*   Mood upon waking (Dropdown selection).
*   Dream clarity (Dropdown selection: e.g., Extremely Vivid, Vague, Fragmented).
*   Key objects/symbols mentioned (AI extraction or manual tag).
*   Key people involved (AI extraction or manual tag).
*   Lucid dream status (Boolean: Yes/No).
*   Pre-sleep activities (Text input or checklist).

4.2. AI Insight Generation Requirements (Gemini Integration)
The AI model must be prompted to analyze dream content based on the following scopes:
*   **Symbol Frequency & Repetition:** Identify and flag repeated symbols or objects across multiple dreams.
*   **Emotional Trend Analysis:** Analyze text for emotional tone (fear, joy, confusion, nostalgia) and intensity over time (weeks/months). Output should correlate shifts with time periods.
*   **Recurring Patterns:** Identify recurring people, places, or consistent emotional cycles tied to life events mentioned in the entry history.
*   **Thematic Categorization:** Assign broad categories (e.g., Nightmare, Wish Fulfillment, Conflict Resolution).

4.3. Dashboard Visualization Requirements
The dashboard must include visualizations derived from the meta-data and AI analysis:
*   Chart visualizing mood upon waking over the last 30 days (using mood dropdown data).
*   Tag cloud or summary of the most common Key Objects/Symbols recorded.
*   Graph tracking emotional intensity over time.
*   List/Count of dreams categorized as "Nightmare" or "Lucid."

4.4. Dream Detail View Requirements
When a user clicks on a specific dream from the dashboard, the detail view must display:
*   The full dream narrative text.
*   All associated meta-information fields.
*   The generated AI insights pertaining *only* to that specific entry (e.g., specific symbols found in *this* dream).

5. NON-FUNCTIONAL REQUIREMENTS

5.1. Design and Aesthetics
The application must adhere to a "dreamy styling guideline." This includes:
*   Use of pastel color palettes.
*   Inclusion of abstract, flowing, or ethereal graphic elements where appropriate (e.g., background textures, iconography).
*   Emphasis on readability despite stylistic choices.

5.2. Performance
Performance latency for basic navigation and saving entries should be immediate (<1 second). AI insight generation latency will be managed via asynchronous processing, informing the user that analysis is underway if necessary.

5.3. Security and Privacy
(Note: Explicit requirements were NA, but standard practices must be followed.)
*   All user data must be encrypted in transit (HTTPS/SSL).
*   Dream journal content must be treated as highly sensitive personal data and strictly siloed per user account.

6. MONETIZATION AND TIERS

6.1. Free Tier (Default)
*   Unlimited dream recordings (storage capacity unlimited for Phase 1).
*   Access to basic recording and dashboard features.
*   **Limit:** Users are strictly limited to 5 AI insight generations across their entire account history.

6.2. Premium Tier (Subscription - Phase 2)
*   **Cost:** $8.00 USD per month.
*   **Benefit:** Unlimited access to all AI insight generation features.
*   **Trigger:** Subscription status must be checked before rendering any AI analysis output for a new entry.

7. PHASED ROLLOUT PLAN (Contextual Note)
*   Phase 1 Focus: Core recording functionality, basic dashboard, robust AI integration setup, and enforcement of the 5-insight limit for the Free Tier.
*   Phase 2 Focus: Implementation of the $8/month subscription flow, potential addition of Voice-to-Text transcription, and advanced subscription management features.

8. TECHNOLOGY STACK (To be determined, but needs to support rich web experience and scalable API calls to Gemini.)

## Technology Stack
# TECHNOLOGY STACK: Dreamssaver

## 1. OVERVIEW

This document outlines the recommended technology stack for the development of Dreamssaver, a web application designed for dream journaling, analysis, and insight generation powered by Google's Gemini AI. The stack prioritizes a modern, performant user experience (UX), robust backend data handling, and seamless integration with external AI services, while adhering to the requirement for a "dreamy" aesthetic.

## 2. FRONTEND STACK (Presentation & User Experience)

The frontend must deliver a highly responsive, aesthetically pleasing interface that embodies the "dreamy" styling (pastel colors, abstract elements).

| Component | Technology/Framework | Justification |
|---|---|---|
| Core Framework | React (with Next.js) | Provides server-side rendering (SSR) for fast initial load times (crucial for SEO on the landing page) and efficient client-side navigation. Next.js simplifies routing, API handling, and overall project structure. |
| Styling & Theming | Tailwind CSS + Custom CSS/SCSS Modules | Tailwind allows for rapid, utility-first styling. Custom SCSS/CSS modules will be used sparingly to implement complex, abstract, and highly stylized components required for the "dreamy" look (e.g., custom animations, soft gradients, pastel themes). |
| State Management | React Context API / Zustand | For a moderately complex application, Context combined with lightweight state management (Zustand) offers better performance and less boilerplate than Redux, keeping the stack lean. |
| Data Visualization | Recharts or Chart.js | Necessary for rendering charts on the Dashboard displaying emotional trends, intensity over time, and other meta-information insights. Recharts is often favored for React integration. |

## 3. BACKEND STACK (Application Logic & APIs)

The backend will serve as the secure hub for user management, data persistence, rate limiting (for AI insights), and communication with the Gemini API.

| Component | Technology/Framework | Justification |
|---|---|---|
| Core Framework | Node.js with Express.js | A mature, high-performance runtime ideal for handling concurrent requests, especially I/O-bound tasks like database queries and external API calls (Gemini). Express provides a simple, flexible routing layer. |
| Database (Primary) | PostgreSQL | A robust, open-source relational database. Excellent for structured data like user accounts, dream metadata (dates, moods, clarity scores), and handling transactional integrity needed for subscription tracking (Phase 2). |
| Database (Caching/Rate Limiting) | Redis | Used primarily for session management, caching frequently accessed data, and crucially, implementing the 5-insight free tier rate limiting mechanism efficiently. |
| Authentication | JWT (JSON Web Tokens) & bcrypt | Standard secure method for session management. JWTs are stateless for API scalability, and bcrypt ensures passwords are securely hashed. |
| AI Integration Layer | Dedicated Service/Controller | A dedicated module responsible solely for formatting prompts, managing API keys, handling Gemini responses, and tracking usage quotas against the user's subscription status. |

## 4. AI & INSIGHTS LAYER

This layer is central to the value proposition of Dreamssaver.

| Component | Technology/Framework | Justification |
|---|---|---|
| Core AI Model | Google Gemini API (via Vertex AI or standard API) | Explicitly required by the project description. Gemini will be used to process dream text to extract deeper trends (symbols, emotional cycles, recurring themes) as outlined in the questionnaire responses. |
| Prompt Engineering | Structured JSON/XML Output Request | Prompts must be carefully engineered to enforce structured output from Gemini, ensuring the model returns data points that are easily parsable by the backend to populate dashboards and meta-information fields (e.g., intensity score, identified symbols). |

## 5. DEPLOYMENT & INFRASTRUCTURE

| Component | Technology/Framework | Justification |
|---|---|---|
| Hosting Platform | Vercel (Frontend) / Render or AWS (Backend/DB) | Vercel is the standard for Next.js deployment, offering excellent performance, global CDN, and simplified CI/CD. A dedicated platform like Render or AWS ECS provides necessary control and persistence for the Node.js backend and PostgreSQL database. |
| Version Control | Git / GitHub | Standard industry practice for collaboration, history tracking, and automated deployment triggers. |
| Containerization (Optional/Future) | Docker | Recommended if moving towards microservices or for ensuring environment parity between development and production, although perhaps overkill for the initial monolithic deployment. |

## 6. DATA MODEL CONSIDERATIONS (Meta Information)

The structure of the dream entry will directly influence the complexity of database queries and AI insight generation.

| Field | Type | Importance |
|---|---|---|
| Dream ID | UUID | Primary Key |
| User ID | Foreign Key | Link to User Table |
| Entry Date | Timestamp | Sorting/Chronological Analysis |
| Sleep Time / Wake Time | Time/Timestamp | Contextual analysis |
| Dream Clarity | Integer (1-5) | Input via dropdown |
| Mood Upon Waking | String (Tagged) | Input via dropdown/selection |
| Raw Dream Text | Text | Input for AI Processing |
| Lucid Status | Boolean | User input |
| Key Symbols/Objects (AI Extracted) | Array of Strings | Visualization/Search |
| Emotional Tags (AI Extracted) | Array of Strings (e.g., Fear, Joy) | Dashboard Trending |
| Pre-Sleep Activities | Text/Array | Contextual logging |

## 7. PHASE 1 vs. PHASE 2 Technology Implications

The current stack is optimized for Phase 1 (core journaling, login, 5 free insights).

*   **Phase 2 (Monetization):** Integration of a payment processor (e.g., Stripe) will require secure API key management within the Express.js backend.
*   **Future Feature (Voice-to-Text):** If voice-to-text transcription is added, integration with a cloud speech-to-text service (like Google Cloud Speech-to-Text or Whisper API) will be required, adding another external API dependency to the backend service layer.

## Project Structure
PROJECT STRUCTURE DOCUMENT: Dreamssaver

1. OVERVIEW
This document outlines the directory and file structure for the Dreamssaver web application, designed for dream journaling with AI-driven insights, styled with a dreamy aesthetic (pastel colors, abstract art).

2. DIRECTORY STRUCTURE

/dreamssaver
├── .github/                  # CI/CD and Repository configuration (if applicable)
│   └── workflows/
│       └── .gitkeep          # Placeholder for deployment/testing workflows
├── docs/                     # Project documentation
│   ├── projectStructure.md   # This document
│   ├── architecture.md       # High-level system design
│   └── requirements.md       # Detailed functional/non-functional requirements
├── src/                      # Main application source code
│   ├── api/                  # Backend services and API endpoints
│   │   ├── controllers/      # Request handling logic
│   │   │   ├── authController.js
│   │   │   └── dreamController.js
│   │   ├── models/           # Database schemas/definitions
│   │   │   ├── User.js
│   │   │   └── DreamEntry.js
│   │   ├── routes/           # API routing definitions
│   │   │   ├── authRoutes.js
│   │   │   └── dreamRoutes.js
│   │   └── services/         # Business logic, Gemini integration
│   │       ├── geminiService.js  # Handles AI calls and insight generation
│   │       └── userService.js
│   ├── client/               # Frontend application (React/Vue/etc.)
│   │   ├── public/           # Static assets (index.html, favicon)
│   │   │   └── index.html
│   │   ├── src/
│   │   │   ├── assets/       # Images, abstract art, fonts (dreamy styling)
│   │   │   │   ├── styles/
│   │   │   │   │   ├── main.css  # Core styling, color palette definition
│   │   │   │   │   └── theme.js  # Variables for pastel colors
│   │   │   ├── components/   # Reusable UI components
│   │   │   │   ├── common/
│   │   │   │   │   ├── Button.js
│   │   │   │   │   └── Header.js
│   │   │   │   ├── auth/
│   │   │   │   │   └── LoginForm.js
│   │   │   │   └── dreams/
│   │   │   │       ├── DreamInsightCard.js
│   │   │   │       └── DreamRecorderForm.js
│   │   │   ├── pages/        # Main view components
│   │   │   │   ├── LandingPage.js      # Product description & login prompt
│   │   │   │   ├── Dashboard.js        # Displays recordings and visualizations
│   │   │   │   ├── DreamDetailPage.js    # Single entry, meta-data, AI insights
│   │   │   │   └── ProfilePage.js      # Account settings, subscription status (Phase 2)
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── context/      # State management (User, Subscription context)
│   │   │   └── App.js        # Main application router/wrapper
│   │   └── package.json
│   └── shared/               # Code shared between frontend/backend (e.g., utility functions, constants)
│       └── constants.js      # Defines FREE_INSIGHT_LIMIT = 5
├── tests/                    # Testing suite
│   ├── api/
│   └── client/
├── .env.example              # Template for environment variables (API keys, DB URIs)
├── .gitignore
├── package.json              # Root project dependencies (if using a monorepo setup)
└── README.md                 # High-level project summary

3. KEY DIRECTORY EXPLANATIONS

/src/api:
    Contains the server-side logic, responsible for user management, dream storage, and interfacing with the Gemini API for insights.
    *   /services/geminiService.js: Crucial for constructing prompts based on user input and the AI Scope Questionnaire (symbol tracking, emotional trends) and handling the rate limiting for the free tier (5 insights).

/src/client:
    Handles the user interface, emphasizing the dreamy styling (pastel colors, abstract themes).
    *   /pages/LandingPage.js: Must clearly present the value proposition (reflection, trend spotting) and prompt sign-up/login.
    *   /pages/Dashboard.js: Integrates charting libraries to visualize: Mood upon waking, Emotional intensity over time (trends over weeks/months), Key objects/symbols used.
    *   /components/dreams/DreamRecorderForm.js: This component handles the detailed meta-information capture: Date, Time, Mood dropdown, Clarity dropdown, Lucid Status, Key People/Objects fields, Pre-sleep activities input.

4. CORE FUNCTIONALITY MAPPING

| Feature | Location | Notes |
| :--- | :--- | :--- |
| User Authentication | /src/api/controllers/authController.js | Handles sign-up/login flow. |
| Dream Submission | /src/api/controllers/dreamController.js | Saves the comprehensive meta-data structure to the DB. |
| AI Insight Generation | /src/api/services/geminiService.js | Uses Gemini to analyze dreams against recorded trends (symbols, emotions). |
| Insight Limitation Logic | /src/context/ or /src/services/userService.js | Enforces the 5 free insight limit check before calling Gemini. |
| Dream Detail View | /src/client/pages/DreamDetailPage.js | Displays the recorded dream text alongside structured AI analysis and meta-info. |
| Subscription Handling (Placeholder) | /src/context/SubscriptionContext.js | Will manage the $8/month tier unlock for unlimited insights (Phase 2). |

## Database Schema Design
SCHEMADESIGN: Dreamssaver Database Schema

1. Overview and Design Philosophy
The database schema for Dreamssaver is designed around the core entities: Users, their Dream Recordings, AI-generated Insights, and Subscription/Billing status. The structure prioritizes data integrity, easy retrieval for the dashboard visualizations, and flexible storage for the detailed dream meta-information. Given the focus on trend analysis (symbols, emotions over time), relationships must support efficient querying across multiple dream entries.

2. Entity Relationship Diagram (Conceptual Mapping)
*   User (1) <-> (Many) DreamRecordings
*   DreamRecording (1) <-> (Many) DreamTags (for symbols, objects, people)
*   DreamRecording (1) <-> (1) AIInsight (if generated)
*   User (1) <-> (1) SubscriptionStatus

3. Detailed Schema Definition

---

### Table 1: Users

Stores user account and authentication information.

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| user_id | UUID/BIGINT | PRIMARY KEY, Auto-generated | Unique identifier for the user. |
| username | VARCHAR(100) | UNIQUE, NOT NULL | User's chosen username or email. |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password. |
| created_at | TIMESTAMP | NOT NULL, Default CURRENT_TIMESTAMP | Registration date. |
| current_plan_id | INT | FOREIGN KEY (Ref: SubscriptionPlans) | Links to the user's active plan. |

---

### Table 2: SubscriptionPlans

Defines available subscription tiers (for future extensibility, currently only Free and Premium exist).

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| plan_id | INT | PRIMARY KEY, Auto-increment | Unique plan identifier. |
| plan_name | VARCHAR(50) | UNIQUE, NOT NULL | E.g., "Free Tier", "Premium". |
| monthly_price | DECIMAL(5, 2) | NOT NULL | Price of the subscription. |
| insight_limit | INT | NOT NULL | Maximum AI insights allowed per billing cycle (e.g., 5 for Free, NULL for Unlimited). |

---

### Table 3: DreamRecordings

The central table storing every user-submitted dream entry and its associated metadata.

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| recording_id | UUID/BIGINT | PRIMARY KEY, Auto-generated | Unique dream entry ID. |
| user_id | UUID/BIGINT | FOREIGN KEY (Ref: Users), NOT NULL | Creator of the dream record. |
| recording_date | DATE | NOT NULL | The date the dream was recorded (or occurred). |
| dream_text | TEXT | NOT NULL | The full text transcription/description of the dream. |
| time_of_sleep_approx | TIME | NULLABLE | Estimated time the user went to sleep. |
| mood_upon_waking | VARCHAR(50) | Foreign Key (Ref: Lookup_Emotions) | Initial emotional state upon waking (Dropdown input). |
| dream_clarity | VARCHAR(50) | Foreign Key (Ref: Lookup_Clarity) | Subjective clarity of the dream (Dropdown input). |
| lucid_status | BOOLEAN | Default FALSE | Whether the user remembers achieving lucidity. |
| pre_sleep_activities | TEXT | NULLABLE | List/description of activities before sleep. |
| created_at | TIMESTAMP | NOT NULL | Timestamp of when the record was created in the app. |

---

### Table 4: DreamTags (For Symbols, People, Places)

A junction table (many-to-many) linking specific tags/keywords to dreams, facilitating trend analysis across symbols and objects.

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| dream_tag_id | UUID/BIGINT | PRIMARY KEY, Auto-generated | Unique ID. |
| recording_id | UUID/BIGINT | FOREIGN KEY (Ref: DreamRecordings), NOT NULL | The dream associated with this tag. |
| tag_type | VARCHAR(20) | NOT NULL (e.g., 'SYMBOL', 'PERSON', 'PLACE', 'OBJECT') | Categorization of the tag. |
| tag_value | VARCHAR(100) | NOT NULL | The actual identified item (e.g., "Red Balloon", "Childhood Home", "Gemini AI"). |
| tag_intensity | INT | NULLABLE (1-5) | Optional intensity or significance assigned during tagging/AI processing. |

---

### Table 5: AIInsights

Stores the results generated by the Gemini analysis for each dream.

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| insight_id | UUID/BIGINT | PRIMARY KEY, Auto-generated | Unique insight ID. |
| recording_id | UUID/BIGINT | FOREIGN KEY (Ref: DreamRecordings), UNIQUE, NOT NULL | Links one insight result to one dream. |
| insight_text | TEXT | NOT NULL | The main interpretive text from the AI. |
| emotional_tone_tags | JSONB/TEXT | Stores structured output regarding identified emotional tones (Fear, Joy, Anxiety, etc.). |
| trend_summary | TEXT | NULLABLE | AI-generated summary of recurring themes (used for weekly/monthly reports). |
| usage_cost | INT | NOT NULL, Default 1 | Tracks the cost against the user's insight limit. |
| generated_at | TIMESTAMP | NOT NULL | When the insight was processed. |

---

### Table 6: UserInsightCounters

Manages the remaining free insights for users on the Free Tier.

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| user_id | UUID/BIGINT | PRIMARY KEY, FOREIGN KEY (Ref: Users) | Links directly to the user. |
| insights_remaining | INT | NOT NULL | Current count of free insights left. |
| last_reset_date | DATE | NOT NULL | Date the insight counter was last reset (monthly cycle). |

---

### Table 7: Lookup Tables (Static/Reference Data)

These tables normalize values from the input dropdowns, ensuring consistent data for visualization and filtering.

#### Lookup_Emotions

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| mood_id | INT | PRIMARY KEY | |
| mood_label | VARCHAR(50) | UNIQUE, NOT NULL | E.g., "Elated", "Confused", "Anxious", "Neutral". |

#### Lookup_Clarity

| Field Name | Data Type | Constraints/Notes | Description |
| :--- | :--- | :--- | :--- |
| clarity_id | INT | PRIMARY KEY | |
| clarity_label | VARCHAR(50) | UNIQUE, NOT NULL | E.g., "Vivid", "Fuzzy", "Fragmented". |

4. Data Relationships and Indexing Strategy
1.  **Fast Dream Retrieval:** Index on `DreamRecordings.user_id` and `DreamRecordings.recording_date` is crucial for building the user dashboard quickly.
2.  **AI Trend Analysis:** Indexes on `DreamTags.tag_value` and `DreamTags.tag_type` will allow rapid identification of recurring symbols across the user's entire history.
3.  **Insight Linking:** A UNIQUE constraint on `AIInsights.recording_id` enforces a 1:1 relationship between a dream and its primary AI analysis.
4.  **Monetization Tracking:** Joins between `Users`, `SubscriptionPlans`, and `UserInsightCounters` enable real-time enforcement of the 5-insight limit for non-subscribed users.

## User Flow
USERFLOW DOCUMENTATION: Dreamssaver

1. INTRODUCTION
1.1 Purpose
This document details the primary user flows for the Dreamssaver web application, focusing on user journeys from landing page access through dream journaling, dashboard interaction, and AI insight consumption, while respecting current tier limitations.

1.2 Scope
This flow covers: Landing Page, Authentication (Sign Up/Login), Dream Entry, Dashboard Navigation, Dream Detail View, and AI Insight Display (limited). Monetization flow is explicitly excluded as it is deferred to Phase 2.

2. CORE USER JOURNEYS

2.1 User Flow 1: First-Time Visitor & Dream Entry (Free Tier)
Actors: New User
Goal: Record a dream and receive initial AI feedback (if applicable based on free credits).

STEP 1: Landing Page Arrival (Dreamy Styling: Pastel colors, abstract art)
   1.1 User lands on the main URL.
   1.2 Page displays compelling copy about tracking dreams, memory retention, and self-reflection.
   1.3 Prominent CTA: "Start Your Dream Journey" or similar, leading to authentication modal/page.

STEP 2: Authentication (Sign Up)
   2.1 User clicks CTA.
   2.2 User selects Sign Up.
   2.3 System validates email/credentials. Upon successful registration, the user is assigned the Free Tier (5 AI Insights remaining).
   2.4 System redirects user to the Dashboard (First-time empty state or guided tour).

STEP 3: Initial Dream Recording (Input Modal/Page)
   3.1 User navigates to "New Dream" or equivalent action on the Dashboard.
   3.2 Dream Input Interface appears, featuring required fields:
      A. Dream Narrative (Large Text Area).
      B. Meta Information Input:
         i. Date (Default: Today).
         ii. Approximate Time of Dream.
         iii. Time of Sleep.
         iv. Mood Upon Waking (Dropdown selection).
         v. Dream Clarity (Dropdown: e.g., Low, Medium, High).
         vi. Lucid Dream Status (Toggle/Checkbox).
         vii. Key Objects/Symbols (Text input/tagging).
         viii. Key People Involved (Text input/tagging).
         ix. Pre-Sleep Activities (Text input/selection).
         x. Dream Category (Dropdown: e.g., Nightmare, Recurring, Lucid, General).
   3.3 User submits the dream.
   3.4 System saves the recording.
   3.5 System checks AI Insight availability. Since this is the first entry, the system *offers* an AI analysis but warns about the 5-insight limit.
   3.6 User accepts AI analysis (Deducting 1 credit).
   3.7 User is redirected to the Dream Detail View (See Section 2.3).

2.2 User Flow 2: Returning User Access & Review
Actors: Existing User
Goal: Access existing recordings and review past data.

STEP 1: Landing Page Arrival / Direct Navigation
   1.1 User navigates to the URL.
   1.2 User clicks "Login."
   1.3 User enters credentials and logs in.
   1.4 System redirects user to the Dashboard.

STEP 2: Dashboard View
   2.1 Dashboard loads, displaying a list/grid view of all recorded dreams (Title/Date/Mood Summary).
   2.2 Visualization components load (Charts showing mood upon waking, emotional trends based on recorded data).
   2.3 AI Insight Counter is clearly displayed: e.g., "3/5 Free Insights Remaining."

STEP 3: Reviewing a Past Dream
   3.1 User clicks on a specific dream entry from the list.
   3.2 System navigates to the Dream Detail View.

2.3 User Flow 3: Dream Detail View and AI Insight Consumption

Actors: Any logged-in User
Goal: Review the specific dream entry and accompanying AI analysis.

STEP 1: Entering Detail View (From Dashboard click)
   1.1 The page displays the full Dream Narrative.
   1.2 Meta Information fields (Date, Time, Mood, Clarity, etc.) are displayed clearly, potentially using soft iconographies matching the dreamy aesthetic.
   1.3 Key areas for AI insights are segmented:
      A. Emotional Tagging (Extracted emotional tone, intensity over time).
      B. Symbol & People Analysis (Keywords identified from input fields).
      C. Trend Summary (Placeholder text if no trends detected yet, or the specific insight generated by Gemini).

STEP 2: AI Insight Display Logic
   2.1 If the recording *has* an associated AI Insight:
      a. The insight is displayed prominently, often in a distinct, perhaps glowing, section of the view.
      b. Insight content focuses on the AI scope: repeated symbols, recurring people/places, emotional cycles tied to life events, reflection on stress/anxiety/creativity.
   2.2 If the recording *does not* have an AI Insight (User chose not to generate or hasn't requested it yet):
      a. A CTA is present: "Generate AI Analysis?"
      b. System checks AI Credit count:
         i. If Credits > 0: User clicks CTA, credit is deducted, AI processing occurs (short latency implied), insight is generated and displayed (return to 2.1).
         ii. If Credits = 0 (Free Tier Limit Hit): System displays a message: "You have reached your 5 free AI insights limit. Unlock unlimited analysis for $8/month." (This CTA directs to the Phase 2 monetization flow).

3. COMPONENT INTERACTION PATTERNS

3.1 Dream Input (Meta Information)
   Interaction Pattern: Form Filling with Controlled Inputs.
   Specific Control Use: Dropdown boxes are strictly enforced for *Mood Upon Waking* and *Dream Clarity* to ensure structured data for future trend analysis.
   Future Consideration (Phase 2): Voice-to-Text transcription integration into the primary Dream Narrative text area.

3.2 Dashboard Visualization
   Interaction Pattern: Data Visualization Display.
   Charts should use the application's dreamy, pastel color palette.
   Visualizations must display: Mood upon waking over time, key objects/symbols frequency (simple bar/word cloud), and pre-sleep activities frequency.

3.3 Subscription Gate (For Free Users hitting limit)
   Interaction Pattern: Hard Stop/Upsell Prompt.
   Trigger: User attempts to generate an AI insight when the counter shows 0/5 used.
   Behavior: Non-intrusive modal appears linking directly to the subscription page (Monetization Flow entry point, Phase 2). This interruption does not block access to recording or viewing historical dreams.

4. USER FLOW SUMMARY MAP (Conceptual Flow Points)

[Landing Page] -> (Sign Up/Login) -> [Dashboard]
[Dashboard] -> (New Dream Click) -> [Dream Input Form] -> (Submit) -> [Dream Detail View (w/ or w/o AI)]
[Dashboard] -> (Existing Dream Click) -> [Dream Detail View]
[Dream Detail View (No AI)] -> (Request AI) -> (Check Credits) -> [Generate Insight] OR [Display Upgrade Prompt]
[Dream Detail View (Has AI)] -> (View Trends/Analysis) -> [End/Return to Dashboard]

## Styling Guidelines
DREAMSSAVER STYLING GUIDELINES DOCUMENT

1. INTRODUCTION

1.1 Purpose
This document establishes the core visual and interaction principles for Dreamssaver. It ensures a consistent, cohesive, and on-brand aesthetic that embodies the requested "dreamy" quality, supporting the application's function as a safe and reflective dream journaling tool.

1.2 Brand Aesthetic Summary
The style must evoke a sense of calm, introspection, and ethereal beauty, utilizing soft textures, flowing transitions, and a color palette inspired by twilight, dawn, and gentle memories.

2. COLOR PALETTE

The palette emphasizes pastels and low-contrast combinations to maintain a soft, non-jarring visual experience conducive to reflecting on dreams.

2.1 Primary Colors (The Dream State)
| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| Deep Twilight (Background Base) | #1A1A2E | Primary application background, containers that need subtle depth. |
| Soft Lavender (Primary Accent) | #C792EA | Primary buttons, active states, key AI insight highlights. |
| Celestial White (Text/Canvas) | #F0F4F8 | Main text color, input fields, main canvas surfaces. |

2.2 Secondary Colors (Emotional/Insight Tones)
These colors should be used sparingly for data visualization and meta-information tagging. They must remain pastel and desaturated.

| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| Gentle Rose (Joy/Nostalgia) | #FFB6C1 | Positive tags, mood charts. |
| Muted Teal (Calm/Clarity) | #AEC6CF | Neutral or high-clarity tags. |
| Hazy Grey (Anxiety/Stress) | #B0C4DE | Cautionary tags, lower intensity data points. |

2.3 Gradients and Overlays
Soft, radial gradients should be used strategically on the landing page and dashboard headers to simulate light filtering through clouds or water. Avoid sharp, linear gradients.

3. TYPOGRAPHY

Typography must be highly legible but carry a gentle, flowing quality.

3.1 Typeface Selection
Primary Font: A clean, modern sans-serif for excellent readability on all screen sizes (e.g., Inter or Lato).
Secondary Font (Headings/Branding): A humanist sans-serif or a carefully selected serif font that suggests vintage journaling (e.g., Lora or Playfair Display) used sparingly for H1 and application branding only.

3.2 Hierarchy

| Element | Font Family | Weight | Size (Desktop) | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| H1 (Page Titles) | Secondary | Bold | 48px | 1.1 | Landing page title, Dashboard main header. |
| H2 (Section Titles) | Primary | Semi-Bold | 28px | 1.3 | Dashboard sections (e.g., "Your Insights"). |
| Body Text (Main Content) | Primary | Regular | 16px | 1.6 | Dream entry content, descriptions. |
| Meta Data/Labels | Primary | Light | 14px | 1.5 | Dates, mood tags, input field labels. |

4. UI COMPONENTS AND ELEMENTS

4.1 Buttons and Interactive Elements
Buttons should utilize rounded corners (minimum 8px radius) to soften edges.
Default State: Soft Lavender background (#C792EA) with Celestial White text.
Hover State: Background lightens slightly (e.g., #D2A7F0).
Disabled State (e.g., Subscription wall): Low opacity or light greyed-out background.

4.2 Input Fields and Text Areas
Input fields (for login, sign-up, and dream entry) should have a very light border or utilize a subtle "frosted glass" effect against the Deep Twilight background.
Focus State: A soft glow using the Primary Accent color rather than a harsh solid border.

4.3 Cards and Containers
Containers (used for dream summaries on the dashboard, insight boxes) should employ soft shadows (low opacity, large spread) or a subtle internal gradient overlay to lift them slightly off the background, mimicking floating objects.

4.4 Iconography
Icons should be line-based, minimalist, and utilize the Celestial White or Soft Lavender color. Avoid overly complex or heavy solid icons. They should feel light and airy.

5. VISUAL MOTIFS AND ABSTRACTION

5.1 Abstract Art Integration
The application must incorporate abstract art motifs reflecting the "dreamy" requirement:
*   **Background Textures:** Subtle, low-opacity overlays featuring abstract watercolor washes or nebulae patterns on background surfaces, especially the Landing Page.
*   **Dividers:** Use subtle, flowing curves or dashed lines instead of hard horizontal rules to separate sections.

5.2 Imagery (Landing Page)
Any hero imagery used on the landing page should feature soft focus, pastel tones, and themes related to the cosmos, clouds, or flowing water, avoiding literal or photorealistic representations of sleep.

6. USER INTERFACE (UI) AND USER EXPERIENCE (UX) PRINCIPLES

6.1 Navigation and Flow
Navigation should feel intuitive and non-disruptive. Use a persistent but subtly styled sidebar or fixed top navigation.

6.2 Transitions and Animation
Crucial for the dreamy feel:
*   **Page Transitions:** Slow, fading transitions (cross-fade or gentle slide) between main views (Dashboard to Dream Detail). Avoid instant jumps.
*   **Micro-interactions:** Hover effects and state changes should be smooth, using easing functions that feel less mechanical (e.g., ease-out-quint).

6.3 Data Visualization (Dashboard)
Charts (mood trends, emotional tagging) must strictly adhere to the pastel color palette defined in Section 2.2. The focus is on displaying trends and cycles (recurring symbols, emotional shifts) rather than dense, analytical data dumps. Visualizations should feel illustrative rather than purely quantitative.

6.4 Free Tier/Subscription Indication
The AI Insight counter (free tier limit of 5) must be highly visible on the dashboard, utilizing the Hazy Grey for neutral status and shifting to Soft Lavender when nearing the limit. The subscription CTA must be clear but integrate smoothly with the overall aesthetic, perhaps using a slightly richer, deeper purple gradient to signify the "unlocked" potential.

7. PLATFORM CONSIDERATIONS

7.1 Responsiveness
The design must prioritize mobile usability, as dream journaling often occurs immediately upon waking. On smaller screens, elements should stack gracefully, and touch targets must meet accessibility standards (minimum 44x44px).

7.2 Accessibility (Contrast)
While employing pastels, ensure that primary text (Celestial White) against Deep Twilight achieves WCAG AA contrast standards. Ensure sufficient contrast for all functional elements.
