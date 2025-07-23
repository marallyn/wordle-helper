import { useDrag } from "react-dnd";
import { Letter, LetterPoolTypes } from "../types/common";
import { DnDTypes } from "../types/drag-n-drop";

const typeClasses = (type: LetterPoolTypes) => {
  switch (type) {
    case "available":
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case "correct-position":
      return "bg-green-500 text-white";
    case "wrong-place":
      return "bg-yellow-500 text-black";
    case "not-used":
      return "bg-gray-400 text-white";
  }
};

interface LetterProps {
  letter: Letter;
  selectedLetter: Letter | null;
  type: LetterPoolTypes;
}

const LetterBox = ({ letter, selectedLetter, type }: LetterProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DnDTypes.LETTER,
    item: { letter, type },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  }));

  const classes =
    letter === selectedLetter ? "bg-red-400 text-white" : typeClasses(type);

  return (
    <div
      ref={drag}
      className={`
        p-4 m-1 rounded-lg text-2xl font-bold w-16
        ${classes}
        ${isDragging ? "opacity-50" : "opacity-100"}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
    `}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {letter}
    </div>
  );
};

export default LetterBox;
