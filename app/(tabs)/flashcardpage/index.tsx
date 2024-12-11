import FlashCardForm from '@/components/flashCardForm'
import FlashCardFront from '@/components/flashCardFront'
import FlashCard from '@/interfaces/flashCard'
import {
    ActivityIndicator,
    Button,
    FlatList,
    Pressable,
    Text,
    View,
} from 'react-native'
import styles from '../../../styles/flashCardPageStyles'
import Class from '@/interfaces/class'
import Subject from '@/interfaces/subject'
import { useFlashCardPage } from '@/hooks/useFlashCardPage'
import { Link } from 'expo-router'

export default function FlashcardPage() {
    const {
        showForm,
        toggleForm,
        handleFormSubmit,
        flashCards,
        fetchFlashCards,
        loading,
        formClasses,
    } = useFlashCardPage()

    const flashcardExample: FlashCard = {
        id: '123',
        question: 'What is ISO 27001?',
        answer: 'ISO 27001 is an international standard for information security management systems.',
        subject: 'ISO',
        class: 'IT Security',
    }

    // const subjectsExample: Subject[] = [
    //     { name: 'ISO', flashcards: [flashcardExample] },
    //     { name: 'Trees', flashcards: [flashcardExample] },
    //     { name: 'React native', flashcards: [flashcardExample] },
    // ]

    // const classesExample: Class[] = [
    //     { id: '123', name: 'IT Security', subjects: subjectsExample },
    //     { id: '1234', name: 'Datastructures', subjects: subjectsExample },
    //     { id: '1235', name: 'Mobile development', subjects: subjectsExample },
    // ]

    return (
        <>
            <View style={styles.container}>
                {!showForm ? (
                    <>
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={toggleForm}
                                title="Create flashcard"
                            />
                        </View>
                        <View>
                            <Link
                                href={{
                                    pathname:
                                        '/(tabs)/flashcardpage/listRenderer',
                                    params: { test: 'test123' },
                                }}
                                asChild
                            >
                                <Pressable>
                                    <Text style={styles.buttonWrapper}>
                                        See flashcards
                                    </Text>
                                </Pressable>
                            </Link>
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
