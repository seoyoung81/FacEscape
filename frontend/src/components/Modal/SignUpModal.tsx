import { useState } from 'react';

const LogInModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModalHandler = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
        </>
    )
}