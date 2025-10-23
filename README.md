# BroTech Web Solutions - Vercel Deployment Guide

This guide will help you fix the Firestore connection errors and successfully deploy your application on Vercel.

## The Problem: Missing API Key on Vercel

Your application works locally because it can access your secret API key. For security reasons, Vercel cannot access your local files, so when you deploy your site, the `API_KEY` is missing. Without this key, your app cannot connect to Firebase, causing the "client is offline" errors.

**IMPORTANT: Never paste your secret `apiKey` directly into your code. This is a major security risk.** The code is already correctly set up to use an "environment variable" (`process.env.API_KEY`). You just need to provide this variable to Vercel.

## The Solution: Add Your API Key to Vercel

Follow these three steps carefully.

### Step 1: Get Your API Key from Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project (`brotech-web-solutions`).
3.  In the top-left corner, click the **gear icon ⚙️** next to "Project Overview," then select **Project settings**.
4.  Under the **General** tab, scroll down to the "Your apps" section.
5.  Find your web app and look for the "Firebase SDK snippet" section. Select the **Config** option.
6.  You will see a block of code. Copy the value for `apiKey`. It will look something like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXX", // <-- COPY THIS VALUE
      authDomain: "brotech-web-solutions.firebaseapp.com",
      // ... more settings
    };
    ```

### Step 2: Add the API Key to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click on the project you are trying to deploy.
3.  Navigate to the **Settings** tab.
4.  In the left sidebar, click on **Environment Variables**.
5.  Create a new variable with the following details (it must be an exact match):
    *   **Name:** `API_KEY`
    *   **Value:** Paste the `apiKey` you copied from Firebase in Step 1.
6.  Leave the default environments (Production, Preview, Development) checked and click **Save**.

### Step 3: Redeploy Your Application (Crucial!)

Vercel only uses the new environment variable during a fresh build. You must trigger a new deployment.

1.  Go to the **Deployments** tab in your Vercel project.
2.  Find the most recent deployment, click the **three-dots menu (...)** on the right, and select **Redeploy**.
3.  Confirm the redeployment and wait for it to finish.

Once the new deployment is complete, your application will have the correct `API_KEY`, Firebase will connect, and all features will work as expected.
