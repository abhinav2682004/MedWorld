import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children, onRoleChange }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [role, setRole] = useState(localStorage.getItem('role') || null);
    const [user, setUser] = useState(localStorage.getItem('username') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const navigate = useNavigate();

    useEffect(() => {
        onRoleChange(role);
    }, [role, onRoleChange]);

    const loginAction = async (data) => {
        try {
            const response = await axios.post("http://localhost:5632/login", { email: data.email, password: data.password, username: data.username });
            if (response.data) {
                setToken(response.data.token);
                setRole(response.data.role);
                setUser(response.data.user);
                setUserId(response.data.user._id);

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("username", response.data.user.username);
                localStorage.setItem("userId", response.data.user._id);

                onRoleChange(response.data.role); // Trigger role change callback
                return;
            }
        } catch (err) {
            console.log(err);
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        setToken("");
        setUser(null);
        setRole("");
        setUserId(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        onRoleChange(null); // Trigger role change callback
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, user, role, userId, loginAction, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
