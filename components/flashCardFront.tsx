import FlashCard from '@/interfaces/flashCard'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import FlashCardBack from './flashCardBack'
import { useState } from 'react'
import { useFlashCardFront } from '@/hooks/useFlashCardFront'
import styles from '../styles/flashCardFrontStyles'

export default function FlashCardFront({
    flashcard,
}: {
    flashcard: FlashCard
}) {
    const { toggleFlip, isFlipped } = useFlashCardFront()

    return (
        <>
            {!isFlipped ? (
                <Pressable onPress={toggleFlip} style={styles.card}>
                    <Text style={styles.questionText}>
                        {flashcard.question}
                    </Text>
                </Pressable>
            ) : (
                <Pressable onPress={toggleFlip}>
                    <FlashCardBack flashcard={flashcard} />
                </Pressable>
            )}
        </>
    )
}
