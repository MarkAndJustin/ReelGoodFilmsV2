import React, { useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth();
    const handleLogout = async () => {
        setError("")

        try {
            await logout()
            navigate('/login');
        } catch {
            setError('Failed to logout')
        }
    }

  return (
    <section className={styles.dashboard}>
        <div className={styles.card}>
            <div className={styles.dashboardContainer}>
                <h3>Profile</h3>
                {error && <p>{error}</p>}
                <strong>Signed in as: </strong> {currentUser.email}
                <Link to='/update-profile'>
                    Update Profile
                </Link>
                <button className={styles.dashboardButton} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </section>
  )
}

export default Dashboard