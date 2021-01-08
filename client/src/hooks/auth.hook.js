import { useState, useCallback, useEffect } from 'react'

const storageData = 'user_data'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageData, JSON.stringify({ token: jwtToken, userId: id }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageData)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageData))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}