import FlashCard from '@/interfaces/flashCard'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import FlashCardBack from './flashCardBack'
import { useState } from 'react'

export default function FlashCardFront({
    flashcard,
}: {
    flashcard: FlashCard
}) {
    const [isFlipped, setIsFlipped] = useState(false)

    function toggleFlip() {
        setIsFlipped((prev) => !prev)
    }

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

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    questionText: {
        fontSize: 22, // Larger text for visibility
        fontWeight: 'bold', // Bold for emphasis
        textAlign: 'center', // Center the text
        color: '#333', // Dark gray for contrast
        lineHeight: 28, // Space between lines for readability
    },
})
