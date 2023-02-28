import Carousel from "./Carousel.jsx";
import Encabezado from "./Encabezado.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import Footer from "./Footer.jsx";

function Main(){
    
    return(
        <div>
            <Encabezado></Encabezado>
            <Carousel autoplay={true}></Carousel>
            <FeaturedProducts category={''} number={8}></FeaturedProducts>
            <Footer></Footer>
        </div>
    )
}

export default Main;