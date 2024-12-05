import { FIREBASE_AUTH } from '@/firebase/firebase'
import { useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState } from 'react'

export function useLogin() {
    const [username, onChangeText] = useState('lollol@hotmail.com')
    const [password, onChangeNumber] = useState('abc123')
    const [showPassword, setShowPassword] = useState(false)
    const [showUsername, setShowUsername] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    function toggleShowPassword() {
        setShowPassword((prev) => !prev)
    }

    function toggleShowUsername() {
        setShowUsername((prev) => !prev)
    }

    async function signUp() {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                username,
                password
            )
            console.log(response)
            alert('check your emails')
        } catch (error: any) {
            const err = error as FirebaseError
            alert('Registration failed: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    async function signIn() {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                username,
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

    return {
        username,
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
    }
}
