import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../style/carousel.css';
import { Link } from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
        partialVisibilityGutter: 20
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
      
};


const CarouselComponent = ({movies}) => {

    return (
        <Carousel
            responsive={responsive}
            swipeable={true}
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
        >
            {movies.map(movie => (
                <div key={movie._id} className="movie-item crsl-img">
                    <Link to={`/movie/${movie._id}`}>
                        <img className="" src={movie.poster_path} alt='movie poster' />
                    </Link>
                </div>
            ))}

        </Carousel>
    );
}

export default CarouselComponent;