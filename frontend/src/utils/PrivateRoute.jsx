import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import TrainerDashboard from '../pages/TrainerDashboard'
import ClientDashboard from '../pages/ClientDashboard'

const PrivateRoute = () => {
    let { user } = useContext(AuthContext)

    // If not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" />
    }

    // If logged in, determine which dashboard to show
    return user.is_trainer ? <TrainerDashboard /> : <ClientDashboard />
}

export default PrivateRoute;
