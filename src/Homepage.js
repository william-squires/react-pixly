import "./Homepage.css";
import Carousel from "react-bootstrap/Carousel";

/** Homepage
 *
 * Shows carousel and searchbar & renders upload form
 *
 * Props: none (batch?)
 *
 * State: imagesForCarousel [{"url": "https://pixly-clupt.s...}, ...]
 */

function Homepage() {
  return (
    <div className="Homepage">
      <h1 className="Homepage welcome">Welcome to pixly</h1>
      <Carousel>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=First slide&bg=373940"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );

}

export default Homepage;