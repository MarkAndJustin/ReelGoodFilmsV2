import { useRef, useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css'

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
            setMessage('Password reset instructions sent, please check your inbox.')
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
    }

  return (
    <section className={styles.forgotPassword}>
        <div className={styles.card}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.forgotPasswordHeading}>Password Reset</h2>
                {error && <div className={styles.errorMessage}>
                            <p>{error}</p>
                        </div>}
                {message && <p className={styles.resetMessage}>{message}</p>}
                <div className={styles.formGroup}>
                    <label htmlFor="emailInput">Your Email:</label>
                    <input 
                        className={styles.formInput}
                        type="email" 
                        id="emailInput" 
                        placeholder='Please type your email here' 
                        ref={emailRef} />
                </div>
                <button className={styles.formButton} disabled={loading} type='submit'>Reset Password</button>
            </form>
            <div className={styles.linkContainer}>
                <Link to='/' className={styles.forgotPasswordLink} >Back to login</Link>
                <Link to='/signup' className={styles.forgotPasswordLink}>Need an account?</Link>
            </div>
        </div>
    </section>
  )
}

export default ForgotPassword