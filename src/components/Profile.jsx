import { useEffect, useState, useCallback } from "react"
import Footer from "./Footer.jsx";
import CountryButton from "./CountryButton.jsx";
import Encabezado from "./Encabezado.jsx"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Swal from 'sweetalert2';
import axios from "axios";

export default function Profile(){

    const [nombre, setNombre] = useState(String);
    const [telefono, setTelefono] = useState(String);
    const [fechaNacimiento, SetFechaNacimiento] = useState();
    const [pais, setPais] = useState(String);
    const [direccion, setDireccion] = useState(String);
    const [emailUsuario, setEmailUsuario] = useState(String);
    const [nombreUsuario, setNombreUsusario] = useState(String);
    const [clienteInfo, setClienteInfo] = useState();

    // Peticion para autenticar
    // **************************************************************************************
    const token = localStorage.getItem('token');
    let bearer;
    if(token===''){
        bearer="";
    } else{
        bearer = `${token}`;
    }

    const idUser = localStorage.getItem('payload');

    const configSimple={
        headers:{'Content-Type': 'application/json','x-auth-token': bearer}
    }
    // **************************************************************************************
    

    useEffect(() =>{
        axios.get(`https://midulceonline-backend-service.onrender.com/api/v1/auth/${idUser}`, configSimple).then(res => {
			setEmailUsuario(res.data['usuario']['email'])
            setNombreUsusario(res.data['usuario']['userName'])
        }).catch(err=>{console.log(err.stack)})
    }, [])

    const changeCountry = pais =>{
        setPais(pais)
    }

    const fetchData = useCallback(async () =>{
        const response = await fetch(`https://midulceonline-backend-service.onrender.com/api/v1/clientes/findById/${idUser}`, configSimple);
        const json = await response.json();
        setClienteInfo(json)
    });

    function updateProfile(){

        fetchData();

        let nombreValidation = nombre !== '' ? nombre : clienteInfo.nombre;
        let telefonoValidation = telefono !== '' ? telefono : clienteInfo.telefono;
        let fechaNacimientoValidation = fechaNacimiento !== undefined ? fechaNacimiento : clienteInfo.fechaNacimiento;
        let paisValidation = pais !== '' ? pais : clienteInfo.pais;
        let direccionValidation = direccion !== '' ? direccion : clienteInfo.direccion;

        const profileData = {
            nombre: nombreValidation,
            telefono: telefonoValidation,
            fechaNacimiento: fechaNacimientoValidation,
            pais: paisValidation,
            direccion: direccionValidation
        }

        const config = {
            body: JSON.stringify(profileData),
            headers:{'Content-Type': 'application/json','x-auth-token': bearer}
        }

        const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
          
            swalWithBootstrapButtons.fire({
                title: 'Estas seguro?',
                text: "Llena todos los campos, tu informacion se va a actualizara!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, hazlo!',
                cancelButtonText: 'No, cancelalo!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
        
                    //Metodo actualizar
                    axios.put(`https://midulceonline-backend-service.onrender.com/api/v1/clientes/update/${idUser}`, profileData, config).catch(err => { console.log(err.stack); });
                        swalWithBootstrapButtons.fire(
                        'Actualizado!',
                        'El perfil ha sido actualizado.',
                        'warning'
                    )
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'Tu informacion esta intacta :)',
                        'error'
                    )
                }
            })
    }

    return(
        <div>
        <Encabezado></Encabezado>
        <div className='snippet-body'>
            <div className="container rounded bg-white mt-3 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-3"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><span className="font-weight-bold"> {nombreUsuario} </span><span className="text-black-50"> {emailUsuario} </span><span> </span></div>
                    </div>
                    <div className="col-md-6 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="d-flex justify-content-center">Configuracion del Perfil</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6"><label className="labels">Nombre</label><input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={ (e)=> setNombre(e.target.value) } ></input></div>
                                <div className="col-md-6"><label className="labels">Fecha de Nacimiento</label><input type="date" className="form-control" value={fechaNacimiento} onChange={ (e)=> SetFechaNacimiento(e.target.value) } ></input></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels">Telefono</label><PhoneInput className="labels" placeholder="Ingrese su numero de telefono" value={telefono} onChange={ (e)=> setTelefono(e) } ></PhoneInput></div>
                                <div className="col-md-12"><CountryButton changeCountry={ changeCountry}  value={ pais }  ></CountryButton></div>
                                <div className="col-md-12"><label className="labels">Direccion</label><input type="text" className="form-control" placeholder="Direccion de residencia" value={direccion} onChange={(e)=> setDireccion(e.target.value) } ></input></div>
                            </div>
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={()=> {updateProfile()}}>Guardar Cambios</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
    )
}