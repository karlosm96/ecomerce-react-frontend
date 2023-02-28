import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./ContextState/StaticContext.js";
import Encabezado from "./Encabezado.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import { AppShopContext } from "./ContextState/InvoiceContext.js";

export default function ShoppingCart({ products }){
    
    const userId = localStorage.getItem('payload');;
    const [dataListProducts, setDataListProducts] = useState(JSON.parse(localStorage.getItem('shoppingCart')).map(producto => producto));
    const [dataProduct, setDataProduct] = useState([]);
    const [quantityArray, setQuantityArray] = useState(dataListProducts.map((producto, index) => producto.cantidad))

    const [modifyProductsArray, setModifyProductsArray] = useContext(AppContext);
    const [contextDataProduct, setContextDataProduct] = useContext(AppShopContext)

    const total = dataProduct.map((producto, index) => Number(producto.precio) * Number(quantityArray[index]));
    const totalFinal = total.length > 0 ? total.reduce(function(acc, val) { return acc + val; }) : 0;

    // Peticion para autenticar
    // **************************************************************************************
    const token = localStorage.getItem('token');
    let bearer;
    if(token===''){
        bearer="";
    } else{
        bearer = `${token}`;
    }
    // **************************************************************************************

    useEffect(() =>{
        chargeProducts(dataListProducts); 
    }, []);

    const chargeProducts = (array) =>{
        if(array.length > 0){
            const detailProductArray = dataListProducts.map(producto => 
                {axios.get(`https://midulceonline-backend-service.onrender.com/api/v1/productos/findById/${producto.id_producto}`)
                    .then( res => {
                        setDataProduct((oldArray) => [...oldArray, res.data])
                    })
                })
            }
    }

    const removeProducts = (numIndex) =>{
        let modifyArr = dataListProducts.filter((element, index) => index !== numIndex);
        let modifyQuantityArr = quantityArray.filter((element, index) => index !== numIndex); 
        setDataListProducts(modifyArr);
        setModifyProductsArray(modifyArr);
        window.location.reload(true)
    };

    const createProductList = () =>{
        const demoInfo = dataProduct;
        demoInfo.forEach((product, index)=>{
            product['cantidad'] = quantityArray[index];
        });

        setContextDataProduct(demoInfo);
    }

    return(
        <>
            <Encabezado></Encabezado>
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 ">
                        <div className="cart-list">
                            <table className="table">
                                <thead className="thead-primary">
                                <tr className="text-center">
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                { dataListProducts.length > 0 ? dataProduct.map( (producto, index) => {
                                    return(
                                        <tr className="text-center" key={index}>
                                            <td className="product-remove"><a onClick={(()=>{ removeProducts(index) })}><span className="ion-ios-close"></span></a></td>
                                            <td className="image-prod">
                                                <div className="img" style={{backgroundImage: `url(${window.location.origin + '/images/' + producto.imagen})`}}></div>
                                            </td>
                                            
                                            <td className="product-name">
                                                <h3>{ producto.nombre }</h3>
                                                <p>{ producto.marca }</p>
                                            </td>
                                            
                                            <td className="price">${ producto.precio }</td>
                                            
                                            <td className="quantity">{ quantityArray[index] }</td>
                                                
                                            <td className="total">${ Number(producto.precio) * quantityArray[index] }</td>
                                        </tr>
                                        )
                                    }) : <tr><td></td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-end">
                    
                    <div className="col-lg-12 mt-5 cart-wrap ">
                        <div className="cart-total mb-3">
                            <h3>Total a pagar</h3>
                            <p className="d-flex">
                                <span>Delivery</span>
                                <span>$0.00</span>
                            </p>
                            <p className="d-flex">
                                <span>Discount</span>
                                <span>$0.00</span>
                            </p>
                            <hr></hr>
                            <p className="d-flex total-price">
                                <span>Total</span>
                                <span>${ totalFinal }</span>
                            </p>
                        </div>
                        <p><Link to='/checkout' className="btn btn-primary py-3 px-4" onClick={()=>createProductList()}>Proceed to Checkout</Link></p>
                    </div>
                </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}