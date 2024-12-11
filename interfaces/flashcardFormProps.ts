import Class from './class'
import FlashCard from './flashCard'
import Subject from './subject'

export default interface FlashCardFormProps {
    toggleForm: () => void
    classes: Class[]
    handleFormSubmit: (card: FlashCard, userId: string) => void
    postNewClassForFlashcard: (newClass: string, userId: string) => void
    postNewSubjectForClass: (
        newSubject: string,
        className: string,
        userId: string
    ) => void
}
