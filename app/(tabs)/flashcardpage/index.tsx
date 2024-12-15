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

    return (
        <>
            <View style={styles.container}>
                {flashCardCreated && <SuccessMessage />}
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
