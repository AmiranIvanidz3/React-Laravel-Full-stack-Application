import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx"
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default  function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();


    
    useEffect(function(){
        axiosClient.get('/user')
            .then( ({data}) => {
                setUser(data);
            } )
    }, [])
    
    if(!token) { 
        return (
            <Navigate to="/login" /> 
        )   
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
        .then( () => {
            setUser(null);
            setToken(null);
        } )
    }



    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>

                    <div>
                        Header
                    </div>

                    <div>
                        <strong>{user.name}</strong>
                        <a href="/login" style={{ marginLeft:'20px' }} onClick={onLogout} className='btn'>Logout</a>
                    </div>

                </header>

                <main>
                    <Outlet />
                </main>

            </div>  
        </div>
    )
}