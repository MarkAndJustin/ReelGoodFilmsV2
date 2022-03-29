import React, { useState } from 'react'
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom'

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
    <div className='dash'>
        <h2 className='dashHeading'>Dashboard</h2>
        <div className="card">
            <h3>Profile</h3>
            {error && <p>{error}</p>}
            <strong>Email: </strong> {currentUser.email}
            <Link to='/update-profile'>
                Update Profile
            </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Dashboard