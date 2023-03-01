import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Contact from './components/Contact.jsx';
import StaticContext from './components/ContextState/StaticContext.js';
import Invoice from './components/Invoice.jsx';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import Menu from './components/Menu.jsx';
import Profile from './components/Profile.jsx';
import Register from './components/Register.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import Single_Product from './components/Single_Product.jsx';
import InvoiceContext from './components/ContextState/InvoiceContext.js'

function App() {

  return (
    <StaticContext>
      <InvoiceContext>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Main></Main>} exact></Route>
            <Route path='/productos/:option' element={<Menu></Menu>} exact></Route>
            <Route path='/productos/single/:id' element={<Single_Product></Single_Product>} exact></Route>
            <Route path='/register' element={<Register></Register>} exact></Route>
            <Route path='/login' element={<Login></Login>} exact></Route>
            <Route path='/profile/:id' element={<Profile></Profile>} exact></Route>
            <Route path='/contactUs' element={<Contact></Contact>} exact></Route>
            <Route path='/shoppingCart/:id' element={<ShoppingCart></ShoppingCart>} exact></Route>
            <Route path='/checkout' element={<Invoice></Invoice>} exact></Route>
          </Routes>
        </HashRouter>
      </InvoiceContext>
    </StaticContext>
  );
}

export default App;

// 