import FlashCard from '@/interfaces/flashCard'
import styles from '@/styles/flashCardFrontStyles'
import React from 'react'
import { Text, View } from 'react-native'

export default function QuizFlashCard({
    flashcard,
    showSolution,
}: {
    flashcard: FlashCard
    showSolution: boolean
}) {
    return (
        <>
            <View style={styles.card}>
                {!showSolution ? (
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'normal',
                            textAlign: 'center',
                            color: '#555',
                            lineHeight: 28,
                            maxWidth: '100%',
                            maxHeight: '100%',
                            padding: 10,
                        }}
                    >
                        {flashcard.answer}
                    </Text>
                ) : (
                    <>
                        <Text style={{ fontWeight: 'bold', color: 'green' }}>
                            Solution
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'normal',
                                textAlign: 'center',
                                color: '#555',
                                lineHeight: 28,
                                maxWidth: '100%',
                                maxHeight: '100%',
                                padding: 10,
                            }}
                        >
                            "{flashcard.question}"
                        </Text>
                    </>
                )}
            </View>
        </>
    )
}
