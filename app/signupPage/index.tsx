import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import SuccessMessage from '@/components/successMessage'
import { useSignUp } from '@/hooks/useSignUp'

export default function SignupPage() {
    const {
        signUpBtnClicked,
        name,
        setName,
        password,
        setPassword,
        email,
        setEmail,
        successMessage,
        errors,
    } = useSignUp()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            {errors.errorsExist && (
                <Text style={{ color: 'red' }}>{errors.firebaseError}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Sign Up"
                onPress={() => signUpBtnClicked(email, password, name)}
            />
            {successMessage && <SuccessMessage />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 4,
    },
})
