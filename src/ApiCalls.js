import axios from "axios";
/** Api Calls - helper for all api calls */

const BASE_URL = "http://localhost:5000/"

async function uploadImage(fileName, imgBase64, exif, description) {
  await axios.post(BASE_URL,
    {
      name: fileName,
      encodedImage: imgBase64,
      exif: exif,
      description: description
    },
    { headers: { 'Access-Control-Allow-Origin': '*' } });
}

async function getRandomImages(count) {
  const resp = await axios.get(
    `${BASE_URL}random?count=${count}`,
    { headers: { 'Access-Control-Allow-Origin': '*' } });
    return resp.data;
}

async function getImagesForList() {
  const resp = await axios.get(BASE_URL)
  return resp.data;
}

async function searchImages(method, term) {
  const resp = await axios.get(`${BASE_URL}search?method=${method}&term=${term}`,
      { headers: { 'Access-Control-Allow-Origin': '*' } });
  console.log(resp.data);
  return resp.data
}


export { uploadImage, getRandomImages, getImagesForList, searchImages };