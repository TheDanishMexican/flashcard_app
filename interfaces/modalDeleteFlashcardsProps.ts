export default interface ModalDeleteFlashcardsProps {
    toggleModal: (text: string) => void
    modalText: string
    clickedDelete: (id: string) => void
    flashcardId: string
}
