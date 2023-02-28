import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppShopContext } from "./ContextState/InvoiceContext";
import Encabezado from "./Encabezado";
import Footer from "./Footer";
import uniquid from 'uniqid';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import authUser from "../utils/authUser.js";
import { AppContext } from "./ContextState/StaticContext.js";

export default function Invoice(){

    const [contextDataProduct, setContextDataProduct] = useContext(AppShopContext);
    const [cartProductsArray, setCartProductsArray] = useContext(AppContext);

    const jsTK = localStorage.getItem('token') ? true : false;
    const userID = localStorage.getItem('payload');
    const invoiceId = `${uniquid()}` 
    const isUserLogIn = userID && jsTK ? true : false;

    const navigate = useNavigate();

    const [invoiceTotal, setInvoiceTotal] = useState(0);

    const [nombreCliente, setNombreCliente] = useState(String);
    const [apellidoCliente, setApellidoCliente] = useState(String);
    const [pais, setPais] = useState('Colombia');
    const [direccion, setDireccion] = useState(String);
    const [unidad, setUnidad] = useState(String);
    const [ciudad, setCiudad] = useState(String);
    const [zip, setZip] = useState(String);
    const [telefono, setTelefono] = useState(String);
    const [email, setEmail] = useState(String); 

    const [invoiceData, setInvoiceData] = useState();

    /* Button functionality */
    const onSubmit = (e) => {
        e.preventDefault();
        if(!isUserLogIn){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Ups! algo salio mal',
                text: "Para imprimir la factura debe ingresar a su cuenta.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ingresar a mi cuenta',
                cancelButtonText: 'Permanecer aca',
                reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
    
                swalWithBootstrapButtons.fire(
                    'Redirigiendo...',
                    '',
                    'success'
                );
                navigate('/login');
            } else{
                swalWithBootstrapButtons.fire(
                    '',
                    '',
                    'error'
                );}
            })
        } else{
            if(contextDataProduct.length <= 0){
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
                  
                swalWithBootstrapButtons.fire({
                    title: 'Ups! algo salio mal',
                    text: "Porfavor regrese a la seccion del carrito de compra",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Regresar',
                    cancelButtonText: 'Permanecer aca',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/shoppingCart/${userID}`);
                    }
                    })
            } else{
                createInfo();
            }
        }
    }

    /* Create Invoice document */
    const createInfo = () => {
        let infoP = []

        const createDataProducto = () => contextDataProduct.forEach(product => {
            infoP.push({
                "quantity": product.cantidad,
                "description": `${product.nombre}  ${product.marca}`,
                "tax-rate": 0,
                "price": product.precio
            })
        });

        createDataProducto();
        
        const info = {
            infoCliente:{
                nombre: nombreCliente,
                apellido: apellidoCliente,
                pais: pais,
                direccion: direccion,
                unidad: unidad,
                ciudad: ciudad,
                zip: zip,
                telefono: telefono,
                email: email,
                invoiceId: invoiceId
            },
            infoProductos: infoP
        }
        setInvoiceData(info);

        createInvoicePdf(info);
    }

    const createInvoicePdf = (info) =>{
        const auth = new authUser();

        /* Se genera la factura PDF */
        let configSimple = auth.authUserWithData(info)
        axios.post('http://localhost:5000/api/v1/document/pdfDocument', info, configSimple).then(res =>{
            
            /* Guardar en la BD el encabezado de la factura */
            let date_time = new Date();
            const encabezado_facturas = {
                    id: (res.data.pdf).substring(0, (res.data.pdf).length-4), // invoice id
                    fecha: `${date_time.getFullYear()}-${("0" + (date_time.getMonth() + 1)).slice(-2)}-${("0" + date_time.getDate()).slice(-2)}`,
                    id_cliente: userID,
                    activo: true
                }
            configSimple = auth.authUserWithData(encabezado_facturas);
            axios.post('http://localhost:5000/api/v1/encabezado_facturas/add', encabezado_facturas, configSimple).then(res =>{
                console.log("Todo salio bien");
            }).catch(err =>{
                console.log(err);
            })

            /* Guardar en la BD el detalle de la factura */
            const detalle_facturas = {
                id_encabezado_factura: (res.data.pdf).substring(0, (res.data.pdf).length-4),
                productos: cartProductsArray
            }
            configSimple = auth.authUserWithData(detalle_facturas);
            axios.post('http://localhost:5000/api/v1/detalle_facturas/add', detalle_facturas, configSimple).then(res =>{
                console.log("Esto esta en duda");
            }).catch(err =>{
                console.log(err);
            })

            /* Descarga de la factura PDF */
            var pdf = res.data.pdf;
            setTimeout(()=>{
                downloadInvoicePdf(pdf);
            }, 5000);
            
        }).catch(err =>{
            console.log(err.stack);
        })
    }

    const downloadInvoicePdf = (docName) =>{
        fetch(`http://localhost:5000/api/v1/document/downloadPdf/${docName}`).then(response => {
                    response.blob().then(blob => {
                        // Creating new object of PDF file
                        const fileURL = window.URL.createObjectURL(blob);
                        // Setting various property values
                        let alink = document.createElement('a');
                        alink.href = fileURL;
                        alink.download = `${docName}`;
                        alink.click();
                    })
                })
                window.open(`http://localhost:5000/api/v1/document/downloadPdf/${docName}`);
    }

    const calculateTotal = () =>{
        let total = 0;
        contextDataProduct.forEach(product => {
            total += product.cantidad * product.precio;
        })
        return total;
    }

    useEffect(()=>{
        if(contextDataProduct){
            setInvoiceTotal(calculateTotal()); 
        }
    }, [contextDataProduct]);

    return(
        <>
        <Encabezado></Encabezado>
        <section className="ftco-section">
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-7">
                    <form action="#" className="billing-form" onSubmit={ onSubmit }>
                        <h3 className="mb-4 billing-heading">Detalles de Factura</h3>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label >Nombre</label>
                                    <input value={nombreCliente} type="text" className="form-control" placeholder="" onChange={ (e)=> setNombreCliente(e.target.value) } required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className="form-group">
                                <label >Apellido</label>
                                <input value={apellidoCliente} type="text" className="form-control" placeholder="" onChange={ (e)=> setApellidoCliente(e.target.value) } required/>
                            </div>
                        </div>
                        <div className="w-100"></div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label >Pais</label>
                                    <div className="select-wrap">
                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                        <select className="form-control" onChange={(e)=> setPais(e.target.value)} required>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Argentina">Argentina</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100"></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >Direccion</label>
                                        <input value={direccion} type="text" className="form-control" placeholder="Direccion" onChange={ (e)=> setDireccion(e.target.value) } required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input value={unidad} type="text" className="form-control" placeholder="Numero de apartamento, unidad, etc: (opcional)" onChange={ (e)=> setUnidad(e.target.value) } />
                                    </div>
                                </div>
                            <div className="w-100"></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >Ciudad</label>
                                        <input value={ciudad} type="text" className="form-control" placeholder="" onChange={ (e)=> setCiudad(e.target.value) } required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >Postcode / ZIP *</label>
                                        <input value={zip} type="text" className="form-control" placeholder="" onChange={ (e)=> setZip(e.target.value) } />
                                    </div>
                                </div>
                            <div className="w-100"></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >Telefono</label>
                                        <input value={telefono} type="text" className="form-control" placeholder="" onChange={ (e)=> setTelefono(e.target.value) } required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input value={email} type="text" className="form-control" placeholder="" onChange={ (e)=> setEmail(e.target.value) } required/>
                                    </div>
                                </div>
                            <div className="w-100"></div>
                            <div className="col-md-12">
                                <div className="cart-detail p-3 p-md-4">
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="checkbox">
                                                    <label><input type="checkbox" value="" className="mr-2"/> I have read and accept the terms and conditions</label>
                                                </div>
                                            </div>
                                        </div>
                                    <button type="submit" className="btn btn-primary py-3 px-2" >Imprimir Factura</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                    <div className="col-xl-5">
                    <div className="row mt-5 pt-3">
                    <div className="col-md-12 d-flex mb-5">
                        <div className="cart-detail cart-total p-3 p-md-4">
                            <h3 className="billing-heading mb-4">Total a pagar</h3>
                            <p className="d-flex">
                                <span>Delivery</span>
                                <span>$0.00</span>
                            </p>
                            <p className="d-flex">
                                <span>Discount</span>
                                <span>$0.00</span>
                            </p>
                            <hr/>
                            <p className="d-flex total-price">
                                <span>Total</span>
                                <span>${ invoiceTotal }</span>
                            </p>
                            
                            </div>
                            
                        </div>
                        
                    </div>
                    </div>
            </div>
            </div>
        </section>
        <Footer></Footer>
        </>
    )
}