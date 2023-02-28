import React, { createContext, useEffect, useState } from 'react';

const InvoiceContext = (props) => {
    const [state, setState] = useState();

    const loadData = () => {
        if(!state){
            setState([]);
        } else{
            setState(state);
        }
    }

    useEffect(()=>{
        loadData();
    }, [state])

    return(
        <div>
            <AppShopContext.Provider value={ [state, setState] }>
                { props.children }
            </AppShopContext.Provider>
        </div>
    );
}

export default InvoiceContext;
export const AppShopContext = createContext();