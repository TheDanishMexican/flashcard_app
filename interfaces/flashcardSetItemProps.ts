import Class from './class'

export default interface flashcardSetItemProps {
    category: Class
    deleteCollection: (collectionName: string, userId: string) => void
}
