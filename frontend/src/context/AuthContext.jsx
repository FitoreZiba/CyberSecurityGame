import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user,    setUser]    = useState(null)
    const [token,   setToken]   = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem('cyber_token')
        const savedUser  = localStorage.getItem('cyber_user')
        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = (userData, jwtToken) => {
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem('cyber_token', jwtToken)
        localStorage.setItem('cyber_user', JSON.stringify(userData))
    }

    // Call this after any action that changes user points/level
    const updateUser = (updatedUser) => {
        setUser(updatedUser)
        localStorage.setItem('cyber_user', JSON.stringify(updatedUser))
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('cyber_token')
        localStorage.removeItem('cyber_user')
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)