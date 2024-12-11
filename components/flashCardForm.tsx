import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import { View, TextInput, Button, Text } from 'react-native'
import styles from '../styles/flashCardFormStyles'
import FlashCardFormProps from '@/interfaces/flashcardFormProps'
import { Picker } from '@react-native-picker/picker'
import Class from '@/interfaces/class'
import { useAuth } from '@/context/authContext'
import FlashCard from '@/interfaces/flashCard'
import Subject from '@/interfaces/subject'

export default function FlashCardForm({
    toggleForm,
    classes,
    handleFormSubmit,
}: FlashCardFormProps) {
    const {
        handleInputChange,
        flashCard,
        handleClassSelected,
        handleSubjectSelected,
        subjects,
        selectedClass,
    } = useFlashCardForm()
    const { user } = useAuth()
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a FlashCard</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Question"
                value={flashCard.question}
                onChangeText={(text) => handleInputChange('question', text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Answer"
                value={flashCard.answer}
                onChangeText={(text) => handleInputChange('answer', text)}
            />
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    onValueChange={(selectedClass: Class) =>
                        handleClassSelected(selectedClass)
                    }
                >
                    <Picker.Item
                        label="Select a class"
                        value={{
                            name: 'null',
                        }}
                    />
                    {classes.map((cls) => (
                        <Picker.Item
                            key={cls.name}
                            label={cls.name}
                            value={cls}
                        />
                    ))}
                </Picker>
            </View>

            {selectedClass && (
                <>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            onValueChange={(selectedSubject: string) => {
                                handleSubjectSelected(selectedSubject)
                            }}
                        >
                            <Picker.Item
                                label="Select a subject"
                                value={null}
                            />
                            {subjects?.map((subject) => (
                                <Picker.Item
                                    key={subject}
                                    label={subject}
                                    value={subject}
                                />
                            ))}
                        </Picker>
                    </View>
                    <Text>OR</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a new subject"
                        value={flashCard.answer}
                        onChangeText={(text) =>
                            handleInputChange('answer', text)
                        }
                    />
                </>
            )}

            <Button
                title="Create FlashCard"
                onPress={() => handleFormSubmit(flashCard, user!.uid)}
            />
            <Button title="Close" onPress={toggleForm} color="red" />
        </View>
    )
}
