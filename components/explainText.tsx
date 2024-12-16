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
                        {'\n'}1. Fill out the question. {'\n'}
                        {'\n'}2. Fill out the answer. {'\n'}
                        {'\n'}3. You have to select a category for the
                        flashcard, you can select from the predefined categories
                        or add a new one. {'\n'}
                        {'\n'}4. You have the choice to add a subject for
                        further filtering when you study the flashcards, but you
                        do not have to.
                    </Text>
                    <View>
                        <Pressable style={styles.button} onPress={toggleModal}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
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
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
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
})
