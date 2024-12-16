import React, { useState } from 'react'
import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import { View, TextInput, Button, Text, Pressable } from 'react-native'
import styles from '../styles/flashCardFormStyles'
import FlashCardFormProps from '@/interfaces/flashcardFormProps'
import { Picker } from '@react-native-picker/picker'
import Class from '@/interfaces/class'
import { useAuth } from '@/context/authContext'
import { FontAwesome } from '@expo/vector-icons'
import ExplainText from './explainText'

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
        selectedClass,
        subjectSelected,
        errors,
        setErrors,
        validateInput,
    } = useFlashCardForm()
    const { user } = useAuth()
    const [modalVisible, setModalVisible] = useState(true)
    function toggleModal() {
        setModalVisible((prev) => !prev)
    }

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Create a flashcard</Text>
                    <Pressable onPress={toggleModal}>
                        <FontAwesome
                            style={{ textAlign: 'center', marginBottom: 10 }}
                            name="info-circle"
                            size={34}
                        />
                    </Pressable>
                </View>

                {modalVisible && <ExplainText toggleModal={toggleModal} />}

                {errors.question === '' ? (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Question"
                        value={flashCard.question}
                        multiline={true}
                        onChangeText={(text) =>
                            handleInputChange('question', text)
                        }
                    />
                ) : (
                    <>
                        <Text style={{ color: 'red' }}>Please fill out</Text>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            placeholder="Enter Question"
                            value={flashCard.question}
                            onChangeText={(text) =>
                                handleInputChange('question', text)
                            }
                        />
                    </>
                )}

                {errors.answer === '' ? (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Answer"
                        value={flashCard.answer}
                        multiline={true}
                        onChangeText={(text) =>
                            handleInputChange('answer', text)
                        }
                    />
                ) : (
                    <>
                        <Text style={{ color: 'red' }}>Please fill out</Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Answer"
                                value={flashCard.answer}
                                multiline={true}
                                onChangeText={(text) =>
                                    handleInputChange('answer', text)
                                }
                            />
                        </View>
                    </>
                )}
                {errors.class === '' ? (
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
                ) : (
                    <>
                        <Text style={{ color: 'red' }}>
                            Please select or fill out
                        </Text>
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
                    </>
                )}
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
                                        key={subject.name}
                                        label={subject.name}
                                        value={subject.name}
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
                    onPress={() => {
                        if (validateInput()) {
                            return
                        }
                        handleFormSubmit(flashCard, user!.uid)
                    }}
                />
                <Button title="Close" onPress={toggleForm} color="red" />
            </View>
        </>
    )
}
