import Class from './class'
import FlashCard from './flashCard'
import Subject from './subject'

export default interface FlashCardFormProps {
    toggleForm: () => void
    classes: Class[]
    handleFormSubmit: (card: FlashCard, userId: string) => void
    categoryName: string
}
