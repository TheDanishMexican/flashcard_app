import { useAuth } from '@/context/authContext'
import { flashcardsRef, FIREBASE_DB, classesRef } from '@/firebase/firebase'
import Class from '@/interfaces/class'
import FlashCard from '@/interfaces/flashCard'
import { useFocusEffect } from 'expo-router'
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    Firestore,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
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
            const q = query(classesRef)
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

    useEffect(() => {
        fetchFlashCards()
    }, [])

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
            let classExists = false
            let subjectExists = false
            const matchingClass = formClasses.find(
                (cls) => cls.name === flashCard.class
            )

            //Add class to DB if it does not already exist
            matchingClass
                ? (classExists = true)
                : await postNewClassForFlashcard(flashCard.class, userId)

            //Add subject to class if it does not already exist on that classes subject array
            if (classExists) {
                matchingClass!.subjects.some((sub) => sub === flashCard.subject)
                    ? (subjectExists = true)
                    : await postNewSubjectForClass(
                          flashCard.subject,
                          flashCard.class,
                          userId
                      )
            }

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

    async function postNewClassForFlashcard(newClass: string, userId: string) {
        try {
            await addDoc(classesRef, {
                name: newClass,
                subjects: [],
                userId,
            })
        } catch (error) {
            console.log('Error while posting new class: ', error)
        }
    }

    async function postNewSubjectForClass(
        newSubject: string,
        className: string,
        userId: string
    ) {
        try {
            const q = query(
                classesRef,
                where('name', '==', className),
                where('userId', '==', userId)
            )
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                console.log(
                    'No class found with the provided userId and class name'
                )
                return
            }

            const classDoc = querySnapshot.docs[0]
            const ref = doc(FIREBASE_DB, 'classes', classDoc.id)

            await updateDoc(ref, {
                subjects: arrayUnion({ name: newSubject }),
            })
        } catch (error) {
            console.log(
                'error while adding new subject to existing class with given userId: ',
                error
            )
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
        postNewClassForFlashcard,
        postNewSubjectForClass,
    }
}
