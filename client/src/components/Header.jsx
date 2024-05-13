import './Header.css'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';

import img1 from '../assets/header/home-img-1.jpg'
import img2 from '../assets/header/home-img-2.jpg'
import img3 from '../assets/header/home-img-3.jpg'
import img4 from '../assets/header/home-img-4.jpg'

const Header = () => {
    return (
        <div className='header'>
            <Grid2 sx={{height: 1}} wrap='wrap' container columnSpacing={2} rowSpacing={2}>
                <Grid2 sx={{height: 1}} position='relative' lg={6} xs={6}>
                    <Link to={'/categories/furniture'} >
                        <img className='header-img' src={img1} alt="" />
                        <p className='header-img-text'>Live Comfortably</p>
                    </Link>
                </Grid2>
                <Grid2  sx={{height: 1}} position='relative' xs={6} lg={3}>
                    <Link to={'/categories/skin-care'} >
                        <img className='header-img' src={img2} alt="" />
                        <p className='header-img-text'>Skincare</p>
                    </Link>
                </Grid2>
                <Grid2  sx={{height: 1}}  lg={3} xs={12}>
                    <Grid2 position='relative' sx={{height: '48%'}} xs={6}>
                        <Link to={'/categories/kitchen'} >
                            <img className='header-img' src={img3} alt="" />
                            <p className='header-img-text'>Kitchen</p>
                        </Link>
                    </Grid2>
                    <Grid2 mt={2} position='relative' sx={{height: '48%'}} xs={6}>
                        <Link to={'/categories/electronic'} >
                            <img className='header-img' src={img4} alt="" />
                            <p className='header-img-text'>Electronics</p>
                        </Link>
                    </Grid2>
                </Grid2>
            </Grid2>
        </div>
    );
}
 
export default Header;