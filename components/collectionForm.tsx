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
import { useAuth } from '@/context/authContext'
import categoryFormProps from '@/interfaces/categoryFormProps'
import SuccessMessage from './successMessage'

export default function CollectionForm({
    toggleForm,
    classes,
    postNewCollection,
}: categoryFormProps) {
    const {
        handleInputChange,
        flashCard,
        collectionExists,
        emptyInput,
        validateInputCollectionForm,
        succesMessage,
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
                                Create new collection
                            </Text>
                            <Text>Collection name</Text>
                            {collectionExists && (
                                <Text style={{ color: 'red' }}>
                                    This collection name already exists
                                </Text>
                            )}
                            {emptyInput && (
                                <Text style={{ color: 'red' }}>
                                    Please fill out
                                </Text>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="Add a new collection"
                                value={flashCard.class}
                                onChangeText={(text) =>
                                    handleInputChange('class', text)
                                }
                            />
                        </View>

                        <Button
                            title="Create collection"
                            onPress={() => {
                                if (!validateInputCollectionForm(classes)) {
                                    return
                                }
                                postNewCollection(flashCard.class, user!.uid)

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
