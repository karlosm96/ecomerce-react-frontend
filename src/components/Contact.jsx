import { useState } from "react";
import Encabezado from "./Encabezado";
import Footer from "./Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Contact(){

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) =>{
        e.preventDefault();
        if(!email || !subject || !name || !message){
            return toast.error('Porfavor llene todos los espacios.')
        }

        try{
            setLoading(true);
            const { data } = await axios.post(`https://midulceonline-backend-service.onrender.com/api/v1/contactUs/send`, {
                name,
                email,
                subject,
                message
            });
            setLoading(false);
            toast.success(data.message);

        } catch(err){
            setLoading(false);
            toast.error(
                err.response && err.response.data.message 
                ? err.response.data.message
                : err.message
            )
        }
    }
    
    return(
        <>
        <Encabezado></Encabezado>
        <div className="hero-wrap hero-bread" style={{backgroundImage: `url(${window.location.origin + '/images/demo1.jpg'})`}}>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-9 text-center">
                    <p className="breadcrumbs"><span className="mr-2"><Link to="/">Home</Link></span> <span className="mr-2"><Link to="/productos/list">Products</Link></span> <span><Link to="/contactUs">Contact</Link></span></p>
                    <h1 className="mb-0 bread">Contacto</h1>
                </div>
                </div>
            </div>
        </div>

        <ToastContainer position="bottom-center" limit={1}></ToastContainer> 
        <section className="ftco-section contact-section bg-light">
        <div className="container">
            <div className="row d-flex mb-5 contact-info">
            <div className="w-100"></div>
            <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                    <p><span>Direccion:</span> Calle Falsa 123, Bogota, Colombia</p>
                </div>
            </div>
            <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                    <p><span>Telefono:</span> <a href="tel://1234567920">+57 32 1463-6338</a></p>
                </div>
            </div>
            <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                    <p><span>Email:</span> <a href="mailto:info@yoursite.com">MiDulceOnline@gmail.com</a></p>
                </div>
            </div>
            <div className="col-md-3 d-flex">
                <div className="info bg-white p-4">
                    <p><span>Website</span> <a href="#">yoursite.com</a></p>
                </div>
            </div>
            </div>
            <div className="row block-9">
            <div className="col-md-6 order-md-last d-flex">
                <form action="#" className="bg-white p-5 contact-form" onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Your Name" onChange={((e) => {setName(e.target.value)})}></input>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Your Email" onChange={((e) => {setEmail(e.target.value)})}></input>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Subject" onChange={((e) => {setSubject(e.target.value)})}></input>
                </div>
                <div className="form-group">
                    <textarea name="" id="" cols="30" rows="7" className="form-control" placeholder="Message" onChange={((e) => {setMessage(e.target.value)})}></textarea>
                </div>
                <div className="form-group">
                    <input type="submit" value={loading ? 'Enviando...' : 'Enviar'} className="btn btn-primary py-3 px-5" ></input>
                </div>
                </form>
            
            </div>

            <div className="col-md-6 d-flex">
                <div id="map" className="bg-white"></div>
            </div>
            </div>
        </div>
        </section>
        <Footer></Footer>
       </>
    )
}