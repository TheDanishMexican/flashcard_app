import QuizFlashCard from '@/components/quizFlashcard'
import SuccessMessage from '@/components/successMessage'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import styles from '@/styles/listStyles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Keyboard,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
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
    const [showSolution, setShowSolution] = useState(false)
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
            ].question.toLocaleUpperCase() ===
            userInput.toLocaleUpperCase().trim()
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
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                                            Check guess
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Text style={styles.explanation}>
                                Welcome to the quiz mode.
                            </Text>
                            <View style={styles.line}></View>
                            <Text style={styles.explanation}>
                                Guess the "question" corresponding to the
                                "answer" below.
                            </Text>
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
                                        showSolution={showSolution}
                                    />

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            gap: 10,
                                        }}
                                    >
                                        {!showSolution ? (
                                            <Pressable
                                                onPress={() =>
                                                    setShowSolution(
                                                        (prev) => !prev
                                                    )
                                                }
                                            >
                                                <Text style={styles.button}>
                                                    Show solution
                                                </Text>
                                            </Pressable>
                                        ) : (
                                            <Pressable
                                                onPress={() =>
                                                    setShowSolution(
                                                        (prev) => !prev
                                                    )
                                                }
                                            >
                                                <Text style={styles.button}>
                                                    Hide solution
                                                </Text>
                                            </Pressable>
                                        )}
                                        {!showSolution && (
                                            <Pressable onPress={nextFlashcard}>
                                                <Text style={styles.button}>
                                                    Next flashcard
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            )}
                            {correctAnswer && (
                                <View style={{ position: 'absolute' }}>
                                    <SuccessMessage />
                                </View>
                            )}
                            {incorrectAnswer && (
                                <View
                                    style={{
                                        backgroundColor: 'red',
                                        padding: 10,
                                        position: 'absolute',
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
            </TouchableWithoutFeedback>
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
