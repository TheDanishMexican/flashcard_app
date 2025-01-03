import { useState } from 'react'

export function useFlashCardFront() {
    const [isFlipped, setIsFlipped] = useState(false)
    const [hasSubject, setHasSubject] = useState(false)

    function toggleFlip() {
        setIsFlipped((prev) => !prev)
    }

    return { isFlipped, toggleFlip, hasSubject, setHasSubject }
}
