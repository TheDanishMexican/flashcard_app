import { useAuth } from '@/context/authContext'
import { collectionRef, FIREBASE_DB } from '@/firebase/firebase'
import FlashCard from '@/interfaces/flashCard'
import { useFocusEffect } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useState } from 'react'

export function useFlashCardPage() {
    const { user } = useAuth()
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

    //remember to set a type on the flashcards later
    async function getFlashCards() {
        try {
            const q = query(
                collection(FIREBASE_DB, 'flashcards'),
                where('userId', '==', user?.uid) // Query flashcards for the specific user
            )
            const querySnapshot = await getDocs(q)
            const flashcardsArr: any[] = []

            querySnapshot.forEach((doc) => {
                const data = doc.data()
                const flashCard = { ...data, id: doc.id }
                flashcardsArr.push(flashCard)
            })

            return flashcardsArr
        } catch (error) {
            console.log('Error while getting flashcard from database: ', error)
        }
    }

    async function getUserFlashCards(userId: string) {}

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
        getFlashCards,
    }
}
