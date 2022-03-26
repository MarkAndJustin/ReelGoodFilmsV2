
import {useRef, useContext} from 'react';
import AuthContext from '../store/auth-context'
import styles from './Profile.module.css'
import {useNavigate} from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const newPasswordRef = useRef();
    const authCtx = useContext(AuthContext);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const enteredNewPassword = newPasswordRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAXXxY-y1K8Y7eunVvk9DbCFLu9OJIvIwc', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token, 
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-type' : 'application/json'
            }
        }).then(res => {
            navigate('/home')
        })
    }

  return (
    <section className={styles.profile}>
        <div className={styles.profileWrapper}>
            <div className={styles.profileCard}>
                <form className={styles.profileForm} onSubmit={handleFormSubmit}>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id='newPassword' minLength="7" placeholder='Change password' ref={newPasswordRef}/>
                    <button>Change Password</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Profile