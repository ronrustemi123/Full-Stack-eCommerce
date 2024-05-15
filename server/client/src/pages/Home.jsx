import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProudProds from "../components/ProudProducts";
import Banner from "../components/Banner";
import Trending from "../components/Trending";

import bannerImg1 from '../assets/banner/banner1.jpg'
import bannerImg2 from '../assets/banner/banner2.jpg'

const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/api/store')
            const data = await response.json()
            setProducts(data)
        }

        fetchData()
    }, [])

    return (
        <>
            <Header/>
            <ProudProds products={products}/>
            <Banner title='Creative harmonious living'
                desc='RAOUF Products are all made to standard sizes so that you can mix and match them freely.'
                place={1}
                img={bannerImg1}
              />
            <Trending items={products}/>
            <Banner title={'Comfortable & Elegante Living'}
                desc={'RAOUF Products are all made to standard sizes so that you can mix and match them freely.'}
                img={bannerImg2}
                place={-1}
              />
        </>
    );
}
 
export default Home;