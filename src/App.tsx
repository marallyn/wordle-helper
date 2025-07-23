import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StateProvider from "./context/StateProvider";
import WordleHelper from "./pages/WordleHelper";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <StateProvider>
        <WordleHelper />
      </StateProvider>
    </DndProvider>
  );
}

export default App;
