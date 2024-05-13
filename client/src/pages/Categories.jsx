import '../components/Categories.css'
import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ProductItem from '../components/ProductItem'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Categories = () => {

    const categoryName = ['all', 'furniture', 'electronic', 'lamp', 'kitchen', 'chair', 'skin-care']

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {category} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/store/categories/${category}`)
            const data = await response.json()
            setProducts(data)
            setIsLoading(false)
        }

        fetchData()
    }, [category])

    return (
        <main className='categories-page'>
            <div className="categories-header">
                <Link onClick={() => window.scrollTo(0, 0)} to={'/'} style={{textDecoration: 'none', color: 'black'}}><p><i className="fa-solid fa-chevron-left"></i> Home</p></Link>
                <h1 className='category-heading'>{category.toUpperCase()}</h1>
            </div>
            <div className="categories">
                <Stack flexWrap={'wrap'} rowGap={1.5} justifyContent={'center'} mt={8} spacing={1.8} direction={'row'}>
                    {categoryName.map((el, i) => <Link to={`/categories/${el}`} key={i}>{el}</Link>)}
                </Stack>
            </div>
            <Grid2 mt={8} justifyContent='flex-start' spacing={3} wrap='wrap' container columns={{lg: 4, xs: 1, sm: 2}} >
                {!isLoading ? (
                    products.map(el => {
                        return(
                            <Grid2 key={el.description} xs={1}>
                                <Link onClick={() => window.scrollTo(0, 0)} style={{textDecoration: 'none', color: 'black'}}  to={`/product/${el._id}`}>
                                    <ProductItem img={el.img} price={el.price} name={el.description}/>
                                </Link>
                            </Grid2>
                        )
                    })
                ) : <CircularProgress size={120} variant='indeterminate' sx={{margin: '0 auto'}}/>}
            </Grid2>
        </main>
    );
}
 
export default Categories;