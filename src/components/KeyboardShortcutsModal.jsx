const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center p-4 z-50"
      // className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-colors duration-200"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="text-gray-700 text-lg">
          <ul className="list-none space-y-3 text-sm">
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-semibold">? / Esc </span>
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-mono">
                show / hide Shortcuts (this modal!)
              </span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-semibold">a - z</span>
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-mono">
                selects the available letter
              </span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-semibold">With letter selected...</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-semibold">u</span>
              <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-mono">
                move selected to unused pool
              </span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-semibold text-left">1, 2, 3, 4, 5</span>
              <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-mono">
                adds letter to position 1-5 in the correct letter pool
              </span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
              <span className="font-semibold text-left">
                shift + 1, 2, 3, 4, 5
              </span>
              <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-mono">
                adds letter to position 1-5 in the wrong letter pool
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
