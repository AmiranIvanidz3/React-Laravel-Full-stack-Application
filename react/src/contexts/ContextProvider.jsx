import { createContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token : null 
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [token, _setToken] = useState( localStorage.getitem('ACCESS_TOKEN'))

    const setToken = ()  => {
        _setToken(token)

        if (token) { 
            localStorage.setItem('ACCESS_TOKEN', token)
        } else { 
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value = {{   }}>
        </StateContext.Provider>
    )
}