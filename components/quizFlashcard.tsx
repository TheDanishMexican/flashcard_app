import FlashCard from '@/interfaces/flashCard'
import styles from '@/styles/flashCardFrontStyles'
import React from 'react'
import { Text, View } from 'react-native'

export default function QuizFlashCard({ flashcard }: { flashcard: FlashCard }) {
    return (
        <>
            <View style={styles.card}>
                <Text>{flashcard.answer}</Text>
            </View>
        </>
    )
}
