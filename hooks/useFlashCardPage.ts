import { useAuth } from '@/context/authContext'
import { flashcardsRef, FIREBASE_DB } from '@/firebase/firebase'
import Class from '@/interfaces/class'
import FlashCard from '@/interfaces/flashCard'
import { useFocusEffect } from 'expo-router'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

export function useFlashCardPage() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [flashCards, setFlashCards] = useState<FlashCard[]>([])
    const [formClasses, setFormClasses] = useState<Class[]>([])

    async function fetchFlashCards() {
        setLoading(true)
        //apparently data could be undefined or empty arr even though I have error handling so I need the conditional for typescript to be happy
        const data: FlashCard[] = (await getFlashCards()) || []
        setFlashCards(data)
        setLoading(false)
    }

    async function getFlashCards() {
        try {
            const q = query(
                collection(FIREBASE_DB, 'flashcards'),
                where('userId', '==', user?.uid)
            )
            const querySnapshot = await getDocs(q)
            const flashcardsArr: FlashCard[] = []

            querySnapshot.forEach((doc) => {
                const data = doc.data() as FlashCard
                const flashCard: FlashCard = { ...data, id: doc.id }
                flashcardsArr.push(flashCard)
            })

            return flashcardsArr
        } catch (error) {
            console.log('Error while getting flashcard from database: ', error)
        }
    }

    async function fetchFormClasses() {
        setLoading(true)
        const data: Class[] = (await getFormClasses()) || []
        setFormClasses(data)
        setLoading(false)
    }

    useEffect(() => {
        async function loadClasses() {
            await fetchFormClasses()
        }

        loadClasses()
    }, [])

    async function getFormClasses() {
        try {
            const q = query(collection(FIREBASE_DB, 'classes'))
            const querySnapshot = await getDocs(q)
            const formClassesArr: Class[] = []

            querySnapshot.forEach((doc) => {
                const data = doc.data() as Class
                const formClass: Class = { ...data, id: doc.id }
                formClassesArr.push(formClass)
            })

            return formClassesArr
        } catch (error) {
            console.log(
                'Error while getting formClasses from database: ',
                error
            )
        }
    }

    function toggleForm() {
        setShowForm((prev) => !prev)
    }

    useFocusEffect(
        useCallback(() => {
            setFlashCards([])
            setShowForm(false)
        }, [])
    )

    async function handleFormSubmit(flashCard: FlashCard, userId: string) {
        await postFlashCard(flashCard, userId)
        toggleForm()
    }

    async function postFlashCard(flashCard: FlashCard, userId: string) {
        try {
            const docRef = await addDoc(flashcardsRef, {
                question: flashCard.question,
                answer: flashCard.answer,
                class: flashCard.class,
                subject: flashCard.subject,
                userId,
            })
            console.log('Flashcard added with ID:', docRef.id)
        } catch (error) {
            console.error('Error while posting flashcard:', error)
        }
    }

    return {
        toggleForm,
        useFocusEffect,
        showForm,
        handleFormSubmit,
        flashCards,
        getFlashCards,
        fetchFlashCards,
        loading,
        formClasses,
    }
}
