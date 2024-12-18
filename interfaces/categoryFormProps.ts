import Class from './class'
import FlashCard from './flashCard'

export default interface categoryFormProps {
    toggleForm: () => void
    classes: Class[]
    postNewCollection: (newCollectionName: string, userId: string) => void
}
