import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    Pressable,
} from 'react-native'
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
                <Text style={{ color: 'red', marginBottom: 10 }}>
                    {errors.firebaseError}
                </Text>
            )}
            {successMessage && <SuccessMessage />}
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
            <View style={styles.buttonCtn}>
                <Pressable
                    onPress={() => signUpBtnClicked(email, password, name)}
                >
                    <Text style={styles.button}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonCtn: {
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
    },
})
