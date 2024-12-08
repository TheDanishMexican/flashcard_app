import FlashCardForm from '@/components/flashCardForm'
import FlashCardFront from '@/components/flashCardFront'
import FlashCard from '@/interfaces/flashCard'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import styles from '../../styles/flashCardPageStyles'
import Class from '@/interfaces/class'
import Subject from '@/interfaces/subject'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import { useState } from 'react'

export default function FlashCardPage() {
    const {
        showForm,
        toggleForm,
        handleFormSubmit,
        flashCards,
        getFlashCards,
    } = useFlashCardPage()

    const [loading, setLoading] = useState(false)
    const [tests, setTests] = useState<any[]>([])

    const flashcardExample: FlashCard = {
        id: '123',
        question: 'What is ISO 27001?',
        answer: 'ISO 27001 is an international standard for information security management systems.',
        subject: 'ISO',
        class: 'IT Security',
    }

    const subjectsExample: Subject[] = [
        { name: 'ISO', flashcards: [flashcardExample] },
        { name: 'Trees', flashcards: [flashcardExample] },
        { name: 'React native', flashcards: [flashcardExample] },
    ]

    const classesExample: Class[] = [
        { name: 'IT Security', subjects: subjectsExample },
        { name: 'Datastructures', subjects: subjectsExample },
        { name: 'Mobile development', subjects: subjectsExample },
    ]

    async function fetchFlashCards() {
        setLoading(true)
        // await new Promise((resolve) => setTimeout(resolve, 500))
        const data: any = await getFlashCards()
        setTests(data)
        setLoading(false)
    }

    return (
        <>
            <View style={styles.container}>
                {!showForm ? (
                    <>
                        {/*USE A FLATMAP FOR THE FLASHCARDS*/}

                        {loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            <FlatList
                                data={tests}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <FlashCardFront flashcard={item} />
                                )}
                            />
                        )}

                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={toggleForm}
                                title="Create flashcard"
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={fetchFlashCards}
                                title="See flashcards"
                            />
                        </View>
                    </>
                ) : (
                    <FlashCardForm
                        classes={classesExample}
                        toggleForm={toggleForm}
                        handleFormSubmit={handleFormSubmit}
                    />
                )}
            </View>
        </>
    )
}
