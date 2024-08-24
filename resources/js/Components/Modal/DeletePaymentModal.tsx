import DangerButton from "@/Components/Button/DangerButton";
import DisableButton from "@/Components/Button/DisableButton";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    deleteIds: Array<Number>;
    resetData: () => void;
};

const DeletePaymentModal: FC<Props & PaymentsPageProps> = memo((props) => {
    const { isOpen, onClose, deletePayment, payments, deleteIds, resetData } = props;

    const handleDeletePayment = () => {
        deletePayment({ payments, deleteIds, onClose, resetData });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        {deleteIds.length}件のデータを削除します、よろしいですか？
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalFooter gap={2}>
                    <DisableButton size="sm" onClick={onClose}>閉じる</DisableButton>
                    <DangerButton
                        size="sm"
                        onClick={handleDeletePayment}

                    >
                        削除
                    </DangerButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default DeletePaymentModal;