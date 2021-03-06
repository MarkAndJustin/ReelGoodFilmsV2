import { useRef, useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UpdateProfile.module.css'

const UpdateProfile = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmailHandler, updatePasswordHandler } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

         if(passwordRef.current.value.length < 6) {
            return setError('Password needs to be at least 6 characters')
        }

        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmailHandler(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(updatePasswordHandler(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <section className={styles.updateProfile}>
        <div className={styles.card}>
             <form onSubmit={handleSubmit}>
            <h2 className={styles.updateProfileHeading}>Update Profile</h2>
            {error && <div className={styles.errorMessage}>
                            <p>{error}</p>
                        </div>}
            <div className={styles.formGroup}>
                <label htmlFor="emailInput">Your Email</label>
                <input
                    className={styles.formInput} 
                    type="email" 
                    id="emailInput" 
                    placeholder='Email Here' 
                    ref={emailRef}
                    defaultValue={currentUser.email}
                    />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="passwordInput">Your Password</label>
                <input
                    className={styles.formInput} 
                    type="password" 
                    id="passwordInput" 
                    placeholder='Leave blank to keep the same' 
                    ref={passwordRef}
                    />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="passwordComfirmInput">Confirm your Password</label>
                <input 
                    className={styles.formInput}
                    type="password" 
                    id="passwordConfirmInput" 
                    placeholder='Leave blank to keep the same' 
                    ref={passwordConfirmRef}
                />
            </div>
            <button className={styles.updateButton} disabled={loading} type='submit'>Update</button>
        </form>
        <div className={styles.linkToLoginContainer}>
            <Link className={styles.linkToLogin} to='/home'>Already have an account? Cancel</Link>
        </div>
        </div>
    </section>
  )
}


export default UpdateProfile