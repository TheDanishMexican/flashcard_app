import React from 'react'
import FlashCardForm from '@/components/flashCardForm'
import { Button, Pressable, Text, View } from 'react-native'
import styles from '../../../styles/flashCardPageStyles'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import { Link, useRouter } from 'expo-router'
import SuccessMessage from '@/components/successMessage'

export default function FlashcardPage() {
    const {
        showForm,
        toggleForm,
        handleFormSubmit,
        flashCards,
        fetchFlashCards,
        loading,
        formClasses,
        postNewClassForFlashcard,
        postNewSubjectForClass,
        flashCardCreated,
        setFlashcardCreated,
    } = useFlashCardPage()
    const router = useRouter()

    return (
        <>
            <View style={styles.container}>
                {/* {flashCardCreated && <SuccessMessage />} */}
                {!showForm ? (
                    <>
                        <View style={styles.buttonCtn}>
                            <Pressable onPress={toggleForm}>
                                <Text style={styles.button}>
                                    Create flashcard
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.buttonCtn}>
                            <Pressable
                                onPress={() =>
                                    router.navigate(
                                        '/flashcardpage/listRenderer'
                                    )
                                }
                            >
                                <Text style={styles.button}>
                                    See flashcards
                                </Text>
                            </Pressable>
                        </View>
                    </>
                ) : (
                    <FlashCardForm
                        classes={formClasses}
                        toggleForm={toggleForm}
                        handleFormSubmit={handleFormSubmit}
                    />
                )}
            </View>
        </>
    )
}
