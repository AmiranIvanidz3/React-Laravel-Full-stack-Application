import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx"

export default  function GuestLayout(){
    
    const {token} = useStateContext();

    if(token) { 
        
        return (
            <Navigate to="/" /> 
        )   
    }

    return (
        <div  className="container bg-danger">
            <Outlet/>
        </div>
    )
}