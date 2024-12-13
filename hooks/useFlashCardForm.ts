import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import FlashCard from '@/interfaces/flashCard'
import Class from '@/interfaces/class'
import Subject from '@/interfaces/subject'

export function useFlashCardForm() {
    const [selectedClass, setSelectedClass] = useState<Class | null>(null)
    const [subjectSelected, setSubjectSelected] = useState<string | null>(null)
    const [flashCard, setFlashCard] = useState<FlashCard>({
        id: '',
        question: '',
        answer: '',
        subject: '',
        class: '',
    })
    const [errors, setErrors] = useState({
        question: '',
        answer: '',
        class: '',
        errorsExist: false,
    })

    function validateInput() {
        let validationErrors = {
            question: '',
            answer: '',
            class: '',
            errorsExist: false,
        }

        if (flashCard.question === '') {
            validationErrors.question = 'Fill out please'
            validationErrors.errorsExist = true
        }

        if (flashCard.answer === '') {
            validationErrors.answer = 'Fill out please'
            validationErrors.errorsExist = true
        }

        if (flashCard.class === '') {
            validationErrors.class = 'Select or fill out please'
            validationErrors.errorsExist = true
        }

        setErrors(validationErrors)

        if (validationErrors.errorsExist) {
            return true
        } else {
            return false
        }
    }

    function handleInputChange(name: string, value: string) {
        setFlashCard((prevCard) => ({
            ...prevCard,
            [name]: value,
        }))
    }

    function handleClassSelected(selectedClass: Class) {
        setSubjectSelected(null)
        if (selectedClass.name === 'null') {
            setSelectedClass(null)
            return
        }

        handleInputChange('class', selectedClass.name)
        setSelectedClass(selectedClass)
    }

    function handleSubjectSelected(subjectName: string) {
        if (subjectName === 'null') {
            setSubjectSelected(null)
            return
        }
        setSubjectSelected(subjectName)
        handleInputChange('subject', subjectSelected!)
    }

    return {
        flashCard,
        handleInputChange,
        handleClassSelected,
        handleSubjectSelected,
        selectedClass,
        subjectSelected,
        errors,
        setErrors,
        validateInput,
    }
}
