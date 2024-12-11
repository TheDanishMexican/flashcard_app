import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import FlashCard from '@/interfaces/flashCard'
import Class from '@/interfaces/class'

export function useFlashCardForm() {
    const [selectedClass, setSelectedClass] = useState<Class | null>(null)
    const [subjects, setSubjects] = useState<string[] | null>(null)
    const [subjectSelected, setSubjectSelected] = useState(false)
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
        if (selectedClass.name === 'null') {
            setSelectedClass(null)
            return
        }

        handleInputChange('class', selectedClass.name)
        setSelectedClass(selectedClass)
        const subjectNames = selectedClass.subjects.map(
            (subject) => subject.name
        )
        setSubjects(subjectNames)
    }

    function handleSubjectSelected(subjectName: string) {
        handleInputChange('subject', subjectName)
    }

    return {
        flashCard,
        handleInputChange,
        handleClassSelected,
        handleSubjectSelected,
        subjects,
        selectedClass,
    }
}
