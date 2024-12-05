import Class from './class'
import FlashCard from './flashCard'

export default interface Subject {
    name: string
    flashcards: FlashCard[]
}
