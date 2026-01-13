# Feature: Deploy to Vercel

## Feature Description
Deploy the Next.js application with Convex backend to Vercel for production hosting. This involves setting up Vercel project configuration, configuring environment variables for the Convex production deployment, and ensuring the build pipeline correctly handles both the Next.js frontend and Convex backend synchronization.

## User Story
As a **developer/project owner**
I want to **deploy the application to Vercel**
So that **users can access the application on a live production URL with reliable hosting and automatic deployments**

## Problem Statement
The application is currently only running in development mode locally. To make it available to users, it needs to be deployed to a production environment. Vercel is the natural choice for Next.js applications as it provides seamless integration, automatic SSL, CDN, and continuous deployment from Git.

## Solution Statement
Set up Vercel deployment by:
1. Installing and configuring the Vercel CLI
2. Creating a Vercel project linked to the repository
3. Setting up production Convex deployment and environment variables
4. Configuring the build process to push Convex functions to production
5. Deploying and verifying the application works correctly

## Relevant Files
Use these files to implement the feature:

- `package.json` - Contains build scripts; may need to add a `vercel-build` script to deploy Convex functions during Vercel build
- `.env.local` - Contains current development Convex configuration; needs production equivalent in Vercel
- `next.config.ts` - Next.js configuration; verify it's compatible with Vercel deployment
- `convex/` - Contains all Convex backend functions that need to be deployed to production Convex deployment
- `.gitignore` - Already configured to ignore `.vercel` directory

### New Files
- `.env.example` - Document required environment variables for deployment
- `vercel.json` (optional) - Vercel configuration if custom settings are needed

## Implementation Plan

### Phase 1: Foundation
- Ensure the Convex production deployment is set up (via Convex dashboard)
- Document all required environment variables
- Verify the local build works without errors before deploying

### Phase 2: Core Implementation
- Install Vercel CLI and authenticate
- Create and link Vercel project
- Configure environment variables in Vercel dashboard
- Set up build command to deploy Convex functions to production

### Phase 3: Integration
- Deploy to Vercel
- Verify the production application connects to production Convex
- Test all functionality works correctly in production
- Set up automatic deployments from main branch

## Step by Step Tasks

### Step 1: Verify Local Build
- Run `npm run build` to ensure the application builds successfully locally
- Fix any build errors before proceeding with deployment

### Step 2: Create Environment Variables Documentation
- Create `.env.example` file documenting required environment variables:
  - `NEXT_PUBLIC_CONVEX_URL` - The Convex production deployment URL
  - `CONVEX_DEPLOY_KEY` - For deploying Convex functions during build (if using automated deploys)

### Step 3: Set Up Convex Production Deployment
- Log into Convex dashboard at https://dashboard.convex.dev
- Navigate to project settings and note the production deployment URL
- Generate a deploy key for CI/CD deployment (found in project settings)

### Step 4: Install Vercel CLI
- Run `npm install -g vercel` to install Vercel CLI globally
- Run `vercel login` to authenticate with Vercel account

### Step 5: Initialize Vercel Project
- Run `vercel` in project root to create and link a new Vercel project
- Configure project settings:
  - Framework: Next.js (auto-detected)
  - Build Command: Use custom command that includes Convex deploy
  - Output Directory: `.next` (default)
  - Install Command: `npm install` (default)

### Step 6: Configure Vercel Environment Variables
- Add the following environment variables in Vercel dashboard or via CLI:
  - `NEXT_PUBLIC_CONVEX_URL` = Production Convex URL (e.g., `https://your-project.convex.cloud`)
  - `CONVEX_DEPLOY_KEY` = Deploy key from Convex dashboard (for Production environment)

### Step 7: Update Build Configuration
- Modify `package.json` to add a build script that deploys Convex:
  ```json
  "scripts": {
    "build": "npx convex deploy --cmd 'npm run build:next'",
    "build:next": "next build"
  }
  ```
- This ensures Convex functions are deployed before/during the Next.js build

### Step 8: Deploy to Vercel
- Run `vercel --prod` to deploy to production
- Or push to main branch if Git integration is configured

### Step 9: Verify Production Deployment
- Visit the production URL provided by Vercel
- Test the email signup form submits successfully
- Verify data appears in Convex production dashboard
- Check browser console for any errors

### Step 10: Configure Git Integration (Optional)
- In Vercel dashboard, connect the GitHub repository
- Configure automatic deployments on push to main branch
- Set up preview deployments for pull requests

## Testing Strategy

### Unit Tests
- N/A for deployment configuration

### Integration Tests
- Verify the production site loads correctly
- Test the email signup form end-to-end on production
- Verify Convex mutations work in production environment

### Edge Cases
- Test behavior when Convex is temporarily unavailable
- Verify environment variables are correctly loaded
- Test on different browsers and devices

## Acceptance Criteria
- [ ] Application is accessible at a Vercel production URL
- [ ] Email signup form works correctly in production
- [ ] Data is stored in Convex production deployment (not development)
- [ ] SSL certificate is active (HTTPS works)
- [ ] Build completes successfully without errors
- [ ] Environment variables are securely configured (not exposed in client)

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

```bash
# Verify local build works
npm run build

# Verify lint passes
npm run lint

# Check Vercel deployment status (after deployment)
vercel ls

# View production logs
vercel logs --prod

# Test the production URL is accessible
curl -I https://your-vercel-url.vercel.app
```

## Notes
- **Convex Deploy Key**: The `CONVEX_DEPLOY_KEY` should be generated from the Convex dashboard under Project Settings > Deploy Keys. This key allows CI/CD systems to deploy to production without interactive login.
- **Environment Variable Naming**: `NEXT_PUBLIC_` prefix is required for variables that need to be exposed to the browser (like the Convex URL). The deploy key should NOT have this prefix as it's only used server-side during build.
- **Preview Deployments**: Vercel automatically creates preview deployments for PRs. These will use the same environment variables unless you configure branch-specific variables. Consider using the development Convex deployment for preview branches.
- **Convex Deployment Strategy**: There are two approaches:
  1. **Recommended**: Use `npx convex deploy` as part of the build command with a deploy key
  2. **Alternative**: Manually deploy Convex via `npx convex deploy` locally before pushing, then only build Next.js on Vercel
- **Cost Considerations**: Both Vercel and Convex have free tiers that should be sufficient for initial deployment. Monitor usage as the application scales.
