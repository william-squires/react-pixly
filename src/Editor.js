import UploadForm from "./UploadForm";
import { useState } from "react";
import Image from "./Image";
import RangeForm from "./RangeForm";
import axios from "axios";
import "./Editor.css";
import SubmitForm from "./SubmitForm";
require("jimp/browser/lib/jimp.js");
const { Jimp } = window;


/** Editor : edit a single image
 *
 * Props: imgUrl
 *
 * State: Image to be edited, fileDataUrl
 *
 * Upload image to s3.
 * Show editing tools and image here.
 * Submit button after editing to reupload to s3.
 *
 * { RoutesList, ImageList } --> Editor
 */

function Editor({ imgUrl }) {
  const [jimpImage, setJimpImage] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [fileName, setFileName] = useState('');
  // console.log("jimpImg=", jimpImage);
  // console.log(typeof imgBase64);
  // console.log("filename=", fileName);
  // console.log("editedImg=", editedImage);

  /** Get image from upload and save it in state */
  async function getImage(formData) {
    // console.log("formData in editor fn=", formData);
    const url = URL.createObjectURL(formData);
    const img = await Jimp.read(url);
    setJimpImage(img);
    setImgBase64(await img.getBase64Async(Jimp.AUTO));
    setEditedImage(img);
    setFileName(formData.name);
  }

  async function uploadImageToBucket(formData) {
    await axios.post("http://localhost:5000/",
      {
        name: fileName,
        encodedImage: imgBase64
        , exif: jimpImage._exif,
        description: formData.description
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  async function setContrast(formData) {
    let num = Number(formData.value);
    // console.log("num=", num);
    num = num - 5;
    const dec = num / 5;
    const f = editedImage.clone();
    f.contrast(dec);
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function setBrightness(formData) {
    let num = Number(formData.value);
    // console.log("num=", num);
    num = num - 5;
    const dec = num / 5;
    const f = editedImage.clone();
    f.brightness(dec);
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function makeGreyscale() {
    const f = editedImage.clone();
    f.greyscale();
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function makeSepia() {
    const f = editedImage.clone();
    f.sepia();
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function invert() {
    const f = editedImage.clone();
    f.invert();
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function blur(formData) {
    const f = editedImage.clone();
    f.blur(Number(formData.value));
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function posterize(formData) {
    const f = editedImage.clone();
    f.posterize(Number(formData.value));
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function rotate(formData) {
    const f = editedImage.clone();
    f.rotate(Number(formData.value), false);
    setEditedImage(f);
    setImgBase64(await f.getBase64Async(Jimp.AUTO));
  }

  async function reset() {
    setEditedImage(jimpImage);
    setImgBase64(await jimpImage.getBase64Async(Jimp.AUTO));
  }

  return (
    <div className="Editor">
      <UploadForm getImage={getImage} />

      {jimpImage &&

        <div className="Editor editingTools-container container">
          <div className="editingAndImage">
          <div className="editingTools">
            <div className="Editor editingTools">
              <button
                className="editingButton greyscale"
                onClick={makeGreyscale}>greyscale</button>
            </div>
            <div className="Editor editingTools">
              <button
                className="editingButton sepia"
                onClick={makeSepia}>sepia</button>
            </div>
            <div className="Editor editingTools">
              <button
                className="editingButton invert"
                onClick={invert}>Invert</button>
            </div>
            <RangeForm min={1} max={10} title="blur" submit={blur} />

            <RangeForm min={1} max={180} title="rotate" submit={rotate} />

            <RangeForm min={0} max={10} title="contrast" submit={setContrast} />

            <RangeForm min={0} max={50} title="posterize" submit={posterize} />

            <RangeForm min={0} max={10} title="brightness" submit={setBrightness} />
            <div className="Editor editingTools">
              <button className="editingButton reset" onClick={reset}>Reset</button>
            </div>
          </div>
          <div className="Editor imageOnly">
            <div className="Editor imageContainer">
              {imgBase64 && <Image imgUrl={imgBase64} />}
            </div>
          </div>
          </div>
          <SubmitForm submit={uploadImageToBucket} />
        </div>
      }
    </div>

  );
}

export default Editor;