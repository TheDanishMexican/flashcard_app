import { useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export function useLogin() {
    const { signIn, signUp, loading } = useAuth()
    const [username, onChangeText] = useState('lollol@hotmail.com')
    const [password, onChangeNumber] = useState('abc123')
    const [showPassword, setShowPassword] = useState(false)
    const [showUsername, setShowUsername] = useState(false)
    const router = useRouter()

    // function assignFlashCardsToUser

    function toggleShowPassword() {
        setShowPassword((prev) => !prev)
    }

    function toggleShowUsername() {
        setShowUsername((prev) => !prev)
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
