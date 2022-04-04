import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

export const PrivateRoute = ({children}) => {
    const {currentUser} = useAuth()

  return currentUser ? children: <Navigate to='/' />
}
