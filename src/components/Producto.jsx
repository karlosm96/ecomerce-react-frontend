import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function Producto({ nombre, precio, imagen, appendDataList }){

    const [quantity, setQuantity] = useState(0);

    function addOrRemove(bool){
        let num = bool ? quantity + 1 : (quantity > 1 ? quantity - 1 : 0);
        setQuantity(num);
    }

    const activateButton = (quantity) => quantity ? buttonAction(quantity) : "";

    function buttonAction(quantity){
        appendDataList(true, quantity);
        toast.success("se ha agregado el producto al carrito");
        setQuantity(0);
    }

    return(
        <>
            <ToastContainer position='top-center' limit={1}></ToastContainer>
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5">
                            <a href="images/product-1.jpg" className="image-popup"><img onClick={()=> {}} src={window.location.origin + `/images/${imagen}`} className="img-fluid" alt="Colorlib Template"></img></a>
                        </div>
                        <div className="col-lg-6 product-details pl-md-5">
                            <h3>{nombre}</h3>
                            <div className="rating d-flex">
                                    <p className="text-left mr-4">
                                        <a href="#" className="mr-2">5.0</a>
                                        <a href="#"><span className="ion-ios-star-outline"></span></a>
                                        <a href="#"><span className="ion-ios-star-outline"></span></a>
                                        <a href="#"><span className="ion-ios-star-outline"></span></a>
                                        <a href="#"><span className="ion-ios-star-outline"></span></a>
                                        <a href="#"><span className="ion-ios-star-outline"></span></a>
                                    </p>
                                    <p className="text-left mr-4">
                                        <a href="#" className="mr-2" style={{color: '#000'}}>100 <span style={{color: '#bbb'}}>Rating</span></a>
                                    </p>
                                    <p className="text-left">
                                        <a href="#" className="mr-2" style={{color: '#000'}}>500 <span style={{color: '#bbb'}}>Sold</span></a>
                                    </p>
                                </div>
                            <p className="price"><span>${precio}</span></p>
                            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until.
                                </p>
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <div className="form-group d-flex">
                            <div className="select-wrap">
                            <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                            </div>
                            </div>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="input-group col-md-6 d-flex mb-3">
                            <span className="input-group-btn mr-2">
                                <button type="button" className="quantity-left-minus btn" onClick={() =>{ addOrRemove(false) }} data-type="minus" data-field="">
                            <i className="ion-ios-remove"></i>
                                </button>
                                </span>
                            <input type="text" id="quantity" name="quantity" className="form-control input-number" value={quantity} onChange={()=>(null)} min="1" max="100"></input>
                            <span className="input-group-btn ml-2">
                                <button type="button" className="quantity-right-plus btn" onClick={() =>{ addOrRemove(true) }} data-type="plus" data-field="">
                                <i className="ion-ios-add"></i>
                            </button>
                            </span>
                        </div>
                        <div className="w-100"></div>
                    </div>
                    <p><a onClick={ () => {activateButton(quantity); console.log("")} } className="btn btn-black py-3 px-5">Add to Cart</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}