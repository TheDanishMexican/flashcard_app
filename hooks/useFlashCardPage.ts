import FlashCard from '@/interfaces/flashCard'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'

export function useFlashCardPage() {
    const [showForm, setShowForm] = useState(false)
    const [flashCards, setFlashCards] = useState<FlashCard[]>([
        {
            id: '123',
            question: 'What is ISO 27001?',
            answer: 'ISO 27001 is an international standard for information security management systems.',
            subject: 'ISO',
            class: 'IT Security',
        },
        {
            id: '124',
            question: 'What is ISO 27001?',
            answer: 'ISO 27001 is an international standard for information security management systems.',
            subject: 'ISO',
            class: 'IT Security',
        },
    ])

    function toggleForm() {
        setShowForm((prev) => !prev)
    }

    useFocusEffect(
        useCallback(() => {
            setShowForm(false)
        }, [])
    )

    function handleFormSubmit(newFlashCard: FlashCard) {
        console.log(newFlashCard)
        setFlashCards((prevFlashCards) => [...prevFlashCards, newFlashCard])
        toggleForm()
    }

    return {
        toggleForm,
        useFocusEffect,
        showForm,
        handleFormSubmit,
        flashCards,
    }
}
