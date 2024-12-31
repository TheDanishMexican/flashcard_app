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

const AuthContext = createContext<{
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, name: string) => Promise<void>
    logout: () => void
}>({
    user: null,
    loading: true,
    signIn: async () => {},
    signUp: async () => {},
    logout: () => {},
})

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
            router.replace('/')
        }
    }, [user])

    async function signIn(email: string, password: string) {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            await createUserDocumentIfNeeded()
            router.replace('/menu')
        } catch (error: any) {
            const err = error as FirebaseError
            throw err
        } finally {
            setLoading(false)
        }
    }

    async function signUp(email: string, password: string, name: string) {
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
        } catch (error: any) {
            const err = error as FirebaseError
            throw err
        } finally {
            setLoading(false)
        }
    }

    function logout() {
        FIREBASE_AUTH.signOut()
    }

    async function createUserDocumentIfNeeded() {
        const user = FIREBASE_AUTH.currentUser
        if (user) {
            const userRef = doc(FIREBASE_DB, 'users', user.uid)
            const docSnap = await getDoc(userRef)

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName || 'Anonymous',
                    email: user.email || 'No email',
                    createdAt: new Date(),
                })

                const flashcardsRef = collection(FIREBASE_DB, 'flashcards')

                await addDoc(flashcardsRef, {
                    userId: user.uid,
                })
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
