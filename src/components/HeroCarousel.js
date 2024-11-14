import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../style/carousel.css';
import { Link } from 'react-router-dom';

const responsive ={
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1
    }
  };


const HeroCarousel = ({movies}) => {

    return (
        <Carousel
            responsive={responsive}
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={6000}
            centerMode={false}
            className=""
            containerClass="container"
            // customDot={<CustomDot />}
            // dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
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
            // showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {movies.map(movie => (
                
                    <Link key={movie._id} to={`/movie/${movie._id}`}>
                        <img className="" src={movie.poster_path} alt='movie poster' style={{display:'block', height:'100%', margin: 'auto', width:'100%'}}/>
                    </Link>
                
            ))}
            
        </Carousel>
    );
}

export default HeroCarousel;