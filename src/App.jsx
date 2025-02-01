import './App.css'
import Dropdown from './Components/Dropdown'
import React from 'react'

const options = [
  'Contoh 1',
  'Contoh 2',
  'Contoh 3 tiga',
  'Contoh 4 empat panjang',
  'Contoh 5 lima panjang sekali',
];

function App() {

  const defaultConfig = {
    usePortal: false,
    alwaysOpen: true,
    clearAll: false,
    multiSelect: true
  }

  const [config, setConfig] = React.useState(defaultConfig)

  return (
    <div className="App">
      <h4 className="text-2xl mt-6">Combobox</h4>
      <div className="flex flex-col items-center justify-center">
        <Dropdown 
          options={options} 
          usePortal={config.usePortal} 
          alwaysOpen={config.alwaysOpen} 
          clearAll={config.clearAll} 
          multiSelect={config.multiSelect}
        />
      </div>
      
      <div className="flex flex-col w-fit justify-center mt-10 self-center">
        <h4 className="text-lg">Props Setting</h4>
        <h5 className="py-5">Try this config to see how it works.</h5>
        <h5 className="mb-8">
            See 
            <a href="https://github.com/teknosains/Combobox" target="_blank" 
              className="text-blue-500 ml-2 mr-2"
            >https://github.com/teknosains/Combobox</a> 
            for more details</h5>
        <div>
          <input type="checkbox" value="usePortal" 
            onChange={(e) => setConfig({ ...config, usePortal: e.target.checked })}
          /> usePortal (instead of normal React component)
        </div>
        <div>
          <input type="checkbox" value="alwaysOpen" 
            onChange={(e) => setConfig({ ...config, alwaysOpen: e.target.checked })}
            defaultChecked
          /> alwaysOpen
        </div>
        <div>
          <input type="checkbox" value="clearAll" 
            onChange={(e) => setConfig({ ...config, clearAll: e.target.checked })}
          /> clearAll
        </div>
        <div>
          <input type="checkbox" value="clearAll" 
            onChange={(e) => setConfig({ ...config, multiSelect: e.target.checked })}
            defaultChecked
          /> multiSelect
        </div>
      </div>
    </div>
  )
}

export default App
