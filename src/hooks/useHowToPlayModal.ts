import React, { useState, useEffect } from "react"
import HowToPlayModal from "./components/HowToPlayModal"
// Import your other components here

function App() {
  const [showModal, setShowModal] = useState(false)

  // useEffect to check localStorage on initial load
  useEffect(() => {
    // Check if the user has previously opted to hide the modal
    const hasHiddenModal = localStorage.getItem("hideHowToPlayModal")
    if (hasHiddenModal !== "true") {
      // If they haven't hidden it, show the modal
      setShowModal(true)
    }
  }, []) // Empty dependency array means this runs once on component mount

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      {/* Your main application content goes here */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Wordle Helper
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Start crushing those Wordles!
      </p>
      {/* Example: A button to open the modal manually, for testing or user access */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Show How to Play
      </button>

      {/* The Modal Component */}
      <HowToPlayModal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  )
}

export default App
