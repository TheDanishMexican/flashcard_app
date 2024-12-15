import { useAuth } from '@/context/authContext'
import signUpErrors from '@/interfaces/signUpErrors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

export function useSignUp() {
    const router = useRouter()
    const { signUp } = useAuth()
    const { emailParam } = useLocalSearchParams() as { emailParam: string }
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState(emailParam)
    const [successMessage, setSuccesMessage] = useState(false)
    const [errors, setErrors] = useState<signUpErrors>({
        firebaseError: '',
        errorsExist: false,
    })
    async function signUpBtnClicked(
        email: string,
        password: string,
        name: string
    ) {
        try {
            if (name === '') {
                throw {
                    name: 'FirebaseError',
                    code: 'auth/missing-name',
                    message: 'Name should be filled out',
                } as FirebaseError
            }
            await signUp(email, password, name)

            setSuccesMessage(true)
            setTimeout(() => {
                router.replace('/')
            }, 1000)
        } catch (error) {
            handleError(error as FirebaseError)

            // console.log('Error while signing up: ', error)
        }
    }

    function handleError(errorCurr: FirebaseError) {
        let errorsHere: signUpErrors = {
            firebaseError: '',
            errorsExist: true,
        }

        switch (errorCurr.code) {
            case 'auth/missing-password':
                errorsHere.firebaseError = 'Please fill out password'
                break
            case 'auth/email-already-in-use':
                errorsHere.firebaseError = 'Email already in use'
                break
            case 'auth/weak-password':
                errorsHere.firebaseError =
                    'Password should be at least 6 characters'
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
        signUpBtnClicked,
        handleError,
        emailParam,
        name,
        setName,
        password,
        setPassword,
        email,
        setEmail,
        errors,
        setErrors,
        successMessage,
    }
}
