import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function ModalComponent(
    { title = "Modal Title",
        children = <></>,
        isDismissable = false,
        handleAction = (e) => { },
        titleAction,
        isOpen = false, onClose = () => { }
    }
) {
    return (
        <>
            <Modal
                size="5xl"
                backdrop={"opaque"}
                isOpen={isOpen}
                onClose={onClose}
                isDismissable={isDismissable}
                placement={"center"}
                scrollBehavior="outside"
            >
                <ModalContent>
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
