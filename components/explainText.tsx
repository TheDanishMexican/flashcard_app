import React from 'react'
import { Modal, Text, View, StyleSheet, Pressable } from 'react-native'

export default function ExplainText({
    toggleModal,
}: {
    toggleModal: () => void
}) {
    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        The idea is that you create a flashcard by filling out
                        the question first. Then you fill out the corresponding
                        answer afterwards. You have to select a "class" for the
                        subject. This is meant to be for filtering purposes,
                        when you later want to study the flashcards. You can
                        also add a subject within the class if you want to be
                        able to filter further.
                    </Text>
                    <Pressable style={styles.button} onPress={toggleModal}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
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
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
