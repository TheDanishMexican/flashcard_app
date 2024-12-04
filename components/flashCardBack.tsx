import FlashCard from '@/interfaces/flashCard'
import { View, Text, StyleSheet } from 'react-native'

export default function FlashCardBack({ flashcard }: { flashcard: FlashCard }) {
    return (
        <>
            <View style={styles.card}>
                <Text style={styles.answerText}>{flashcard.answer}</Text>
            </View>
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
    answerText: {
        fontSize: 18, // Slightly smaller font size for the answer
        fontWeight: 'normal', // Regular weight for answer
        textAlign: 'center', // Center the answer text
        color: '#555', // Slightly lighter color for the answer
        lineHeight: 24, // Line height for better readability
    },
})
