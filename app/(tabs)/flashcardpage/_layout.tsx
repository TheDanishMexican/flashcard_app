import React, { useCallback } from 'react'
import { Stack, useFocusEffect, useRouter } from 'expo-router'

export default function RootLayout() {
    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
            router.replace('/(tabs)/flashcardpage')
        }, [])
    )

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                    name="listRenderer"
                    options={{ headerShown: false, title: 'Flashcards' }}
                />
                <Stack.Screen
                    name="quizModePage"
                    options={{ headerShown: false, title: 'Flashcards' }}
                />
            </Stack>
        </>
    )
}
