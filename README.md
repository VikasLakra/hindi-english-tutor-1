# English-learning Tutor for Hindi Speakers

A beginner-friendly English tutor for Hindi-speaking learners. The app supports guided translation, correction, vocabulary, quizzes, conversation practice, grammar lessons, progress tracking, and a premium learning route.

## Included

- Responsive learning workspace with daily practice and progress tracking
- Translate & Learn, Correct My English, Vocabulary, Conversation, Quick Quiz, and Grammar stations
- Server-side tutor responses with a deterministic fallback when the tutor key is unavailable
- Browser-based practice progress and streak continuity
- Premium access at $1/month with a 7-day free trial
- Secure checkout, subscription lifecycle handling, and protected premium lessons

## Run locally

1. Install Node.js 20 or newer.
2. Install dependencies with `npm install`.
3. Provide the required database, authentication, tutor, and payment values through your local environment.
4. Start the app with `npm run dev`.

## Required configuration

The app needs values for the app database, sign-in sessions, live tutor responses, server-side billing, browser checkout, and billing event verification. Keep those values in your local environment and never commit them to source control. The project includes a value-free configuration manifest for reference.

## Useful scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` checks the source for lint issues.
- `npm run db:push` applies the current database schema.

## GitHub upload

From the project folder:

```bash
git init
git add .
git commit -m "Initial project upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Create an empty GitHub repository first, replacing `YOUR-USERNAME` and `YOUR-REPOSITORY` with the account and repository name. Do not add a README, license, or ignore file during GitHub’s repository creation because this project already includes them.
