import {Calculator} from "./features/components/calculator";
import './App.css';

function App() {
    document.body.style.backgroundColor="lightblue";
  return (
    <div className="App">
      <header className="App-header">Currency converter</header>
        <Calculator></Calculator>
    </div>
  );
}

export default App;
