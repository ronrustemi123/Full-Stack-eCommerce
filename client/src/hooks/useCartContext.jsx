import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export const useCartContext = () => {
    const context = useContext(CartContext)

    return context
}
 