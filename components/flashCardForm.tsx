import React, { useState } from 'react'
import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import {
    View,
    TextInput,
    Button,
    Text,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
} from 'react-native'
import styles from '../styles/flashCardFormStyles'
import FlashCardFormProps from '@/interfaces/flashcardFormProps'

import { useAuth } from '@/context/authContext'

import SuccessMessage from './successMessage'

export default function FlashCardForm({
    toggleForm,
    classes,
    handleFormSubmit,
    categoryName,
}: FlashCardFormProps) {
    const {
        handleInputChange,
        flashCard,
        errors,
        setErrors,
        validateInput,
        succesMessage,
        setSuccessMessage,
    } = useFlashCardForm()
    const { user } = useAuth()

    return (
        <>
            <Modal>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <View>
                            {succesMessage && <SuccessMessage />}
                            <Text style={styles.title}>
                                Create new flashcard
                            </Text>
                            {/* <Pressable onPress={toggleModal}>
                                <FontAwesome
                                    style={{ textAlign: 'center' }}
                                    name="info-circle"
                                    size={34}
                                />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: 10,
                                    }}
                                >
                                    Click me
                                </Text>
                            </Pressable> */}
                        </View>

                        {/* {modalVisible && (
                            <ExplainText toggleModal={toggleModal} />
                        )} */}

                        {errors.question === '' ? (
                            <>
                                <Text>Question</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Question"
                                    value={flashCard.question}
                                    multiline={true}
                                    onChangeText={(text) =>
                                        handleInputChange('question', text)
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <Text style={{ color: 'red' }}>
                                    Please fill out
                                </Text>
                                <Text>Question</Text>
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
                            <>
                                <Text>Answer</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Answer"
                                    value={flashCard.answer}
                                    multiline={true}
                                    onChangeText={(text) =>
                                        handleInputChange('answer', text)
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <Text style={{ color: 'red' }}>
                                    Please fill out
                                </Text>
                                <Text>Answer</Text>
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
                        {/* {errors.class === '' ? (
                            <>
                                <Text>Category</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        itemStyle={{ height: 50 }}
                                        style={styles.picker}
                                        onValueChange={(selectedClass: Class) =>
                                            handleClassSelected(selectedClass)
                                        }
                                    >
                                        <Picker.Item
                                            label="Select a category"
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
                        ) : (
                            <>
                                <Text style={{ color: 'red' }}>
                                    Please select or fill out
                                </Text>
                                <Text>Category</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        style={styles.picker}
                                        onValueChange={(selectedClass: Class) =>
                                            handleClassSelected(selectedClass)
                                        }
                                    >
                                        <Picker.Item
                                            label="Select a category"
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
                                    placeholder="Add a new category"
                                    value={flashCard.class}
                                    onChangeText={(text) =>
                                        handleInputChange('class', text)
                                    }
                                />
                            </>
                        )} */}

                        {/* {selectedClass && (
                        <>
                            <Text>Subject</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={subjectSelected || undefined}
                                    onValueChange={(
                                        selectedSubject: string
                                    ) => {
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
                            {/*trouble shooting on ios */}

                        {/* {!subjectSelected && (
                                <>
                                    <Text>OR</Text>
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
                    )} */}

                        <Button
                            title="Create FlashCard"
                            onPress={() => {
                                if (validateInput()) {
                                    return
                                }
                                flashCard.class = categoryName
                                handleFormSubmit(flashCard, user!.uid)
                                setSuccessMessage(true)
                                setTimeout(() => {
                                    toggleForm()
                                }, 2000)
                            }}
                        />
                        <Button
                            title="Close"
                            onPress={toggleForm}
                            color="red"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}
