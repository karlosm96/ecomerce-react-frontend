import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import APIInvoke from '../utils/APIInvoke.js';
import swal from 'sweetalert'

export default function Login(){

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const iniciarSesion = async () =>{

        if(password.length < 8){
            const msg = "La contraseña debe contener almenos 8 caracteres";
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
        } else{
            const data ={
                userName: username,
                email: username,
                password: password,
            }

            const response = await APIInvoke.invokePOST(`/api/v1/auth`, data);
            
            const mensaje = response.msg;

            if (mensaje === 'El usuario no existe' || mensaje === 'Contraseña incorrecta') {
                const msg = "No fue posible iniciar la sesión verifique los datos ingresados.";
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
            } else{
                //obtenemos el token de acceso jwt
                const jwt = response['token'];
                const userID = response['payload']['usuario']['id'];

                //guardamos el info en el localstorage
                localStorage.setItem('token', jwt);
                localStorage.setItem('payload', userID)
                
                //redireccionamos al home la pagina principal
                navigate('/');
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }

    return(
        <div className="Login">
        <section className="login common-img-bg">
            <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-12">
                            <div className="login-card card-block">
                                <form className="md-float-material" onSubmit={ onSubmit }>
                                    <div className="text-center">
                                        <Link to='/'><img src={window.location.origin + `/images/logo.jpg`} alt="logo"></img></Link>
                                    </div>
                                    <h3 className="tx-register text-center">Iniciar Sesion</h3>
                                    <div className="md-input-wrapper">
                                        <input type="text" id="userName" className="md-form-control" autoComplete="on" required value={ username } onChange={(e) => {setUserName(e.target.value)}}></input>
                                        <label>UserName o Email</label>
                                    </div>

                                    <div className="md-input-wrapper">
                                        <input type="password" id="password" className="md-form-control" autoComplete="off" required value={ password } onChange={(e) => {setPassword(e.target.value)}}></input>
                                        <label>Password</label>
                                    </div>

                                    <div className="col-xs-10 offset-xs-1">
                                        <button type="submit" className="btn btn-primary btn-md btn-block waves-effect waves-light m-b-20" onClick={ iniciarSesion }>Iniciar Sesion</button>
                                    </div>
                                    <div className="row info">
                                        <div className="col-xs-12 text-center">
                                            <span className="text-muted">No tienes una cuenta? </span>
                                            <Link to={"/register"} className="f-w-600 p-l-5">
                                                Registrate
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