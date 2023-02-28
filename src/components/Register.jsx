import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import uniquid from 'uniqid';
import axios from 'axios';

export default function Register(){
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordS, setPasswordS] = useState('');
    const [email, setEmail] = useState('');
    const [register, setRegister] = useState();

    function crearCuenta(){
        
        const idusuario = uniquid();

        const nuevoUsusario ={
            id: idusuario,
            userName: userName,
            password: password,
            email: email
        }

        const nuevoCliente = {
            id: idusuario,
            nombre: '',
            telefono: '',
            fechaNacimiento: '',
            pais: '',
            direccion: ''
        }

        const nuevoDetalleFactura = {
            id_encabezado_factura: idusuario,
            productos : []
        }

        setRegister(false);

        if(password === passwordS && !register){
            axios.post('http://localhost:5000/api/v1/usuarios', nuevoUsusario).then(res =>{

                axios.post(`http://localhost:5000/api/v1/clientes/add/`, nuevoCliente).catch(err => { console.log(err.stack) });
                axios.post('http://localhost:5000/api/v1/detalle_facturas/add', nuevoDetalleFactura).catch(err => { console.log(err.stack) });
                
                Swal.fire({ position: 'center', icon: 'success',  title: 'El Ususario ha sido registrado con exito!', showConfirmButton: false, timer: 1500 });
                navigate('/');
            }).catch(err => {
                setRegister(true);
                console.log(err.response);
            })

        } else{
            let msg = register ? "Ingrese un Usuario o Email distinto" : "Las contraseñas no coinciden!";
            swal({
                title: 'Error',
					text: msg,
					icon: 'error',
					buttons: {
						confirm: {
							text: 'Ok',
							value: true,
							visible: true,
							className: 'btn btn-danger',
							closeModal: true
						}
					}
				});
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="Register">
        <section className="login common-img-bg">
            <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-12">
                            <div className="login-card card-block">
                                <form className="md-float-material" onSubmit={ onSubmit }>
                                    <div className="text-center">
                                        <Link to='/'><img src={window.location.origin + `/images/logo.jpg`} alt="logo"></img></Link>
                                    </div>
                                    <h3 className="tx-register text-center">Registration</h3>
                                    <div className="md-input-wrapper">
                                        <input type="text" id="userName" className="md-form-control" autoComplete="on" required value={ userName } onChange={(e) => {setUserName(e.target.value)}}></input>
                                        <label>UserName</label>
                                    </div>

                                    <div className="md-input-wrapper">
                                        <input type="email" id="email" className="md-form-control" autoComplete="on" required value={ email } onChange={(e) => {setEmail(e.target.value)}}></input>
                                        <label>Email</label>
                                    </div>

                                    <div className="md-input-wrapper">
                                        <input type="password" id="password" className="md-form-control" autoComplete="off" required value={ password } onChange={(e) => {setPassword(e.target.value)}}></input>
                                        <label>Password</label>
                                    </div>
                                    
                                    <div className="md-input-wrapper">
                                        <input type="password" id="passwordS" className="md-form-control" autoComplete="off" required value={ passwordS } onChange={(e) => {setPasswordS(e.target.value)}}></input>
                                        <label>Repetir Password</label>
                                    </div> 
                                    <div className="col-xs-10 offset-xs-1">
                                        <button type="submit" className="btn btn-primary btn-md btn-block waves-effect waves-light m-b-20" onClick={ crearCuenta }>Registrarme</button>
                                    </div>
                                    <div className="row info">
                                        <div className="col-xs-12 text-center">
                                            <span className="text-muted">Ya tienes una cuenta? </span>
                                            <Link to={"/login"} className="f-w-600 p-l-5">
                                                Iniciar sesión
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        </div>
    )
}