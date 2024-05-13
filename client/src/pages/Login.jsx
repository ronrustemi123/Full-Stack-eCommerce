import { useState } from "react";
import {Link} from 'react-router-dom'
import { useLogin } from "../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className="forms login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input type="email" onChange={e => setEmail(e.target.value)} value={email}/>
            <label>Password:</label>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
            <button type="submit" disabled={isLoading}>Log In</button>
            <Link to={'/signup'}>Don't have an account? <span>Sign Up</span></Link>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default Login;