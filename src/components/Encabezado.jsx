import { Link, useNavigate } from "react-router-dom";

function Encabezado(){

    const jwt = localStorage.getItem('token');
    const userID = localStorage.getItem('payload');
    const navigate = useNavigate();
    const arrayProductQuantity = localStorage.getItem('quantityProduct');

    function logOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('payload')
        navigate('/')
        window.location.reload(true)
    }

    function logInOut(userID, jwt){
        const condition = userID && jwt ? true : false;
        if(!condition){
            return(<Link to="/login" className="nav-link">Iniciar Sesion</Link>);
        } else{
            return(<Link to="/" className="nav-link" onClick={(() => { logOut() })}>Log-Out</Link>);
        }
    }

    function userInfo(userID, jwt){
        const condition = userID && jwt ? true : false;
        if(condition){
            return(<Link to={`/profile/${userID}`} className="nav-link">Perfil</Link>);
        }
    }
    
    return(
        <div>
            <div className="py-1 bg-primary">
                <div className="container">
                    <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
                        <div className="col-lg-12 d-block">
                            <div className="row d-flex">
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-phone2"></span></div>
                                    <span className="text">+54 911 2455-4879</span>
                                </div>
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
                                    <span className="text">MiDulceOnline96@gmail.com</span>
                                </div>
                                <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                                    <span className="text">3-5 Business days delivery &amp; Free Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <Link className="navbar-brand" to="/">MiDulceOnline</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>

                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <Link className="dropdown-item" to="/productos/list">Products</Link>
                                    <Link className="dropdown-item" to={`/shoppingCart/${userID}`}>Cart</Link>
                                    <a className="dropdown-item" href="/">Checkout</a>
                                </div>
                            </li>
                            <li className="nav-item"><Link to='/contactUs' className="nav-link">Contact</Link></li>
                            <li className="nav-item">{logInOut(userID, jwt)}</li>
                            <li className="nav-item">{userInfo(userID, jwt)}</li>
                            <li className="nav-item cta cta-colored"><Link to={`/shoppingCart/${userID}`} className="nav-link"><span className="icon-shopping_cart">[{arrayProductQuantity}]</span></Link></li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );
}

export default Encabezado;