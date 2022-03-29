import { useRef, useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signUp} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

  return (
    <div className='card'>
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && alert(error)}
            <div className="form-group">
                <label htmlFor="emailInput">Your Email</label>
                <input type="email" id="emailInput" placeholder='Email Here' ref={emailRef}/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Your Password</label>
                <input type="password" id="passwordInput" placeholder='password Here' ref={passwordRef}/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordComfirmInput">Confirm your Password</label>
                <input type="password" id="passwordConfirmInput" placeholder='retype password Here' ref={passwordConfirmRef}/>
            </div>
            <button disabled={loading} type='submit'>Submit</button>
        </form>
        <div className="signinLink">
            Already have an account? <Link to='/login'>Sign in.</Link>
        </div>
    </div>
  )
}

export default Signup