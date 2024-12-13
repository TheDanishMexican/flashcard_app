import FlashCardFront from '@/components/flashCardFront'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import FlashCard from '@/interfaces/flashCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default function listRenderer() {
    // const navigation = useNavigation()
    // const { test } = useLocalSearchParams()
    const { flashCards, fetchFlashCards, loading } = useFlashCardPage()

    return (
        <>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <FlatList
                        data={flashCards}
                        keyExtractor={(item: FlashCard) => item.id}
                        renderItem={({ item }) => (
                            <FlashCardFront flashcard={item} />
                        )}
                    />
                </View>
            )}
        </>
    )
}
