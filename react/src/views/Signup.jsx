import { useRef,useState } from "react"
import { Link, } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx"


export default function Signup(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext(null)

    const [errors, setErrors] = useState(null);


    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,

        }

        
        axiosClient.post("/signup", payload)
        .then(( {data} ) => { 
            setUser(data.user),
            setToken(data.token)
         })
         .catch( err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
         }) 
    }
    return (
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
         <form onSubmit={onSubmit}>

             <h1 className="title">
                    Register
             </h1>
             {errors && (
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
             )}

             <input ref={nameRef} type="text" placeholder="Full Name"/>
             <input ref={emailRef} type="email" placeholder="E/MaiL Address"/>
             <input ref={passwordRef} type="password" placeholder="Password"/>
             <input ref={passwordConfirmationRef}  type="password" placeholder="Passowrd Confirmation"/>
             <button  className="btn btn-block">Sign Up</button>
             <p className="message">
                Already Registered <Link to="/login">Lets Login</Link>
             </p>
         </form>
        </div>
     </div>
    )
}