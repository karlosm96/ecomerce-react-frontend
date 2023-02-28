import Encabezado from './Encabezado.jsx';
import Footer from './Footer.jsx';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FeaturedProducts from './FeaturedProducts.jsx';
import Producto from './Producto.jsx';
import { AppContext } from './ContextState/StaticContext.js';

export default function Single_Product(props){

    const { id } = useParams();
    const [newId, setNewId] = useState(id);
    const [dataImagen, setDataImagen] = useState();
    const [dataNombre, setDataNombre] = useState();
    const [dataPrecio, setDataPrecio] = useState();
    const [dataListProducts, setDataListProducts] = useContext(AppContext);

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

    const fetchData = async () =>{
        const response = await fetch(`http://localhost:5000/api/v1/productos/findById/${newId}`);
        const json = await response.json();
        setNewId(newId);
        setDataImagen(json.imagen);
        setDataNombre(json.nombre);
        setDataPrecio(json.precio);
    };

    const changeId = (id) =>{
        setNewId(id);
    }

    function appendDataList(action, quantity){
        const newProduct = {
            id_producto: newId,
            cantidad: quantity,
            total: 0
        }

        setDataListProducts([...dataListProducts, newProduct]);
    }

    useEffect(()=>{
        fetchData();
    }, [newId])

    return(
        <>
            <Encabezado></Encabezado>
            <div className="hero-wrap hero-bread" style={{backgroundImage: `url(${window.location.origin + '/images/demo1.jpg'})`}}>
            <div className="container">
                <div className="row no-gutters slider-text align-items-center justify-content-center">
                <div className="col-md-9 text-center">
                    <p className="breadcrumbs"><span className="mr-2"><Link to="/">Home</Link></span> <span className="mr-2"><Link to="/productos/list">Products</Link></span> <span><Link to="/contactUs">Contact</Link></span></p>
                    <h1 className="mb-0 bread">Producto</h1>
                </div>
                </div>
            </div>
            </div>

            {/**Single product information */}
            
            <Producto nombre={dataNombre} precio={dataPrecio} imagen={dataImagen} appendDataList={appendDataList} ></Producto>
            <FeaturedProducts changeId={changeId} number={0}></FeaturedProducts>
            <Footer></Footer>
        </>
    )
}

// export default connect(mapStateToProps)(Producs)

/*
const config = {
            body: JSON.stringify(arrayProducts),
            headers:{'Content-Type': 'application/json','x-auth-token': bearer}
        }

        axios.put(`http://localhost:5000/api/v1/detalle_facturas/update/${userID}`, arrayProducts, config).catch( err => { console.log(err.stack) });
*/