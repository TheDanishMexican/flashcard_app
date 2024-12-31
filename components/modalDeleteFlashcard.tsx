import { useAuth } from '@/context/authContext'
import ModaelDeleteFlashcardsProps from '@/interfaces/modalDeleteFlashcardsProps'
import React, { useState } from 'react'
import { Modal, Text, View, StyleSheet, Pressable } from 'react-native'

export default function ModalDeleteFlashcard({
    modalText,
    toggleModal,
    clickedDelete,
    flashcardId,
}: ModaelDeleteFlashcardsProps) {
    const { user } = useAuth()
    const [deleteMessage, setDeleteMessage] = useState(false)
    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        Are you sure you want to delete the flashcard:
                    </Text>
                    <Text style={styles.collectionName}>"{modalText}"</Text>
                    <View style={styles.buttonCnt}>
                        <Pressable
                            style={styles.buttonCancel}
                            onPress={() => toggleModal('')}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonDelete}
                            onPress={() => {
                                clickedDelete(flashcardId)
                                setDeleteMessage(true)
                            }}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </Pressable>
                    </View>
                    {deleteMessage && (
                        <View
                            style={{ backgroundColor: 'green', marginTop: 10 }}
                        >
                            <Text style={{ color: 'white' }}>
                                Deleted "{modalText}"" succesfully
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff0f5',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonCnt: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    buttonCancel: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDelete: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        maxWidth: 250,
        minWidth: 250,
    },
    collectionName: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 20,
    },
})
