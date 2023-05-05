import { Routes, Route } from "react-router-dom";
import UploadForm from './UploadForm';
import DownloadForm from "./DownloadForm";
import SearchPage from "./SearchPage";
import ImageList from './ImageList';
import Image from './Image';
import Editor from "./Editor";
import Homepage from "./Homepage";

/** Routes for rendering components in app
 *
 * Props: none
 *
 * State: none
 * App -> RoutesList -> {UploadForm, DownloadForm, ...}
*/

function RoutesList () {
  return (
    <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/Images/:filename" element={<Image />} />
       <Route path="/new" element={<Editor />} />
       <Route path="/all" element={<ImageList />} />
       <Route path="/search" element={<SearchPage />} />
       <Route path="*" element={<Homepage />} />
    </Routes>
  )
}

export default RoutesList;