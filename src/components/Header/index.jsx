import React, { useState } from 'react';
import axios from 'axios'

const Header = () => {

    const [userFullName, setUserFullName] = useState('')
    React.useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const dateExpired = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
            const today = new Date();
            if (dateExpired <= today) {
                localStorage.removeItem('token');
                localStorage.removeItem('administrator')
                window.location.href = '/login';
            } else {
                axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    setUserFullName(response.data.data.full_name)
                    if(response.data.data.email === process.env.REACT_APP_ADMIN_EMAIL) {
                        localStorage.setItem('administrator', true)
                    }
                })
                .catch(error => {
                    console.error("Header error:", error)
                })
            }
        }
    }, [])

    
    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token')
            localStorage.removeItem('administrator')
            window.location.href = '/login'
        }
    }
    

    return (
        <header className="flex justify-between items-center p-4" style={{ backgroundColor: 'blue', color: 'white' }}>
            <div className="hidden md:block">
                <h1 className="text-lg font-bold">Monitoring WhatsApp</h1>
            </div>
            <div className="md:hidden">
                {/* Hamburger icon for mobile view */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
            </div>
            <div className="flex items-center">
                <div className="hidden md:block">
                    <div className="text-white-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                        <span>{userFullName}</span>
                    </div>
                    <div 
                    onClick={logout}
                    className="text-white-700 font-semibold py-2 px-4 rounded inline-flex items-center hover:cursor-pointer">
                        Logout
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

