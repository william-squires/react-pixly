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
      <img width={500} height={500} src={`${imgUrl}`} alt={`imgUrl`} />
    </div>
  )
}

export default Image;