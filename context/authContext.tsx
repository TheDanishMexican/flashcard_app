import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react'
import { User } from 'firebase/auth'
import { FIREBASE_AUTH } from '@/firebase/firebase'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { usePathname, useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'

// Create context
const AuthContext = createContext<{
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => void
    signUp: (email: string, password: string) => void
    logout: () => void
}>({
    user: null,
    loading: true,
    signIn: () => {},
    signUp: () => {},
    logout: () => {},
})

// Auth provider to manage the auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (user === null && pathname !== '/') {
            // If no user and the loading state is complete, redirect to login
            router.replace('/') // Redirect to login page
        }
    }, [user])

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            )
            console.log(response)
            router.replace('/menu')
        } catch (error: any) {
            const err = error as FirebaseError
            alert('Sign in failed: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email: string, password: string) => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            )
            console.log(response)
            alert('Check your emails')
        } catch (error: any) {
            const err = error as FirebaseError
            alert('Registration failed: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        FIREBASE_AUTH.signOut()
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext)
}
