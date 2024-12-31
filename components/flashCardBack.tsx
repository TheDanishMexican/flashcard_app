import FlashCard from '@/interfaces/flashCard'
import { Text, Pressable } from 'react-native'
import styles from '../styles/flashCardBackStyles'
import React from 'react'

export default function FlashCardBack({
    flashcard,
    toggleFloop,
}: {
    flashcard: FlashCard
    toggleFloop: () => void
}) {
    return (
        <>
            <Text style={styles.answerText}>{flashcard.answer}</Text>
            <Pressable
                style={{
                    backgroundColor: '#87cefa',
                    padding: 5,
                    borderRadius: 10,
                    marginTop: 10,
                }}
                onPress={toggleFloop}
            >
                <Text style={{ color: 'white' }}>See question</Text>
            </Pressable>
        </>
    )
}
