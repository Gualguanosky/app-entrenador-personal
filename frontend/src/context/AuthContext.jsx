import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => {
        const token = localStorage.getItem('access_token');
        return token ? { access: token, refresh: localStorage.getItem('refresh_token') } : null;
    });
    let [user, setUser] = useState(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            if (token === 'mock-access-token') {
                return { username: 'demo_user', first_name: 'Usuario', is_trainer: false };
            }
            try {
                return jwtDecode(token);
            } catch (e) {
                console.error("Error decoding token", e);
                return null;
            }
        }
        return null;
    });
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('token/', {
                username: e.target.username.value,
                password: e.target.password.value
            });

            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                navigate('/');
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            alert('Invalid credentials');
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(localStorage.getItem('access_token')))
        }
        setLoading(false)
    }, [authTokens, loading])


    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
