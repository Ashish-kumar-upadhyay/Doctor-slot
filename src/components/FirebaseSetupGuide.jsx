import React, { useState } from 'react';

const FirebaseSetupGuide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [configPasted, setConfigPasted] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Firebase Console Open Kariye",
      description: "https://console.firebase.google.com/ pe jao aur login kariye",
      action: "Open Firebase Console"
    },
    {
      id: 2,
      title: "New Project Banaye",
      description: "'Create a project' click karke naya project banaye",
      action: "Create Project"
    },
    {
      id: 3,
      title: "Web App Add Kariye",
      description: "</> icon click karke web app register kariye",
      action: "Register Web App"
    },
    {
      id: 4,
      title: "Config Copy Kariye",
      description: "Firebase config object copy kariye",
      action: "Copy Config"
    },
    {
      id: 5,
      title: "Authentication Enable Kariye",
      description: "Authentication > Sign-in method > Email/Password enable kariye",
      action: "Enable Auth"
    },
    {
      id: 6,
      title: "Firestore Setup Kariye",
      description: "Firestore Database > Create database > Test mode select kariye",
      action: "Setup Firestore"
    },
    {
      id: 7,
      title: "Authorized Domains Add Kariye",
      description: "Authentication > Settings > Authorized domains mein localhost add kariye",
      action: "Add Domains"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            🔥 Firebase Setup Guide
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-700">Progress</span>
              <span className="text-sm font-medium text-blue-700">
                {currentStep}/{steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                {currentStep}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {steps[currentStep - 1].title}
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              {steps[currentStep - 1].description}
            </p>
            
            {currentStep === 4 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-4">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  📋 Config Copy Karne Ke Baad:
                </h3>
                <p className="text-yellow-700 text-sm">
                  Firebase config copy karke <code className="bg-yellow-200 px-1 rounded">src/firebase/new-config.js</code> file mein paste kariye
                </p>
                <button
                  onClick={() => setConfigPasted(true)}
                  className={`mt-2 px-4 py-2 rounded text-sm ${
                    configPasted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  }`}
                >
                  {configPasted ? '✅ Config Pasted' : 'Mark as Pasted'}
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              ← Previous
            </button>

            <div className="flex space-x-2">
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
              >
                🔗 Open Firebase Console
              </a>
              
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentStep === steps.length
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {currentStep === steps.length ? '🎉 Complete!' : 'Next →'}
              </button>
            </div>
          </div>

          {/* Completion Message */}
          {currentStep === steps.length && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-semibold mb-2">
                🎉 Firebase Setup Complete!
              </h3>
              <p className="text-green-700 text-sm">
                Ab aap <code className="bg-green-200 px-1 rounded">/debug</code> page pe ja kar 
                Firebase connection test kar sakte hain.
              </p>
              <div className="mt-3">
                <a
                  href="/debug"
                  className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  🧪 Test Firebase Connection
                </a>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              📚 Quick Links:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100"
              >
                <div className="font-medium text-blue-800">Firebase Console</div>
                <div className="text-sm text-blue-600">Project management</div>
              </a>
              <a
                href="/debug"
                className="block p-3 bg-green-50 border border-green-200 rounded hover:bg-green-100"
              >
                <div className="font-medium text-green-800">Debug Page</div>
                <div className="text-sm text-green-600">Test connection</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseSetupGuide;
