import { useRef, useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage('Ckeck your inbox')
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
    }

  return (
    <div className='card'>
        <form onSubmit={handleSubmit}>
            <h2>PAssword Reset</h2>
            {error && alert(error)}
            {message && <p>{message}</p>}
            <div className="form-group">
                <label htmlFor="emailInput">Your Email</label>
                <input type="email" id="emailInput" placeholder='Email Here' ref={emailRef}/>
            </div>
            <button disabled={loading} type='submit'>Reset Password</button>
        </form>
        <div className="forgotPassLink">
            <Link to='/login'>Login</Link>
        </div>
        <div className="signinLink">
           Need an account? <Link to='/signup'>
                Sign Up.
           </Link>
        </div>
    </div>
  )
}

export default ForgotPassword