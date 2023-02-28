import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Encabezado from "./Encabezado.jsx";
import Productos from "./Productos.jsx";
import Footer from "./Footer.jsx";

function Menu(){

	const [category, setCategory] = useState('');
    const { option } = useParams();
	let optionCategoria = '';

	if(option==='list'){
		optionCategoria = '';
	} else{
		optionCategoria = option;
	}
	

	useEffect(() =>
		setCategory(optionCategoria)
	)
		
    return(
        <>
            <Encabezado></Encabezado>
			<section className="ftco-section">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-10 mb-5 text-center">
							<ul className="product-category">
								<li><Link to='/productos/list' onClick={()=>{setCategory('')}} className="active">All</Link></li>
								<li><Link to='/productos/Chocolates' onClick={()=>{setCategory('Chocolates')}} >Chocolates</Link></li>
								<li><Link to='/productos/Alfajores' onClick={()=>{setCategory('Alfajores')}} >Alfajores</Link></li>
								<li><Link to='/productos/Gomitas' onClick={()=>{setCategory('Gomitas')}} >Gomitas</Link></li>
								<li><Link to='/productos/Ponques' onClick={()=>{setCategory('Ponques')}} >Ponques</Link></li>
							</ul>
						</div>
					</div>
					<div className="row">
						<Productos categoriaProductos={category}></Productos>
					</div>
				</div>
			</section>
            <Footer></Footer>
        </>
    );
}

export default Menu;