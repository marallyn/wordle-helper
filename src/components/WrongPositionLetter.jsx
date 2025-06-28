import { useDrop } from "react-dnd";
import { ItemTypes, LetterPoolTypes } from "../constants/appConstants";

const WrongPositionLetter = ({ index, letters, onLetterDropped }) => {
  const [_, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: (item) =>
      onLetterDropped({
        letter: item.letter,
        fromType: item.type,
        toType: LetterPoolTypes.WRONG_PLACE,
        index,
      }),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      key={`correct-position-${index}`}
      className={`
        min-w-16 h-16 flex items-center justify-center border-2 rounded text-3xl font-bold
        ${
          letters.length > 0
            ? "bg-yellow-300 text-white border-yellow-400"
            : "bg-gray-300 text-gray-600 border-gray-400"
        }
        `}
    >
      {letters.join(",") || index + 1}
    </div>
  );
};

export default WrongPositionLetter;
