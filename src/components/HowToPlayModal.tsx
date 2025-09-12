import React, { useState, useEffect } from "react"

interface HowToPlayModalProps {
  isOpen: boolean
  onClose: () => void
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false)

  // Effect to handle saving the preference to localStorage when the checkbox changes
  useEffect(() => {
    localStorage.setItem("hideHowToPlayModal", String(doNotShowAgain))
  }, [doNotShowAgain])

  if (!isOpen) {
    return null // Don't render anything if the modal is not open
  }

  const handleClose = () => {
    onClose() // Call the parent's onClose handler
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative transform transition-all sm:my-8 sm:w-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
          How to Play Wordle Helper
        </h2>

        {/* Modal Content */}
        <div className="text-gray-700 text-base space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
          <p>
            Welcome to Wordle Helper! This tool is designed to assist you in
            conquering your daily Wordle challenge.
          </p>
          <p>Here's a quick guide to get started:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Enter your Wordle guesses:</strong> As you play Wordle,
              input your guesses into the helper.
            </li>
            <li>
              <strong>Mark letter statuses:</strong> For each letter, indicate
              its status:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>
                  <span className="font-semibold text-green-600">Green:</span>{" "}
                  Correct letter, correct position.
                </li>
                <li>
                  <span className="font-semibold text-yellow-600">Yellow:</span>{" "}
                  Correct letter, wrong position.
                </li>
                <li>
                  <span className="font-semibold text-gray-500">Gray:</span>{" "}
                  Letter not in the word.
                </li>
              </ul>
            </li>
            <li>
              <strong>Get suggestions:</strong> The helper will filter potential
              words based on your input, giving you smarter guesses.
            </li>
            <li>
              <strong>Enjoy!</strong> Use the tool to improve your Wordle
              strategy and brag to your friends.
            </li>
          </ol>
          <p className="italic text-sm text-gray-600 mt-4">
            Remember, practice makes perfect. Or at least, makes you look like a
            genius in front of your friends!
          </p>
        </div>

        {/* Footer with Checkbox */}
        <div className="border-t pt-4 flex items-center justify-between">
          <label
            htmlFor="doNotShow"
            className="flex items-center cursor-pointer text-gray-700"
          >
            <input
              type="checkbox"
              id="doNotShow"
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded focus:ring-blue-500 mr-2"
              checked={doNotShowAgain}
              onChange={e => setDoNotShowAgain(e.target.checked)}
            />
            Don't show this again
          </label>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  )
}

export default HowToPlayModal
