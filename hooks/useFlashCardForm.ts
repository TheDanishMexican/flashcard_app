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
    }
}
