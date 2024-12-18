import React, { useEffect, useState } from 'react'
import FlashCardFront from '@/components/flashCardFront'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import FlashCard from '@/interfaces/flashCard'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import styles from '@/styles/listStyles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import FlashCardForm from '@/components/flashCardForm'

export default function listRenderer() {
    const {
        flashCards,
        fetchFlashCards,
        loading,
        toggleForm,
        handleFormSubmit,
        formClasses,
        showForm,
        setLoading,
    } = useFlashCardPage()
    const [localFlashcards, setLocalFlashcards] = useState<FlashCard[]>([])

    const { setName } = useLocalSearchParams() as { setName: string }
    const router = useRouter()

    useEffect(() => {
        const filtered = flashCards.filter((crd) => crd.class === setName)
        setLocalFlashcards(filtered)
    }, [flashCards, setName])

    useEffect(() => {
        fetchFlashCards()
    }, [showForm])

    return (
        <SafeAreaView style={styles.container}>
            {showForm && (
                <FlashCardForm
                    classes={formClasses}
                    toggleForm={toggleForm}
                    handleFormSubmit={handleFormSubmit}
                    categoryName={setName}
                />
            )}
            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View style={styles.buttonCtn}>
                        <View>
                            <Pressable onPress={() => router.back()}>
                                <Text style={styles.button}>Go back</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable onPress={toggleForm}>
                                <Text style={styles.button}>
                                    Create new flashcard
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.titleCnt}>
                        <Text style={styles.title}>
                            "{setName}" - flashcards
                        </Text>
                    </View>
                    {!localFlashcards.length && (
                        <Text style={{ color: 'red' }}>
                            No flashcards in this collection, create one by
                            clicking "create new flashcard"
                        </Text>
                    )}
                    <View style={styles.listCnt}>
                        <FlatList
                            data={localFlashcards}
                            keyExtractor={(item: FlashCard) => item.id}
                            renderItem={({ item }) => (
                                <FlashCardFront flashcard={item} />
                            )}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}
