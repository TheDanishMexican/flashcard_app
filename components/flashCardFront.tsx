import FlashCard from '@/interfaces/flashCard'
import { Text, Pressable, View, Animated } from 'react-native'
import FlashCardBack from './flashCardBack'
import { useEffect, useRef, useState } from 'react'
import { useFlashCardFront } from '@/hooks/useFlashCardFront'
import styles from '../styles/flashCardFrontStyles'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function FlashCardFront({
    flashcard,
}: {
    flashcard: FlashCard
}) {
    const { toggleFlip, isFlipped, hasSubject, setHasSubject } =
        useFlashCardFront()

    const rotation = useRef(new Animated.Value(0)).current
    const isFlippeded = useRef(false)

    function toggleFloop() {
        const toValue = isFlippeded.current ? 0 : 1

        Animated.timing(rotation, {
            toValue,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            isFlippeded.current = !isFlippeded.current
        })

        toggleFlip()
    }

    const frontRotation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    })

    const backRotation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    })

    return (
        <>
            <Animated.View
                style={[
                    styles.card,
                    {
                        transform: [
                            { rotateY: frontRotation }, // Apply front rotation
                        ],
                    },
                ]}
            >
                <Text style={styles.questionText}>{flashcard.question}</Text>
                <Pressable
                    style={{
                        backgroundColor: '#87cefa',
                        padding: 5,
                        borderRadius: 10,
                        marginTop: 10,
                    }}
                    onPress={toggleFloop}
                >
                    <Text style={{ color: 'white' }}>Flip me</Text>
                </Pressable>
            </Animated.View>

            {isFlipped && (
                <Animated.View
                    style={[
                        styles.card,
                        {
                            transform: [
                                { rotateY: backRotation }, // Apply back rotation
                            ],
                            position: !isFlippeded.current
                                ? 'absolute'
                                : 'relative', // Show only when flipped
                        },
                    ]}
                >
                    <FlashCardBack
                        flashcard={flashcard}
                        toggleFloop={toggleFloop}
                    />
                </Animated.View>
            )}
        </>
    )
}
