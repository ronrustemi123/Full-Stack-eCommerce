import { useState } from "react";
import {Link} from 'react-router-dom'
import '../components/Forms.css'
import { useSignup } from "../hooks/useSignup";

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <form className="forms sign-up" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input type="email" onChange={e => setEmail(e.target.value)} value={email}/>
            <label>Password:</label>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
            <button type="submit" disabled={isLoading}>Sign Up</button>
            <Link to={'/login'}>Already have an account? <span>Log In</span></Link>
            {error && <div className="error">{error}</div>}

        </form>
    );
}
 
export default Signup;