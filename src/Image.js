import "./Image.css";
/** Image: shows a single image
 *
 * Props: imgUrl
 *
 * State: none
 *
 * { RoutesList, SearchForm, ImageList} --> Image
*/

function Image ({ imgUrl }) {
  return (
    <div className="Image">
      <img className="Image singleImage" width={500} src={`${imgUrl}`} alt={`imgUrl`} />
    </div>
  )
}

export default Image;