import DangerButton from "@/Components/Button/DangerButton";
import DisableButton from "@/Components/Button/DisableButton";
import { Method } from "@/types/api/Method";
import { MethodsPageProps } from "@/types/page/MethodsPage";
import { Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    method: Method;
};

const DeleteMethodModal: FC<Props & MethodsPageProps> = memo((props) => {
    const { isOpen, onClose, method, methods, methodProcessing, deleteMethod } = props;

    const handleDeleteCategory = () => {
        deleteMethod({ id: method.id, methods });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        「{method.name}」を削除します、よろしいですか？
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalFooter gap={2}>
                    <DisableButton size="sm" onClick={onClose}>閉じる</DisableButton>
                    <DangerButton
                        size="sm"
                        loading={methodProcessing}
                        disabled={methodProcessing}
                        onClick={handleDeleteCategory}
                    >
                        削除
                    </DangerButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default DeleteMethodModal;