import FlashCard from '@/interfaces/flashCard'
import { View, Text } from 'react-native'
import styles from '../styles/flashCardBackStyles'

export default function FlashCardBack({ flashcard }: { flashcard: FlashCard }) {
    return (
        <>
            <View style={styles.card}>
                <Text style={styles.answerText}>{flashcard.answer}</Text>
            </View>
        </>
    )
}
