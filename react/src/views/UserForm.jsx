import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx"


export default function UserForm(){
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        id: "",
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    // alert(user.id)

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get('/users/' + (id !== 'create' ? id : ""))
            .then(({data}) => {
                setLoading(false);
                setUser(data.data) 
            })
            .catch((error) => {
                setErrors(error)
                setLoading(false);
            });

        }, [])
    }
    const onDelete = ev => {
        ev.preventDefault()
        axiosClient.delete(`users/${user.id}`)
        .then(()=>{
            navigate('/users')
        })
    }
    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
          axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
            
              navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
                console.log(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/users', user)
            .then(() => {
            
              navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }
      }
    



      return (
        <div>
          <h1>{user.id && !loading  ? `Update User: ${user.name}` : "New User"}</h1>
      
          <div className="card animated fadeInDow">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <>
                {errors && (
                  <div className="alert">
                    {Object.keys(errors).map((key) => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                )}
      
                <form onSubmit={onSubmit}>
                  <input
                    value={user.name}
                    onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                    placeholder="Name"
                  />
                  <input
                    value={user.email}
                    onChange={(ev) =>
                      setUser({ ...user, email: ev.target.value })
                    }
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    onChange={(ev) =>
                      setUser({ ...user, password: ev.target.value })
                    }
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    onChange={(ev) =>
                      setUser({ ...user, password_confirmation: ev.target.value })
                    }
                    placeholder="Password Confirmation"
                  />
                  <button className="btn">Save</button>
                </form>
              </>
            )}
          </div>
        </div>
      );
      

   
}