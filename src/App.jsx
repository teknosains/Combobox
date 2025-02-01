import './App.css';
import Dropdown from './Components/Dropdown';

const options = [
  'Contoh 1',
  'Contoh 2',
  'Contoh 3 tiga',
  'Contoh 4 empat panjang',
  'Contoh 5 lima panjang sekali',
];

function App() {
  return (
    <div className="App">
      <h4 className="text-2xl mt-6">Combobox</h4>
      <div className="flex flex-col items-center justify-center">
        <Dropdown 
          options={options} 
          usePortal 
          alwaysOpen 
          clearAll={false} 
          multiSelect
        />
      </div>
    </div>
  );
}

export default App;
