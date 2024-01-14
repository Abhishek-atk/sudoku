import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./assets/components/Dashboard"
import Sudoku from "./assets/components/Sudoku";
import OnlineSudoku from "./assets/components/OnlineSudoku";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/offline-sudoku" element={<Sudoku />} />
        <Route path="/online-sudoku" element={<OnlineSudoku />} />
      </Routes>
    </Router>
  );
}

export default App
