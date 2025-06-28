import { useDrag } from "react-dnd";
import { ItemTypes, LetterPoolTypes } from "../constants/appConstants";

const typeClasses = (type) => {
  switch (type) {
    case LetterPoolTypes.AVAILABLE:
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case LetterPoolTypes.CORRECT_POSITION:
      return "bg-green-500 text-white";
    case LetterPoolTypes.WRONG_PLACE:
      return "bg-yellow-500 text-black";
    case LetterPoolTypes.NOT_USED:
      return "bg-gray-400 text-white";
  }
};

const Letter = ({ letter, selectedLetter, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.LETTER,
    item: { letter, type },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
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

export default Letter;
