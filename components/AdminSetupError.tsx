import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AdminSetupError: React.FC = () => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-8 rounded-r-lg max-w-4xl mx-auto col-span-full my-8 shadow-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-8 w-8 text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-5">
          <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Action Required: API Key is Missing or Incorrect</h3>
          <div className="mt-3 text-base text-red-700 dark:text-red-300 space-y-4">
            <p>This part of the website cannot connect to the database. This is a deployment configuration issue, not a bug.</p>
            <h4 className="font-bold text-red-800 dark:text-red-200 text-lg">To fix this, follow these steps:</h4>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Step 1: Get Your API Key</strong>
                <p className="pl-2">
                  Go to your project settings in the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-red-900 dark:hover:text-red-100">Firebase Console</a>, find your web app's configuration, and copy the `apiKey` value.
                </p>
              </li>
              <li>
                <strong>Step 2: Add it to Vercel with the Correct Name</strong>
                <p className="pl-2">
                  In your Vercel project dashboard, go to <strong>Settings &gt; Environment Variables</strong>. Create a new variable. The name must be exact.
                </p>
                <div className="pl-6 my-2 space-y-1 font-mono text-sm border-l-2 border-red-300 dark:border-red-600 ml-2 py-2 px-4 bg-red-100 dark:bg-red-900/40 rounded-md">
                    <p><strong>Name:</strong> <code className="bg-red-200 dark:bg-red-800/50 px-2 py-1 rounded">REACT_APP_API_KEY</code></p>
                    <p><strong>Value:</strong> Paste the key you copied from Firebase.</p>
                </div>
                 <p className="pl-2 text-xs italic">(If you have an old variable named `API_KEY`, please delete it.)</p>
              </li>
              <li>
                <strong>Step 3: Redeploy Your Application</strong>
                <p className="pl-2">
                  Go to the <strong>Deployments</strong> tab in Vercel and trigger a **Redeploy** for the changes to take effect.
                </p>
              </li>
            </ol>
            <p className="font-semibold pt-3 border-t border-red-200 dark:border-red-700">Once you complete these steps, this message will disappear and the content will load correctly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetupError;