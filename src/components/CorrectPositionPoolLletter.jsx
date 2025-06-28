import { useDrop } from "react-dnd";
import { ItemTypes, LetterPoolTypes } from "../constants/appConstants";

const CorrectPositionLetter = ({ index, letter, onLetterDropped }) => {
  const [_, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: (item) =>
      onLetterDropped({
        letter: item.letter,
        fromType: item.type,
        toType: LetterPoolTypes.CORRECT_POSITION,
        index,
      }),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      key={`correct-position-${index}`}
      className={`
        w-16 h-16 flex items-center justify-center border-2 rounded text-3xl font-bold
        ${
          letter
            ? "bg-green-500 text-white border-green-600"
            : "bg-gray-300 text-gray-600 border-gray-400"
        }
        `}
    >
      {letter || index + 1}
    </div>
  );
};

export default CorrectPositionLetter;
