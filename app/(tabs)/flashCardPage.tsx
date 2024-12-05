import FlashCardForm from '@/components/flashCardForm'
import FlashCardFront from '@/components/flashCardFront'
import FlashCard from '@/interfaces/flashCard'
import { Button, StyleSheet, View } from 'react-native'
import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import styles from '../../styles/flashCardPageStyles'
import Class from '@/interfaces/class'
import Subject from '@/interfaces/subject'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'

export default function FlashCardPage() {
    const { showForm, toggleForm, handleFormSubmit, flashCards } =
        useFlashCardPage()

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

    return (
        <>
            <View style={styles.container}>
                {!showForm ? (
                    <>
                        {flashCards.map((crd) => (
                            <FlashCardFront key={crd.id} flashcard={crd} />
                        ))}

                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={toggleForm}
                                title="Create flashcard"
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
