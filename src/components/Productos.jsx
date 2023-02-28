import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from './ContextState/StaticContext.js';
import { toast, ToastContainer } from 'react-toastify';

function Productos({categoriaProductos}){

    const [dataProductos, setDataProductos] = useState([]);
    const [dataListProducts, setDataListProducts] = useContext(AppContext);
    
    const config={headers:{'Content-Type': 'application/json'}}
	// **************************************************************************************

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
        axios.get(`https://midulceonline-backend-service.onrender.com/api/v1/productos/list`, config).then(res => {
			setDataProductos(res.data)
        }).catch(err=>{console.log(err.stack)})
    },[])

    return(
        <>  
            <ToastContainer position='top-center' limit={1}></ToastContainer>
            {dataProductos.filter(item =>{ 
                return categoriaProductos ? item.categoria === categoriaProductos  : item;
            }).map(producto =>(
                
                <div className="col-md-6 col-lg-3" key={producto.id}>
                    <div className="product">
                        <Link to={`/productos/single/${producto.id}`} className="img-prod"><img className="img-fluid" src={window.location.origin + `/images/${producto.imagen}`} alt="Colorlib Template"></img>
                            <div className="overlay"></div>
                        </Link>
                        <div className="text py-3 pb-4 px-3 text-center">
                            <h3><a href="#">{producto.nombre}</a></h3>
                            <div className="d-flex">
                                <div className="pricing">
                                    <p className="price"><span className="mr-2 price-dc">$120.00</span><span className="price-sale">${producto.precio}</span></p>
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
        </>
    );
}

export default Productos;