import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react'
import { updateProfile, User } from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebase/firebase'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { usePathname, useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'

// Create context
const AuthContext = createContext<{
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => void
    signUp: (email: string, password: string, name: string) => Promise<void>
    logout: () => void
}>({
    user: null,
    loading: true,
    signIn: () => {},
    signUp: async () => {},
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

            await createUserDocumentIfNeeded()

            router.replace('/menu')
        } catch (error: any) {
            const err = error as FirebaseError
            alert('Sign in failed: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email: string, password: string, name: string) => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            )

            await updateProfile(response.user, {
                displayName: name,
            })
            console.log(response)
            alert('Check your emails')
        } catch (error: any) {
            const err = error as FirebaseError
            console.log('Registration failed: ' + err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        FIREBASE_AUTH.signOut()
    }

    const createUserDocumentIfNeeded = async () => {
        const user = FIREBASE_AUTH.currentUser // Get the current user
        if (user) {
            const userRef = doc(FIREBASE_DB, 'users', user.uid) // Reference to the user's document
            const docSnap = await getDoc(userRef)

            if (!docSnap.exists()) {
                // If the user document doesn't exist, create it
                await setDoc(userRef, {
                    name: user.displayName || 'Anonymous', // Store user name
                    email: user.email || 'No email', // Store user email
                    createdAt: new Date(), // Timestamp of user creation
                })
                console.log('User document created')

                // Create an empty flashcards collection for the user
                const flashcardsRef = collection(FIREBASE_DB, 'flashcards')
                // You can add default flashcards if you want
                await addDoc(flashcardsRef, {
                    userId: user.uid, // Link to the user's document
                    // Optionally, initialize a first flashcard here
                })
                console.log('Flashcards collection initialized for the user')
            } else {
                console.log('User document already exists')
            }
        }
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
