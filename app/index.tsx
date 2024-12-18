import {
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    TextInput,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Button } from 'react-native'
import { useLogin } from '@/hooks/useLogin'
import styles from '../styles/loginStyles'
import { Link } from 'expo-router'
import SuccessMessage from '@/components/successMessage'

export default function LoginPage() {
    const {
        email,
        password,
        showPassword,
        toggleShowPassword,
        signIn,
        onChangeNumber,
        onChangeText,
        errors,
        loading,
        signInBtnClicked,
    } = useLogin()

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Login</Text>
            </View>
            {errors.errorsExist && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                    {errors.firebaseError}
                </Text>
            )}
            {loading && <ActivityIndicator style={{ marginBottom: 10 }} />}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 200,
                }}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder="Write email here"
                    value={email}
                />
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 200,
                }}
            >
                <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={password}
                    placeholder="Write password here"
                />
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#aaa"
                    onPress={toggleShowPassword}
                />
            </View>
            <View style={styles.buttonCtn}>
                <Pressable
                    style={styles.button}
                    onPress={() => signInBtnClicked(email, password)}
                >
                    <Text style={{ color: 'white' }}>Log in</Text>
                </Pressable>
                <Link
                    href={{
                        params: { emailParam: email },
                        pathname: '/signupPage',
                    }}
                    asChild
                >
                    <Pressable style={styles.button}>
                        <Text style={{ color: 'white' }}>Sign up</Text>
                    </Pressable>
                </Link>
            </View>
            <Image
                style={styles.logo}
                source={require('../assets/images/logo.webp')}
            />
        </View>
    )
}
