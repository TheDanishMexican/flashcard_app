import { AuthProvider, useAuth } from '@/context/authContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

export default function RootLayout() {
    return (
        <>
            <AuthProvider>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                </Stack>
                <StatusBar style="auto" />
            </AuthProvider>
        </>
    )
}
