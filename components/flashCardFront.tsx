import FlashCard from '@/interfaces/flashCard'
import { Text, Pressable } from 'react-native'
import FlashCardBack from './flashCardBack'
import { useEffect, useState } from 'react'
import { useFlashCardFront } from '@/hooks/useFlashCardFront'
import styles from '../styles/flashCardFrontStyles'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function FlashCardFront({
    flashcard,
}: {
    flashcard: FlashCard
}) {
    const { toggleFlip, isFlipped, hasSubject, setHasSubject } =
        useFlashCardFront()

    return (
        <>
            {!isFlipped ? (
                <Pressable onPress={toggleFlip} style={styles.card}>
                    <Text style={styles.questionText}>
                        {flashcard.question}
                    </Text>
                    <FontAwesome
                        style={{ textAlign: 'center' }}
                        name="info-circle"
                        size={34}
                    />
                </Pressable>
            ) : (
                <Pressable onPress={toggleFlip}>
                    <FlashCardBack flashcard={flashcard} />
                </Pressable>
            )}
        </>
    )
}
