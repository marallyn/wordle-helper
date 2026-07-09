import { useState, useEffect } from "react"

export default function useHowToPlayModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasHiddenModal = localStorage.getItem("hideHowToPlayModal")
    if (hasHiddenModal !== "true") {
      setIsOpen(true)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return {
    isOpen,
    openModal,
    closeModal,
  }
}
