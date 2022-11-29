import './App.css';
import FetchData from './components/FetchData';
import Upload from './components/Upload';

function App() {
  return (
    <div className="container">
      <div className='rowApp'>
        <Upload />
      </div>
      {/* <div className='rowApp'>
        <FetchData />
      </div> */}
    </div>
  );
}

export default App;
