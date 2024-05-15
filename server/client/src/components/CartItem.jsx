import './CartItem.css'
import { useUserContext } from '../hooks/useUserContext'
import {useCartContext} from '../hooks/useCartContext'

const CartItem = ({price, img, title, quantity, _id}) => {


    const {dispatch} = useCartContext()
    const {user} = useUserContext()

    const deleteItem = async () => {

        if(!user) {
            return
        }

        const response = await fetch(`http://localhost:8000/api/cart/${_id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const data = await response.json()
        dispatch({type: 'DELETE_ITEM', payload: data})
    }

    return (
        <div className="cart-item">
            <img width={120} height={120} src={img} alt="" />
            <div>
                <div className='cart-item-flexier'>
                    <h2>{title}</h2>
                    <p>Amount: {quantity}</p>
                </div>
                <div className='cart-item-flex'>
                    <p>${price}</p>
                    <i onClick={deleteItem} className="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
    );
}
 
export default CartItem;