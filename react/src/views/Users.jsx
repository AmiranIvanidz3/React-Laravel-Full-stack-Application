import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users(){
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(()=>{
        getUsers()
    },[])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get("/users")
        .then( 
            ({data}) => {
                setLoading(false)
                setUsers(data.data)
            } 
        )
        .catch(
            () => {
                setLoading(false)
            }
        )
    }

    const deleteRecord = (e, id) => {
        e.currentTarget.parentElement.parentElement.remove()

        axiosClient.delete(`../api/users/${id}`);
      
    }


    return (
        <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <h1>Users</h1>
                <Link to="../users/create" className="btn-add">Add New</Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        loading ? ( 
                        <tbody>
                            <tr style={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                               <td>loading...</td>
                            </tr>
                        </tbody>
                        ) : (
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link className="btn-edit" style={{ marginRight:'5px' }} to={'../users/'+user.id}>Edit</Link>
                                        <button onClick={(e) => deleteRecord(e, user.id)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody> )
                    }
                   
                </table>
            </div>
        </div>
    )
}