import { useRef, useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/')
        } catch {
            setError('Failed to sign in')
        }

        setLoading(false)
    }

  return (
    <div className='card'>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && alert(error)}
            <div className="form-group">
                <label htmlFor="emailInput">Your Email</label>
                <input type="email" id="emailInput" placeholder='Email Here' ref={emailRef}/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Your Password</label>
                <input type="password" id="passwordInput" placeholder='password Here' ref={passwordRef}/>
            </div>
            <button disabled={loading} type='submit'>Login</button>
        </form>
        <div className="forgotPassLink">
            Forgot password? <Link to='/forgot-password'>Update Password</Link>
        </div>
        <div className="signinLink">
           Need an account? <Link to='/signup'>
                Sign Up.
           </Link>
        </div>
    </div>
  )
}


export default Login