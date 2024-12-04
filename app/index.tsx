import { ActivityIndicator, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, View, Button } from 'react-native'
import { FirebaseError } from 'firebase/app'
import { FIREBASE_AUTH } from '@/firebase/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useRouter } from 'expo-router'
signInWithEmailAndPassword

export default function LoginPage() {
    const [username, onChangeText] = useState('')
    const [password, onChangeNumber] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showUsername, setShowUsername] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const auth = FIREBASE_AUTH

    const signUp = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
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

    const signIn = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(
                auth,
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

    function toggleShowPassword() {
        setShowPassword((prev) => !prev)
    }

    function toggleShowUsername() {
        setShowUsername((prev) => !prev)
    }

    function handleLogin() {
        console.log('Username:', username)
        console.log('Password:', password)
        onChangeText('')
        onChangeNumber('')
        // Later, this function will send data to Firebase
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ marginTop: 100 }}>
                <View style={styles.usernameContainer}>
                    <TextInput
                        secureTextEntry={!showUsername}
                        style={styles.input}
                        onChangeText={onChangeText}
                        placeholder="Write username here"
                        value={username}
                    />
                    <MaterialCommunityIcons
                        name={showUsername ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        onPress={toggleShowUsername}
                    />
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={password}
                        placeholder="Write password here"
                        keyboardType="numeric"
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        onPress={toggleShowPassword}
                    />
                </View>
                {loading ? (
                    <ActivityIndicator size={'small'} style={{ margin: 28 }} />
                ) : (
                    <View style={styles.buttons}>
                        <Button title="Sign In" onPress={signIn} />
                        <Button title="Sign up" onPress={signUp} />
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
    },
})
