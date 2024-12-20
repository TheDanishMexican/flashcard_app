import FlashCardFront from '@/components/flashCardFront'
import QuizFlashCard from '@/components/quizFlashcard'
import SuccessMessage from '@/components/successMessage'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import FlashCard from '@/interfaces/flashCard'
import styles from '@/styles/listStyles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

export default function QuizModePage() {
    const {
        loading,
        filteredFlashcards,
        filterFlashcards,
        fetchFlashCards,
        flashCards,
    } = useFlashCardPage()
    const [userInput, setUserInput] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [incorrectAnswer, setIncorrectAnswer] = useState(false)
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
    const router = useRouter()
    const { setName } = useLocalSearchParams() as { setName: string }

    useEffect(() => {
        fetchFlashCards()
    }, [])

    useEffect(() => {
        filterFlashcards(setName)
    }, [flashCards])

    function nextFlashcard() {
        setUserInput('')
        setCurrentFlashcardIndex(
            (prevIndex) => (prevIndex + 1) % filteredFlashcards.length
        )
    }

    function checkIfCorrect() {
        setUserInput('')
        if (
            filteredFlashcards[
                currentFlashcardIndex
            ].class.toLocaleUpperCase() === userInput.toLocaleUpperCase().trim()
        ) {
            console.log('you guessed it')
            setCorrectAnswer(true)
            setTimeout(() => {
                setCorrectAnswer(false)
            }, 1000)
            setIncorrectAnswer(false)
        } else {
            console.log('wrong guess')
            setIncorrectAnswer(true)
            setTimeout(() => {
                setIncorrectAnswer(false)
            }, 1000)
            setCorrectAnswer(false)
        }
    }

    return (
        <>
            <SafeAreaView style={stylesLocal.container}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={styles.buttonCtn}>
                            <View>
                                <Pressable onPress={() => router.back()}>
                                    <Text style={styles.button}>
                                        Back to flashcards
                                    </Text>
                                </Pressable>
                                <Pressable onPress={checkIfCorrect}>
                                    <Text style={styles.correctAnswerBtn}>
                                        Check if correct
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <Text style={styles.explanation}>
                            Welcome to the quiz mode. Below you see the
                            flashcard answer (back of the card) and you are
                            supposed to guess the what the correct "question" is
                            (front of the card).
                        </Text>
                        <View style={styles.line}></View>
                        <TextInput
                            style={styles.input}
                            placeholder="Write your guess here"
                            value={userInput}
                            onChangeText={setUserInput}
                        />
                        {filteredFlashcards.length > 0 && (
                            <View style={styles.listCnt}>
                                <QuizFlashCard
                                    flashcard={
                                        filteredFlashcards[
                                            currentFlashcardIndex
                                        ]
                                    }
                                />
                                <Pressable onPress={nextFlashcard}>
                                    <Text style={styles.button}>
                                        Next flashcard
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                        {correctAnswer && <SuccessMessage />}
                        {incorrectAnswer && (
                            <View
                                style={{
                                    backgroundColor: 'red',
                                    marginBottom: 50,
                                    padding: 10,
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Incorrect answer, try again
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </SafeAreaView>
        </>
    )
}

const stylesLocal = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'flex-start',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        margin: 10,
    },
})
