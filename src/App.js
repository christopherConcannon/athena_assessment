import data from './data'
import DataTable from './components/DataTable'

function App() {
  return (
    <div className="App">
        <DataTable data={data} />
    </div>
  );
}

export default App;
