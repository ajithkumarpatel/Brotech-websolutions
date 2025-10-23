# BroTech Web Solutions - Vercel Deployment Guide

This guide explains the single most important step to get your deployed website working correctly on Vercel.

## The Problem: "Could not connect to the database" Error

After deploying, you might see errors on pages like the Blog or Pricing, stating that the application cannot connect to the database or that the API key is missing.

This is expected behavior because your live website, for security reasons, does not have access to your secret API key. You must provide it to Vercel.

## The Solution: Add the API Key to Vercel

Follow these three steps to fix the issue permanently.

### Step 1: Get Your API Key from Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project: `brotech-web-solutions`.
3.  Click the **gear icon ⚙️** (Project settings) in the top-left menu.
4.  In the **General** tab, scroll down to the "Your apps" section.
5.  Find the `apiKey` value in the configuration object. It will be a long string of characters.
6.  **Copy this entire key.**

### Step 2: Add the API Key to Vercel

1.  Open your project dashboard on [Vercel](https://vercel.com/dashboard).
2.  Go to the **Settings** tab.
3.  Click on **Environment Variables** in the left-hand menu.
4.  Create a new variable with these **exact** details:
    -   **Name:** `API_KEY`
    -   **Value:** Paste the API key you copied from Firebase.
5.  Click **Save**.

### Step 3: Redeploy Your Application (Crucial)

Vercel needs to rebuild your site to use the new key.

1.  Go to the **Deployments** tab in your Vercel project.
2.  Find the most recent deployment, click the three-dots menu (...) on the right, and select **Redeploy**.
3.  Wait for the new deployment to finish.

Once the redeployment is complete, your website will be able to connect to Firebase, and all errors will be resolved.
