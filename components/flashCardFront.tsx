import FlashCard from '@/interfaces/flashCard'
import { Text, Pressable } from 'react-native'
import FlashCardBack from './flashCardBack'
import { useEffect, useState } from 'react'
import { useFlashCardFront } from '@/hooks/useFlashCardFront'
import styles from '../styles/flashCardFrontStyles'

export default function FlashCardFront({
    flashcard,
}: {
    flashcard: FlashCard
}) {
    const { toggleFlip, isFlipped, hasSubject, setHasSubject } =
        useFlashCardFront()

    useEffect(() => {
        flashcard.subject != '' ? setHasSubject(true) : setHasSubject(false)
    }, [])

    return (
        <>
            {!isFlipped ? (
                <Pressable onPress={toggleFlip} style={styles.card}>
                    <Text style={styles.questionText}>
                        {flashcard.question}
                    </Text>
                    {!hasSubject && (
                        <Text style={{ color: 'red' }}>Add subject</Text>
                    )}
                </Pressable>
            ) : (
                <Pressable onPress={toggleFlip}>
                    <FlashCardBack flashcard={flashcard} />
                </Pressable>
            )}
        </>
    )
}
