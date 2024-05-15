import './ProudProducts.css'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';


const ProudProds = ({products}) => {

    const filterProducts = products.filter((el, i) => i < 8)


    return (
        <section className='proud-prods'>
            <h1 className='proud-prods-heading'>Products we are proud of</h1>
            <Grid2 justifyContent='center' spacing={3} wrap='wrap' container columns={{lg: 4, xs: 1, sm: 2}} >
                {filterProducts.map(el => {
                    return(
                        <Grid2 key={el.description} xs={1}>
                            <Link onClick={() => window.scrollTo(0, 0)} style={{textDecoration: 'none', color: 'black'}}  to={`/product/${el._id}`}>
                                <ProductItem img={el.img} price={el.price} name={el.description}/>
                            </Link>
                        </Grid2>
                    )
                })}
            </Grid2>
        </section>
    );
}
 
export default ProudProds;