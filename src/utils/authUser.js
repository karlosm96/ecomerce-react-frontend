class authUser{
    authUserWithData(data){
        // Peticion para autenticar
        // **************************************************************************************
        const token = localStorage.getItem('token');
        let bearer;
        if(token===''){
            bearer="";
        } else{
            bearer = `${token}`;
        }
    
        const configSimple={
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json','x-auth-token': bearer}
        }
    
        return configSimple;
        // **************************************************************************************
    }
}

export default authUser;
