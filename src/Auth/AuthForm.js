import {useState, useRef, useContext} from 'react';
import styles from './AuthForm.module.css';
import AuthContext  from '../store/auth-context';
import {useNavigate} from 'react-router-dom';

const AuthForm = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext)

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLoggedIn((prevState) => !prevState);
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        let url;
        if(isLoggedIn) {   
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXXxY-y1K8Y7eunVvk9DbCFLu9OJIvIwc'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXXxY-y1K8Y7eunVvk9DbCFLu9OJIvIwc';
        }
        fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setIsLoading(false)
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication failed';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message
                        }
                        throw new Error(errorMessage)
                    });
                }
            }).then(data => {
                authCtx.login(data.idToken, Date.now() + data.expiresIn * 1000);
                navigate('/home')
            })
            .catch(err => {
                alert(err.message)
            })
    }

  return (
    <section className={styles.auth}>
        <div className={styles.authContainer}>
            <form onSubmit={handleFormSubmit} className={styles.authForm}>
                <div className={styles.authInput}>
                    <label htmlFor="authEmail">Your Email</label>
                    <input 
                        type="email" 
                        id="authEmail" 
                        placeholder='Please input your email here...'
                        ref={emailInputRef}
                        required
                    />
                </div>
                <div className={styles.authInput}>
                    <label htmlFor="authPassword">Your Password:</label>
                    <input 
                        type="password" 
                        id='authPassword'
                        placeholder='Please input your password here...' 
                        ref={passwordInputRef}
                        required
                    />
                </div>
                <div>
                    {!isLoading && <button>{isLoggedIn ? 'Login' : 'Create ACcount'}</button>}
                    {isLoading && <p>Loading...</p>}
                    <button type='button' className={styles.toggle} onClick={switchAuthModeHandler}>
                        {isLoggedIn ? 'Create new Account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default AuthForm