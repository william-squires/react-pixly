import { useState } from "react";
import axios from "axios";

/** DownloadForm
 *
 *
 *
 * App --> DownloadForm
 */

function DownloadForm() {
  const [formData, setFormData] = useState({filename:""});
  const [downloadedFiles, setDownloadedFiles] = useState([]);
  console.log("downloadedFiles=", downloadedFiles);


  async function getFile (filename) {
    const res = await axios.get(`http://localhost:5000/${filename}`);
    console.log("res in getFile=", res);
    return res;
  }
  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    console.log("handlesubmit ran")
    evt.preventDefault();
    console.log("formdata=", formData);
    // const downloadedFile = await getFile(formData.filename);
    setFormData({filename:""});
    // setDownloadedFiles(() => [...downloadedFiles, downloadedFile]);
    setDownloadedFiles(() => [...downloadedFiles, formData.filename]);
  }

  return (
    <div className="DownloadForm">
      <form onSubmit={handleSubmit}>
        <input
          id="filename"
          name="filename"
          className="form-control"
          placeholder="Enter a search term"
          onChange={handleChange}
          value={formData.filename}
        />
        <button>Download</button>
      </form>

    <div className="DownloadForm fileContainer">Files go here:
      {downloadedFiles.length ?
        <img src={`http://localhost:5000/${downloadedFiles[0]}`} alt="downloadedImg" />
        : null}
    </div>
    </div>
  );
}

export default DownloadForm;

//8b5899a8-ab73-4358-95f6-60a58eca048a

//c78dfcfb-f777-4c80-9b80-2916ccb627a7