import FlashCardForm from '@/components/flashCardForm'
import FlashCardFront from '@/components/flashCardFront'
import FlashCard from '@/interfaces/flashCard'
import { useEffect, useState, useCallback } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

export default function FlashCardPage() {
    const [showForm, setShowForm] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setShowForm(false)
        }, [])
    )

    function toggleForm() {
        setShowForm((prev) => !prev)
    }

    const example: FlashCard = {
        id: '123',
        question: 'What is ISO 27001?',
        answer: 'ISO 27001 is an international standard for information security management systems.',
        subject: 'Information Security',
        class: 'IT Governance',
    }
    return (
        <>
            <View style={styles.container}>
                {!showForm ? (
                    <>
                        <FlashCardFront flashcard={example} />
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={toggleForm}
                                title="Create flashcard"
                            />
                        </View>
                    </>
                ) : (
                    <FlashCardForm />
                )}
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonWrapper: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 40,
        borderRadius: 5,
        overflow: 'hidden', // To make the button look rounded
    },
})
