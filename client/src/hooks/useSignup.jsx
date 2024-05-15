import { useState } from "react";
import {useUserContext} from './useUserContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useUserContext()

    const signup = async (email, password) => {
        setError(null)
        setIsLoading(true)


        const response = await fetch('http://localhost:8000/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(data.error)
        }else {
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({type: 'LOGIN', payload: data})
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}