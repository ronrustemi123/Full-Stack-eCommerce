import './Banner.css'
import { Link } from 'react-router-dom';

const Banner = ({img, place, title, desc}) => {


    return (
        <section className='banner'>
            <div>
                <h1>{title}</h1>
                <h2>{desc}</h2>
                <Link to={'/categories/all'} onClick={() => window.scrollTo(0, 0)}>
                    <button>shop now <i className="fa-solid fa-arrow-right"></i></button>
                </Link>
            </div>
            <img style={{order: place}} src={img} alt="bannerImage" />
        </section>
    );
}
 
export default Banner;