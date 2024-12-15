import { useAuth } from '@/context/authContext'
import signUpErrors from '@/interfaces/signUpErrors'
import { useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

export function useLogin() {
    const { signIn, signUp } = useAuth()
    const [email, onChangeText] = useState('lollol@hotmail.com')
    const [password, onChangeNumber] = useState('abc123')
    const [showPassword, setShowPassword] = useState(false)
    const [showUsername, setShowUsername] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<signUpErrors>({
        firebaseError: '',
        errorsExist: false,
    })

    function toggleShowPassword() {
        setShowPassword((prev) => !prev)
    }

    function toggleShowUsername() {
        setShowUsername((prev) => !prev)
    }

    async function signInBtnClicked(email: string, password: string) {
        setErrors((prev) => ({
            ...prev,
            errorsExist: false,
        }))

        try {
            setLoading(true)
            await signIn(email, password)
        } catch (error) {
            handleError(error as FirebaseError)
            console.log('error in signin: ', error)
            setLoading(false)
        }
    }

    function handleError(errorCurr: FirebaseError) {
        let errorsHere: signUpErrors = {
            firebaseError: '',
            errorsExist: true,
        }

        switch (errorCurr.code) {
            case 'auth/invalid-email':
                errorsHere.firebaseError = 'invalid email, sign up'
                break
            case 'auth/missing-password':
                errorsHere.firebaseError = 'missing password'
                break
            case 'auth/invalid-credential':
                errorsHere.firebaseError =
                    'email or password invalid, try again'
                break
            case 'auth/missing-name': // Custom error code
                errorsHere.firebaseError = 'Name should be filled out'
                break
            default:
                errorsHere.firebaseError = 'An unexpected error occurred'
        }

        setErrors(errorsHere)
    }

    return {
        email,
        password,
        showPassword,
        showUsername,
        loading,
        router,
        toggleShowPassword,
        toggleShowUsername,
        signIn,
        signUp,
        onChangeNumber,
        onChangeText,
        errors,
        signInBtnClicked,
        setLoading,
    }
}
