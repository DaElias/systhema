import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function ModalComponent(
    { title = "Modal Title",
        children = <></>,
        isDismissable = false,
        handleAction = (e) => { },
        titleAction,
        isOpen = false, onClose = () => { },
        size = "5xl",
        backdrop = "opaque",
        placement = "center",
        scrollBehavior = "outside",
        className = ""
    }
) {
    return (
        <>
            <Modal
                size={size}
                backdrop={backdrop}
                isOpen={isOpen}
                onClose={onClose}
                isDismissable={isDismissable}
                placement={placement}
                scrollBehavior={scrollBehavior}
            >
                <ModalContent className={`${className}`}>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody >
                                {children}
                            </ModalBody>
                            {titleAction && (
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => handleAction(onClose)}>
                                        {titleAction}
                                    </Button>
                                </ModalFooter>
                            )}
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}
