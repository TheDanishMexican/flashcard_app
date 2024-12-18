import { useState } from 'react'

export function useModal() {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalText, setModalText] = useState<string>('')

    function toggleModal(text: string) {
        setModalText(text)
        setModalVisible((prev) => !prev)
    }

    return { toggleModal, modalVisible, modalText }
}
