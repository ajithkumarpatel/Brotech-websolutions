import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FirestoreIndexErrorProps {
  errorMessage: string;
}

const FirestoreIndexError: React.FC<FirestoreIndexErrorProps> = ({ errorMessage }) => {
  const urlMatch = errorMessage.match(/(https?:\/\/[^\s]+)/);
  const indexUrl = urlMatch ? urlMatch[0] : null;
  
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg max-w-3xl mx-auto col-span-full">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-yellow-500" aria-hidden="true" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300">Action Required: Database Configuration</h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400 space-y-4">
            <p>To show blog posts, your Firestore database needs a specific 'index'. This is a one-time setup that allows for efficient data sorting and filtering.</p>
            {indexUrl ? (
              <div>
                <a
                  href={indexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold inline-block text-yellow-900 dark:text-yellow-100 bg-yellow-300 dark:bg-yellow-700/80 px-4 py-2 rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-600/80 transition-colors"
                >
                  Create Database Index
                </a>
              </div>
            ) : (
              <p className="font-semibold">Please check the browser's developer console for a link to create the required index.</p>
            )}
            <p>Clicking the button will take you to your Firebase console to create the index. It may take a few minutes for it to become active. Afterward, please refresh this page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirestoreIndexError;
