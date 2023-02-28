import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './ContextState/StaticContext.js';
import { toast, ToastContainer } from 'react-toastify';

function FeaturedProducts({ changeId, number }){

    const [dataListProducts, setDataListProducts] = useContext(AppContext);
    const [dataProductos, setDataProductos] = useState([]);
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const config={headers:{'Content-Type': 'application/json'}};
    
	// **************************************************************************************

    function maxAndMin(number){
        const condition = number > 0 ? number : 0;
        const minRandom = condition ? 0 : Math.floor(Math.random() * ((dataProductos.length - 4)) + 4) ;
        const maxRandom = condition ? number :  minRandom + 4;
        setMin(minRandom);
        setMax(maxRandom);
    }

    const addProductArray = (productId, quantity) =>{
        const newProduct = {
            id_producto: productId,
            cantidad: quantity,
            total: 0
        }

        setDataListProducts([...dataListProducts, newProduct]);
        toast.success("Se ha agregado el producto al carrito");
    }

	useEffect(()=>{
        axios.get('https://midulceonline-backend-service.onrender.com/api/v1/productos/list', config).then(res => {
			setDataProductos(res.data)
        }).catch(err=>{console.log(err.stack)})

        maxAndMin(number)
    },[])

    return(
        
        <section className="ftco-section featured">
            <ToastContainer position='top-center' limit={1}></ToastContainer>
            <div className="container">
                    <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-12 heading-section text-center ">
                <span className="subheading">Featured Products</span>
                <h2 className="mb-4">Our Products</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
            </div>
            </div>   		
            </div>
            <div className="container">
                <div className="row">
                    {dataProductos.slice(min, max).map(producto =>(
                        <div className="col-md-6 col-lg-3 " key={producto.id}>
                        <div className="product">
                            <Link onClick={() =>{ changeId(producto.id); maxAndMin(number)}} to={`/productos/single/${producto.id}`} className="img-prod"><img className="img-fluid" src={window.location.origin + `/images/${producto.imagen}`} alt="Colorlib Template"></img>
                                <span className="status">--</span>
                                <div className="overlay"></div>
                            </Link>
                            <div className="text py-3 pb-4 px-3 text-center">
                                <h3>{producto.nombre}</h3>
                                <div className="d-flex">
                                    <div className="pricing">
                                        <p className="price"><span className="mr-2 price-dc">$--</span><span className="price-sale">{`$${producto.precio}`}</span></p>
                                    </div>
                                </div>
                                <div className="bottom-area d-flex px-3">
                                    <div className="m-auto d-flex">
                                        <Link to={`/productos/single/${producto.id}`} className="add-to-cart d-flex justify-content-center align-items-center text-center">
                                            <span><i className="ion-ios-menu"></i></span>
                                        </Link>
                                        <Link onClick={(()=>{ addProductArray(producto.id, 1) })} className="buy-now d-flex justify-content-center align-items-center mx-1">
                                            <span><i className="ion-ios-cart"></i></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedProducts;