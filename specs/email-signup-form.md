# Feature: Email Signup Form with Convex Backend

## Feature Description
An email signup form for the AI learning platform that allows visitors to sign up for more information by providing their email address and optional name. The form will persist signups to a Convex backend database, enabling the platform to build an early user list for launch communications and community building.

## User Story
As a visitor to the AI learning platform
I want to sign up with my email and name to receive more information
So that I can stay informed about the platform launch and new features

## Problem Statement
The platform is in early development and needs a way to capture interested users' contact information before full launch. There is currently no backend infrastructure or mechanism for collecting and storing user signups.

## Solution Statement
Implement a clean, user-friendly email signup form on the homepage that:
1. Collects email (required) and name (optional) from users
2. Stores signups in a Convex database with timestamps
3. Provides immediate feedback on successful signup
4. Prevents duplicate email signups
5. Validates email format on both client and server

## Relevant Files
Use these files to implement the feature:

- `src/app/page.tsx` - Main homepage where the signup form will be displayed. Will be modified to include the signup form component.
- `src/app/layout.tsx` - Root layout file. Will be modified to wrap the app with Convex provider.
- `src/app/globals.css` - Global styles with Tailwind CSS 4 setup. May need minor additions for form styling.
- `package.json` - Project dependencies. Will add Convex dependency.
- `convex_rules.txt` - Convex coding guidelines to follow when implementing backend functions.

### New Files
- `convex/schema.ts` - Database schema defining the signups table
- `convex/signups.ts` - Convex functions for creating and querying signups
- `convex/tsconfig.json` - TypeScript configuration for Convex
- `src/components/EmailSignupForm.tsx` - React component for the signup form
- `src/app/ConvexClientProvider.tsx` - Client-side Convex provider component

## Implementation Plan
### Phase 1: Foundation
Set up Convex backend infrastructure:
- Install Convex and initialize the project
- Create the database schema for storing signups
- Configure TypeScript for Convex functions
- Set up the Convex provider in the Next.js app

### Phase 2: Core Implementation
Build the signup functionality:
- Create Convex mutation for adding new signups with validation
- Create Convex query for checking duplicate emails (internal use)
- Build the React form component with client-side validation
- Implement form state management and submission handling
- Add success/error feedback UI

### Phase 3: Integration
Connect frontend to backend:
- Integrate the signup form into the homepage
- Test the complete flow end-to-end
- Handle edge cases (duplicate emails, network errors)
- Verify data persistence in Convex dashboard

## Step by Step Tasks

### Step 1: Install Convex Dependencies
- Run `npm install convex` to add Convex to the project
- Verify the installation completes successfully

### Step 2: Initialize Convex
- Run `npx convex dev` to initialize Convex in the project
- This will create the `convex/` directory structure
- Follow prompts to create/link a Convex project
- Note: This will generate `convex/_generated/` files

### Step 3: Create Convex Schema
- Create `convex/schema.ts` with the signups table
- Define fields: email (string, required), name (string, optional), createdAt (number)
- Add index on email field for duplicate checking (`by_email`)

### Step 4: Create Convex Functions
- Create `convex/signups.ts` with the following functions:
  - `createSignup` (public mutation): validates and creates new signup, checks for duplicates
  - `getSignupByEmail` (internal query): checks if email already exists
- Follow Convex guidelines: use new function syntax, include validators, use `withIndex` not `filter`

### Step 5: Create Convex Provider
- Create `src/app/ConvexClientProvider.tsx` as a client component ("use client")
- Import and configure ConvexProvider with the Convex URL from environment
- Export the provider component for use in layout

### Step 6: Update Root Layout
- Modify `src/app/layout.tsx` to wrap children with ConvexClientProvider
- Ensure proper client/server component boundaries

### Step 7: Create Email Signup Form Component
- Create `src/components/EmailSignupForm.tsx` as a client component
- Implement form with:
  - Email input (required, with validation)
  - Name input (optional)
  - Submit button
  - Loading state during submission
  - Success message after successful signup
  - Error message for duplicates or failures
- Use Convex `useMutation` hook to call createSignup
- Style with Tailwind CSS to match existing design

### Step 8: Integrate Form into Homepage
- Modify `src/app/page.tsx` to include the EmailSignupForm component
- Position the form prominently with appropriate context text
- Update the page content to reflect the AI learning platform theme

### Step 9: Run Development Server and Test
- Start the development server with `npm run dev`
- Run Convex dev server (if not already running)
- Test the signup flow manually:
  - Submit with valid email and name
  - Submit with only email
  - Submit with duplicate email (should show error)
  - Submit with invalid email format
- Verify data appears in Convex dashboard

### Step 10: Run Build and Lint
- Execute `npm run build` to verify production build succeeds
- Execute `npm run lint` to check for code quality issues
- Fix any errors or warnings that arise

## Testing Strategy
### Unit Tests
- Form validation logic (email format, required fields)
- Component rendering with different states (idle, loading, success, error)

### Integration Tests
- End-to-end signup flow with Convex backend
- Duplicate email prevention
- Form submission and database persistence

### Edge Cases
- Empty email submission (should be blocked by validation)
- Invalid email format (should show validation error)
- Duplicate email submission (should show friendly error message)
- Network failure during submission (should show error, allow retry)
- Very long name or email (should be handled gracefully)
- Special characters in name field
- Form submission while already submitting (prevent double submission)

## Acceptance Criteria
- [ ] Convex is properly initialized and configured in the project
- [ ] Signup form is visible on the homepage with clear call-to-action
- [ ] Users can submit their email (required) and name (optional)
- [ ] Form validates email format before submission
- [ ] Successful signups are stored in Convex database with timestamp
- [ ] Users receive clear success feedback after signup
- [ ] Duplicate emails are rejected with a friendly message
- [ ] Form shows loading state during submission
- [ ] Form handles errors gracefully and allows retry
- [ ] Code passes lint checks with no errors
- [ ] Production build completes successfully

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

```bash
# Install dependencies
npm install

# Run linting to check code quality
npm run lint

# Run production build to verify no build errors
npm run build

# Start development server (manual testing)
npm run dev
```

Note: Manual testing should verify:
1. Form renders correctly on homepage
2. Submit with valid email creates entry in Convex dashboard
3. Submit with duplicate email shows error
4. Submit with invalid email shows validation error
5. Loading state appears during submission
6. Success state appears after successful submission

## Notes
- Convex requires a project to be created via `npx convex dev` which will prompt for authentication
- The Convex URL will be stored in `.env.local` as `NEXT_PUBLIC_CONVEX_URL`
- For production deployment, Convex production credentials will need to be configured
- Future enhancements could include:
  - Admin dashboard to view signups
  - Export signups to CSV
  - Email verification flow
  - Welcome email automation via Convex actions
- The form design should be clean and match the existing minimalist aesthetic of the site
