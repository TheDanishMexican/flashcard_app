import FlashCard from '@/interfaces/flashCard'
import { Text, Pressable, Animated } from 'react-native'
import FlashCardBack from './flashCardBack'
import { useRef } from 'react'
import { useFlashCardFront } from '@/hooks/useFlashCardFront'
import styles from '../styles/flashCardFrontStyles'
import React from 'react'
import { useModal } from '@/hooks/useModal'
import ModalDeleteFlashcard from './modalDeleteFlashcard'

//EXPLAIN HOW TO ANIMATION WORKS

export default function FlashCardFront({
    flashcard,
    clickedDelete,
}: {
    flashcard: FlashCard
    clickedDelete: (id: string) => void
}) {
    const { toggleFlip, isFlipped } = useFlashCardFront()
    const { toggleModal, modalVisible } = useModal()

    const rotation = useRef(new Animated.Value(0)).current
    const isFlippeded = useRef(false)

    function toggleFloop() {
        const toValue = isFlippeded.current ? 0 : 1

        Animated.timing(rotation, {
            toValue,
            duration: 200,
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
                        transform: [{ rotateY: frontRotation }],
                    },
                ]}
            >
                {modalVisible && (
                    <ModalDeleteFlashcard
                        toggleModal={toggleModal}
                        modalText={flashcard.question}
                        clickedDelete={clickedDelete}
                        flashcardId={flashcard.id}
                    />
                )}
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => {
                        toggleModal(flashcard.question)
                    }}
                >
                    <Text style={styles.deleteButtonText}>X</Text>
                </Pressable>
                <Text style={styles.questionText}>{flashcard.question}</Text>
                <Pressable style={styles.flipButton} onPress={toggleFloop}>
                    <Text style={styles.flipButtonText}>See answer</Text>
                </Pressable>
            </Animated.View>

            {isFlipped && (
                <Animated.View
                    style={[
                        styles.card,
                        {
                            transform: [{ rotateY: backRotation }],
                            position: !isFlippeded.current
                                ? 'absolute'
                                : 'relative',
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
