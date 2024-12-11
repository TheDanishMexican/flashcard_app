import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import { View, TextInput, Button, Text } from 'react-native'
import styles from '../styles/flashCardFormStyles'
import FlashCardFormProps from '@/interfaces/flashcardFormProps'
import { Picker } from '@react-native-picker/picker'
import Class from '@/interfaces/class'
import { useAuth } from '@/context/authContext'
import FlashCard from '@/interfaces/flashCard'

export default function FlashCardForm({
    toggleForm,
    classes,
    handleFormSubmit,
    postNewClassForFlashcard,
    postNewSubjectForClass,
}: FlashCardFormProps) {
    const {
        handleInputChange,
        flashCard,
        handleClassSelected,
        handleSubjectSelected,
        selectedClass,
        subjectSelected,
    } = useFlashCardForm()
    const { user } = useAuth()

    function testInput(input: FlashCard) {
        if (!classes.some((cls) => cls.name === input.class)) {
            console.log(
                'this is a new class that should be created with an empty subject array'
            )
        } else if (
            !selectedClass?.subjects.some((sub) => sub === input.subject)
        ) {
            console.log(
                'this is a new subject to be added to this class: ',
                selectedClass
            )
        }
    }

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
                            key={cls.id}
                            label={cls.name}
                            value={cls}
                        />
                    ))}
                </Picker>
            </View>
            {!selectedClass && (
                <>
                    <Text>OR</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a new class"
                        value={flashCard.class}
                        onChangeText={(text) =>
                            handleInputChange('class', text)
                        }
                    />
                </>
            )}

            {selectedClass && (
                <>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={subjectSelected || undefined}
                            onValueChange={(selectedSubject: string) => {
                                handleSubjectSelected(selectedSubject)
                            }}
                        >
                            <Picker.Item
                                label="Select a subject"
                                value={'null'}
                            />
                            {selectedClass.subjects?.map((subject) => (
                                <Picker.Item
                                    key={subject}
                                    label={subject}
                                    value={subject}
                                />
                            ))}
                        </Picker>
                    </View>
                    {!subjectSelected && (
                        <>
                            {selectedClass.subjects.length ? (
                                <Text>OR</Text>
                            ) : (
                                <Text style={{ color: 'red' }}>
                                    Class has no subjects
                                </Text>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="Add a new subject"
                                value={flashCard.subject}
                                onChangeText={(text) =>
                                    handleInputChange('subject', text)
                                }
                            />
                        </>
                    )}
                </>
            )}

            <Button
                title="Create FlashCard"
                // onPress={() => handleFormSubmit(flashCard, user!.uid)}
                // onPress={() =>
                //     postNewClassForFlashcard(flashCard.class, user!.uid)
                // }
                onPress={() =>
                    postNewSubjectForClass(
                        flashCard.subject,
                        flashCard.class,
                        user!.uid
                    )
                }
            />
            <Button title="Close" onPress={toggleForm} color="red" />
        </View>
    )
}
