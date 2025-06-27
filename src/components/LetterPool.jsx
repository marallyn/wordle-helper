import { useDrop } from "react-dnd";
import Letter from "./Letter";

const LetterPool = ({ letters, onDropLetter, selectedLetter, title, type }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "letter",
    drop: (item) =>
      onDropLetter({ letter: item.letter, fromType: item.type, toType: type }),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      className={`
        border-2 border-dashed p-4 min-h-[150px] rounded-lg
        ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-100"}
        flex flex-wrap items-start content-start
      `}
    >
      <h3 className="w-full text-xl font-semibold mb-2 text-gray-700">
        {title}
      </h3>

      {letters.map((letter) => (
        <Letter
          key={`letter-${letter}`}
          letter={letter}
          selectedLetter={selectedLetter}
          type={type}
        />
      ))}
    </div>
  );
};

export default LetterPool;
