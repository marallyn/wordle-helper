import useAppState from "../hooks/useAppState";

export default function WordList() {
  const { remainingWords } = useAppState();
  const words = remainingWords.join(", ");

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full max-h-96 overflow-y-auto mb-2">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">
        {remainingWords.length.toLocaleString()} Matching Words
      </h2>
      <p className="text-justify text-gray-800">{words}</p>
    </div>
  );
}
