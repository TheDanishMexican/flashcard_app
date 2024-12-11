import FlashCardFront from '@/components/flashCardFront'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import FlashCard from '@/interfaces/flashCard'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default function listRenderer() {
    const { test } = useLocalSearchParams()
    const { flashCards, fetchFlashCards, loading } = useFlashCardPage()

    useEffect(() => {
        fetchFlashCards()
    }, [])

    console.log(flashCards)

    return (
        <>
            {/* {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={flashCards}
                        keyExtractor={(item: FlashCard) => item.id}
                        renderItem={({ item }: { item: FlashCard }) => (
                            <View style={styles.card}>
                                <Text style={styles.question}>
                                    {item.question}
                                </Text>
                                <Text style={styles.answer}>{item.answer}</Text>
                            </View>
                        )}
                    />
                </View>
            )} */}
            <View>
                <FlatList
                    data={flashCards}
                    keyExtractor={(item: FlashCard) => item.id}
                    renderItem={({ item }) => (
                        <FlashCardFront flashcard={item} />
                    )}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    answer: {
        fontSize: 16,
        marginTop: 8,
    },
})
