import { useEffect, useState } from "react";
import { imgDetails } from "../imgData.js";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CarouselImg = styled.img`
object-position: center;
width: 100vw;
height: 86vh;
opacity: 0;
transition: 200ms opacity ease-in-out;
&.load{
    opacity: 1;
}
`

function Carrusel(props){
    const images = [imgDetails[0].Title, imgDetails[1].Title, imgDetails[2].Title]
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [load, setLoad] = useState(false);
    
    useEffect(() =>{
        if(props.autoplay){
            const interval = setInterval(() => {
                subsequent();
            }, 3000);

            return () => clearInterval(interval);
        }
    });

    const previous = () =>{
        newImage(selectedIndex, images, false);
    }

    const subsequent = () =>{
        newImage(selectedIndex, images, true);
    }

    const newImage = (index, images, bool) => {
        setLoad(false);
        setTimeout(() =>{
            const condition = bool ? selectedIndex < images.length - 1 : selectedIndex > 0;
            const nextIndex = bool ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1: images.length - 1;
            setSelectedImage(images[nextIndex]);
            setSelectedIndex(nextIndex);
        }, 100);
    }

    return(
        <>
        <div className="carousel-container" data-active>
            <CarouselImg className={load ? "load" : "carousel-image"} src={ window.location.origin + `/images/${selectedImage}` } alt="" onLoad={ () => setLoad(true) }/>
            <button className="carousel-button prev" onClick={ previous }> &#8678; </button>
            <button className="carousel-button subsec" onClick={ subsequent }> &#8680; </button>
        </div>

        <section className="ftco-section">
            <div className="container">
                <div className="row no-gutters ftco-services">
                    <div className="col-md-3 text-center d-flex align-self-stretch">
                        <div className="media block-6 services mb-md-0 mb-4">
                            <div className="icon bg-color-1 active d-flex justify-content-center align-items-center mb-2">
                                    <span className="flaticon-shipped"></span>
                            </div>
                            <div className="media-body">
                                <h3 className="heading">Free Shipping</h3>
                                <span>On order over $100</span>
                            </div>
                        </div>      
                    </div>
                    <div className="col-md-3 text-center d-flex align-self-stretch">
                        <div className="media block-6 services mb-md-0 mb-4">
                            <div className="icon bg-color-2 d-flex justify-content-center align-items-center mb-2">
                                    <span className="flaticon-diet"></span>
                            </div>
                            <div className="media-body">
                                <h3 className="heading">Always Fresh</h3>
                                <span>Product well package</span>
                            </div>
                        </div>    
                    </div>
                    <div className="col-md-3 text-center d-flex align-self-stretch">
                        <div className="media block-6 services mb-md-0 mb-4">
                            <div className="icon bg-color-3 d-flex justify-content-center align-items-center mb-2">
                    <           span className="flaticon-award"></span>
                            </div>
                            <div className="media-body">
                                <h3 className="heading">Superior Quality</h3>
                                <span>Quality Products</span>
                            </div>
                        </div>      
                    </div>
                    <div className="col-md-3 text-center d-flex align-self-stretch">
                        <div className="media block-6 services mb-md-0 mb-4">
                            <div className="icon bg-color-4 d-flex justify-content-center align-items-center mb-2">
                                    <span className="flaticon-customer-service"></span>
                            </div>
                            <div className="media-body">
                                <h3 className="heading">Support</h3>
                                <span>24/7 Support</span>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        </section>

        <section className="ftco-section ftco-category ftco-no-pt category">
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						<div className="row">
							<div className="col-md-6 order-md-last align-items-stretch d-flex">
								<div className="category-wrap-2 img align-self-stretch d-flex" style={{backgroundImage: `url(${window.location.origin + '/images/productos.jpg'})`}}>
									<div className="text text-center">
										<h2>Nuestros productos</h2>
										<p>Endulza tu dia</p>
										<Link to={'/productos/list'} className="btn btn-primary"><p className="container d-flex align-items-center justify-content-center">Shop now</p></Link>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="category-wrap img mb-4 d-flex align-items-end" style={{backgroundImage: `url(${window.location.origin + '/images/chocolates.jpg'})`}}>
									<div className="text px-3 py-1">
										<h2 className="mb-0"><Link to='/productos/Chocolates' >Chocolates</Link></h2>
									</div>
								</div>
								<div className="category-wrap img d-flex align-items-end" style={{backgroundImage: `url(${window.location.origin + '/images/gomitas.jpg'})`}}>
									<div className="text px-3 py-1">
										<h2 className="mb-0"><Link to='/productos/Gomitas' >Gomitas</Link></h2>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="category-wrap img mb-4 d-flex align-items-end" style={{backgroundImage: `url(${window.location.origin + '/images/ponques.jpg'})`}}>
							<div className="text px-3 py-1">
								<h2 className="mb-0"><Link to='/productos/Ponques' >Ponques</Link></h2>
							</div>		
						</div>
						<div className="category-wrap img d-flex align-items-end" style={{backgroundImage: `url(${window.location.origin + '/images/alfajores.jpg'})`}}>
							<div className="text px-3 py-1">
								<h2 className="mb-0"><Link to='/productos/Alfajores' >Alfajores</Link></h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    </>
    )
}

export default Carrusel;

//#ff7fca