import { useContext } from "react";
import { StateContext } from "../context/contexts";

const WordList = () => {
  const { remainingWords: words } = useContext(StateContext);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full max-h-96 overflow-y-auto mb-2">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">
        {words.length} Words
      </h2>
      <ul className="list-disc list-inside text-gray-800">
        {words.length > 0 ? (
          words.map((word, index) => (
            <li key={index} className="mb-1 text-lg">
              {word.toLowerCase()}
            </li>
          ))
        ) : (
          <li className="italic text-gray-500">No words to display yet!</li>
        )}
      </ul>
    </div>
  );
};

export default WordList;
