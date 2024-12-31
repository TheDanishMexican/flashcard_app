import React from 'react'
import { useFlashCardForm } from '@/hooks/useFlashCardForm'
import {
    View,
    TextInput,
    Button,
    Text,
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
    handleFormSubmit,
    categoryName,
}: FlashCardFormProps) {
    const {
        handleInputChange,
        flashCard,
        errors,
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
                        </View>

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
