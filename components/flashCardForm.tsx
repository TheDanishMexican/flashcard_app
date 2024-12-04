import FlashCard from '@/interfaces/flashCard'
import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'

export default function FlashCardForm() {
    const [flashCard, setFlashCard] = useState<FlashCard>({
        id: '',
        question: '',
        answer: '',
        subject: '',
        class: '',
    })

    function handleInputChange(name: string, value: string) {
        setFlashCard((prevCard) => ({
            ...prevCard,
            [name]: value,
        }))
    }

    function handleSubmit() {
        console.log('FlashCard Created:', flashCard)
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

            <TextInput
                style={styles.input}
                placeholder="Enter Subject"
                value={flashCard.subject}
                onChangeText={(text) => handleInputChange('subject', text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Class"
                value={flashCard.class}
                onChangeText={(text) => handleInputChange('class', text)}
            />

            <Button title="Create FlashCard" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
    },
})
