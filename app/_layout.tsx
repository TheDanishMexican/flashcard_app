import React from 'react'
import { AuthProvider } from '@/context/authContext'
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
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: true, title: 'Flashcard app' }}
                    />
                    <Stack.Screen
                        name="signupPage"
                        options={{
                            headerShown: true,
                            title: '',
                            headerStyle: '',
                        }}
                    />
                </Stack>
                <StatusBar style="auto" />
            </AuthProvider>
        </>
    )
}
