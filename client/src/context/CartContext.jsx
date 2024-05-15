import { createContext, useReducer } from "react";

export const CartContext = createContext()

export const cartReducer = (state, action) => {
    switch(action.type) {
        case "GET_ITEMS":
            return {
                items: action.payload
            }
        case "ADD_ITEM":
            return {
                items: [action.payload, ...state.items]
            }
        case "DELETE_ITEM":
            return {
                items: state.items.filter(el => el?._id !== action?.payload?._id)
            }
        default: 
            return {
                state
            }
    }
}

export const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, {
        items: null
    })

    return (
        <CartContext.Provider value={{...state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}