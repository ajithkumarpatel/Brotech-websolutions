import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AdminSetupError: React.FC = () => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg max-w-4xl mx-auto col-span-full my-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-300">Action Required: API Key is Missing</h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-400 space-y-4">
            <p>This part of the website cannot connect to the database because the required API key has not been configured in the deployment environment.</p>
            <h4 className="font-semibold text-red-800 dark:text-red-300">To fix this, follow these steps:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Step 1: Get the API Key</strong>
                <p className="pl-2">Go to your project settings in the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-bold underline">Firebase Console</a>, find your web app configuration, and copy the `apiKey` value.</p>
              </li>
              <li>
                <strong>Step 2: Add it to Vercel</strong>
                <p className="pl-2">In your Vercel project dashboard, go to <strong>Settings &gt; Environment Variables</strong>. Create a new variable with the following details:</p>
                <div className="pl-4 my-2">
                    <p><strong>Name:</strong> <code className="bg-red-200 dark:bg-red-800/50 px-1 py-0.5 rounded text-xs">API_KEY</code></p>
                    <p><strong>Value:</strong> Paste the key you copied from Firebase.</p>
                </div>
              </li>
              <li>
                <strong>Step 3: Redeploy</strong>
                <p className="pl-2">Go to the <strong>Deployments</strong> tab in Vercel and trigger a new deployment for the changes to take effect.</p>
              </li>
            </ol>
            <p className="font-semibold">Once you complete these steps, this message will disappear and the content will load correctly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetupError;
