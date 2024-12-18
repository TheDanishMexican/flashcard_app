import React from 'react'
import FlashCardForm from '@/components/flashCardForm'
import { Button, Pressable, Text, View } from 'react-native'
import styles from '../../../styles/flashCardPageStyles'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import { Link, useRouter } from 'expo-router'
import SuccessMessage from '@/components/successMessage'

export default function FlashcardPage() {
    const router = useRouter()

    return (
        <>
            <View style={styles.container}>
                <View style={styles.buttonCtn}>
                    <Pressable
                        onPress={() =>
                            router.push('/(tabs)/flashcardpage/setListRenderer')
                        }
                    >
                        <Text style={styles.button}>
                            See flashcard collections
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => console.log('ready to quiz?')}>
                        <Text style={styles.button}>Try quiz mode</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}
