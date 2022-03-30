import { useRef, useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

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
            navigate('/home')
        } catch {
            setError('Failed to sign in')
        }

        setLoading(false)
    }

  return (
    <section className={styles.login}>
        <div className={styles.loginWrapper}>
            <div className={styles.card}>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && alert(error)}
                    <div className={styles.formGroup}>
                        <label htmlFor="emailInput">Your Email</label>
                        <input type="email" id="emailInput" placeholder='Email Here' ref={emailRef}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="passwordInput">Your Password</label>
                        <input type="password" id="passwordInput" placeholder='password Here' ref={passwordRef}/>
                    </div>
                    <button className={styles.loginButton} disabled={loading} type='submit'>Login</button>
                </form>
            <div className="forgotPassLink">
                Forgot password? <Link to='/forgot-password'>Update Password</Link>
            </div>
            <div>
                Need an account? <Link to='/signup'>
                    Sign Up.
                </Link>
            </div>
        </div>
    </div>
    </section>
  )
}


export default Login