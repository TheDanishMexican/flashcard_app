import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import FlashCard from '@/interfaces/flashCard'
import Class from '@/interfaces/class'
import Subject from '@/interfaces/subject'

export function useFlashCardForm() {
    const [collectionExists, setCollectionExists] = useState(false)
    const [emptyInput, setEmptyInput] = useState(false)
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
        errorsExist: false,
    })

    function validateInput() {
        let validationErrors = {
            question: '',
            answer: '',
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

        setErrors(validationErrors)

        if (validationErrors.errorsExist) {
            return true
        } else {
            return false
        }
    }

    function handleError(error: any, functionName: any) {
        console.log(error)
        console.log('error happened here: ', functionName)
    }

    function handleInputChange(name: string, value: string) {
        setFlashCard((prevCard) => ({
            ...prevCard,
            [name]: value,
        }))
    }

    function handleClassSelected(selectedClass: Class) {
        console.log('got to handleClassSelected')
        console.log(selectedClass)
        try {
            setSubjectSelected(null)
            if (selectedClass.name === 'null') {
                setSelectedClass(null)
                return
            }

            handleInputChange('class', selectedClass.name)
            setSelectedClass(selectedClass)
        } catch (error) {
            handleError(error, 'handleClassSelected')
        }
    }

    function handleSubjectSelected(subjectName: string) {
        console.log('got to handleSubjectSelected')
        try {
            if (subjectName === 'null') {
                setSubjectSelected(null)
                return
            }
            setSubjectSelected(subjectName)
            handleInputChange('subject', subjectSelected!)
        } catch (error) {
            handleError(error, 'handleSubjectSelected')
        }
    }

    function validateInputCollectionForm(classes: Class[]) {
        const matchingClass = classes.find(
            (cls: Class) => cls.name === flashCard.class
        )
        if (matchingClass) {
            setEmptyInput(false)
            setCollectionExists(true)
            return false
        }

        if (flashCard.class === '') {
            setCollectionExists(false)
            setEmptyInput(true)
            return false
        }
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
        collectionExists,
        setCollectionExists,
        emptyInput,
        setEmptyInput,
        validateInputCollectionForm,
    }
}
