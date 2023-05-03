
import './App.css';
import UploadForm from './UploadForm';
import DownloadForm from "./DownloadForm";
import ImageList from './ImageList';

function App() {
  return (
    <div className="App">
      <UploadForm />
      <DownloadForm />
      <ImageList />
    </div>
  );
}

export default App;
