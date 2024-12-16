import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                    name="listRenderer"
                    options={{ headerShown: false, title: 'Flashcards' }}
                />
            </Stack>
        </>
    )
}
