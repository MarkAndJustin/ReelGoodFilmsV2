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
    }

  return (
    <section className={styles.login}>
            <div className={styles.card}>
                <form onSubmit={handleSubmit}>
                    <h2 className={styles.heading}>Login</h2>
                    {error && alert(error)}
                    <div className={styles.formGroup}>
                        <label htmlFor="emailInput">Your Email</label>
                        <input
                            className={styles.formInput} 
                            type="email" 
                            id="emailInput" 
                            placeholder='Email Here' 
                            ref={emailRef}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="passwordInput">Your Password</label>
                        <input 
                            className={styles.formInput}
                            type="password" 
                            id="passwordInput" 
                            placeholder='password Here' 
                            ref={passwordRef}/>
                    </div>
                    <button 
                        className={styles.loginButton} 
                        disabled={loading} 
                        type='submit'>Login</button>
                </form>
            <div className={styles.linkContainer}>
                <Link to='/forgot-password' className={styles.link}>
                    Forgot Password?
                </Link>
                <Link to='/signup' className={styles.link}>
                    Need An Account?
                </Link>
            </div>
        </div>
    </section>
  )
}


export default Login