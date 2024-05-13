import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext()

export const reducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return {
                user: state
            }
    }
}

export const UserContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {
        user: null
    })

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        if(userData) {
            dispatch({type: 'LOGIN', payload: userData})
        }
    }, [])

    console.log("userContext state: ", state)

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

