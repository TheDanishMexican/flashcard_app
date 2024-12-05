import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import { View, TextInput, Button, Text } from 'react-native'
import styles from '../styles/flashCardFormStyles'
import FlashCardFormProps from '@/interfaces/flashcardFormProps'
import { Picker } from '@react-native-picker/picker'
import Class from '@/interfaces/class'

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
        handleSubmit,
    } = useFlashCardForm()

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
                    placeholder="Select a class"
                    onValueChange={(selectedClass: Class) =>
                        handleClassSelected(selectedClass)
                    }
                >
                    <Picker.Item label="Select a class" value={null} />
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
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        onValueChange={(selectedSubject: string) =>
                            handleSubjectSelected(selectedSubject)
                        }
                    >
                        <Picker.Item label="Select a subject" value={null} />
                        {subjects?.map((subject) => (
                            <Picker.Item
                                key={subject}
                                label={subject}
                                value={subject}
                            />
                        ))}
                    </Picker>
                </View>
            )}

            <Button
                title="Create FlashCard"
                onPress={() => handleFormSubmit(flashCard)}
            />
            <Button title="Close" onPress={toggleForm} color="red" />
        </View>
    )
}
