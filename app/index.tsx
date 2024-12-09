import { ActivityIndicator, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Button } from 'react-native'
import { useLogin } from '@/hooks/useLogin'
import styles from '../styles/loginStyles'

export default function LoginPage() {
    const {
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
    } = useLogin()

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ marginTop: 100 }}>
                <View style={styles.usernameContainer}>
                    <TextInput
                        // secureTextEntry={!showUsername}
                        style={styles.input}
                        onChangeText={onChangeText}
                        placeholder="Write email here"
                        value={username}
                    />
                    {/* <MaterialCommunityIcons
                        name={showUsername ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        onPress={toggleShowUsername}
                    /> */}
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={password}
                        placeholder="Write password here"
                        // keyboardType="numeric"
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
                        <Button
                            title="Sign In"
                            onPress={() => signIn(username, password)}
                        />
                        <Button
                            title="Sign up"
                            onPress={() => signUp(username, password)}
                        />
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
