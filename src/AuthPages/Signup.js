import { useRef, useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'

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

        if(passwordRef.current.value.length < 6) {
            return setError('Password needs to be at least 6 characters')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            navigate('/home')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

  return (
    <section className={styles.signUp}>
        <div className={styles.card}>
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error &&  <div className={styles.errorMessage}>
                            <p>{error}</p>
                        </div>}
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
                    placeholder='Please enter your password here' 
                    ref={passwordRef}/>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="passwordComfirmInput">Confirm your Password</label>
                <input
                    className={styles.formInput} 
                    type="password" 
                    id="passwordConfirmInput" 
                    placeholder='Please retype your password here' 
                    ref={passwordConfirmRef}/>
            </div>
            <button className={styles.signUpButton} disabled={loading} type='submit'>Submit</button>
        </form>
        <div className={styles.signInLinkContainer}>
            <Link className={styles.signInLink} to='/'>Already have an account? Sign in.</Link>
        </div>
    </div>
    </section>
  )
}

export default Signup