export default interface DynamicModalProps {
    toggleModal: (text: string) => void
    modalText: string
    deleteCollection: (collectionName: string, userId: string) => void
}
