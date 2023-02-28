import React, { createContext, useEffect, useState } from 'react';

const StaticContext = (props) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('shoppingCart')));

    const loadData = () => {
        if(!state){
            setState([]);
        } else{
            localStorage.setItem('shoppingCart', JSON.stringify(state));
            localStorage.setItem('quantityProduct', state.length)
        }
    }

    useEffect(()=>{
        loadData();
    }, [state])

    return(
        <div>
            <AppContext.Provider value={ [state, setState] }>
                { props.children }
            </AppContext.Provider>
        </div>
    );
}

export default StaticContext;
export const AppContext = createContext();