import { ref, computed } from "vue"

export const useUser = () => {
    const user = useState('user', () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('user')
            return stored ? JSON.parse(stored) : null
        }
        return null
    })

    const token = useState('token', () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token')
        }
        return null
    })

    const isLoggedIn = computed(() => !!token.value)

    const setUser = (userData: any, userToken?: string) => {
        user.value = userData
        if (userToken) token.value = userToken
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(userData))
            if (userToken) localStorage.setItem('token', userToken)
        }
    }

    const logOut = () => {
        user.value = null
        token.value = null
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            window.location.href = '/auth/login'
        }
    }

    return { user, token, isLoggedIn, setUser, logOut }
}
