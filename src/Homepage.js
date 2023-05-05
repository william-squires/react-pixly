import { useEffect, useState } from "react";
import "./Homepage.css";
import { getRandomImages } from "./ApiCalls";
import Carousel from "react-bootstrap/Carousel";

/** Homepage : shows carousel and searchbar & renders upload form
 *
 * Props: none
 *
 * State: imageUrls [url, url, url, ...]
 *
 * RoutesList --> Homepage
 */

function Homepage() {
  const [imageUrls, setImageUrls] = useState(null);

  useEffect(function getCarouselImagesOnMount() {
    async function getImages() {
      const randImages = await getRandomImages(5);
      setImageUrls(randImages);
    }
    getImages();
  }, []);

  if (!imageUrls) {
    return <h1>Loading</h1>;
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