import { useState } from 'react';


export const useModal = () => {
    const [modalMessage, setModalMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return {
        modalMessage,
        isModalOpen,
        openModal,
        closeModal,
    };
};
