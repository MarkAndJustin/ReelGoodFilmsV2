import {useState, useRef} from 'react';
import styles from './AuthForm.module.css'

const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLoggedIn, setIsLoggedIn] = useState(true) ;

    const switchAuthModeHandler = () => {
        setIsLoggedIn((prevState) => !prevState);
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if(isLoggedIn) {

        } else {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXXxY-y1K8Y7eunVvk9DbCFLu9OJIvIwc',
                {
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
                if (res.ok) {

                } else {
                    return res.json().then(data => {
                        console.log(data)
                    });
                }
            })
        }
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
                    <button>{isLoggedIn ? 'Login' : 'Create ACcount'}</button>
                    <button 
                        type='button'
                        className={styles.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLoggedIn ? 'Create new Account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default AuthForm