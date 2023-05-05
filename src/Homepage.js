import { useEffect, useState } from "react";
import "./Homepage.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

/** Homepage
 *
 * Shows carousel and searchbar & renders upload form
 *
 * Props: none (batch?)
 *
 * State: imagesForCarousel [{"url": "https://pixly-clupt.s...}, ...]
 */

function Homepage() {
  const [imageUrls, setImageUrls] = useState(null)

  useEffect(function getCarouselImagesOnMount() {
    async function getImages() {
      const resp = await axios.get(
        `http://localhost:5000/random?count=5`,
        { headers: { 'Access-Control-Allow-Origin': '*' } });
        setImageUrls(resp.data)
    }
    getImages()
  }, []) 

  if (!imageUrls) {
    return <h1>Loading</h1>
  }

  return (
    <div className="Homepage">
      <h1 className="Homepage welcome">Welcome to pixly</h1>
      <Carousel className="carousel">
        {imageUrls.map((url, idx) => <Carousel.Item key={idx} interval={2000}>
          <img
            className="carousel-img"
            src={url.url}
            alt={`Slide ${idx + 1}`}
          />
        </Carousel.Item>)}
      </Carousel>
    </div>
  );

}

export default Homepage;