import DangerButton from "@/Components/Button/DangerButton";
import DisableButton from "@/Components/Button/DisableButton";
import { CategoryApiProps } from "@/Fooks/Api/useCategory";
import { Category } from "@/types/api/Category";
import { Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
    categories: Array<Category>;
    categoryProcessing: boolean;
    deleteCategory: (props: CategoryApiProps) => void;
};

const DeleteCategoryModal: FC<Props> = memo((props) => {
    const { isOpen, onClose, category, categories, categoryProcessing, deleteCategory } = props;

    const handleDeleteCategory = () => {
        deleteCategory({ id: category!.id, categories });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        「{category!.name}」を削除します、よろしいですか？
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalFooter gap={2}>
                    <DisableButton size="sm" onClick={onClose}>閉じる</DisableButton>
                    <DangerButton
                        size="sm"
                        loading={categoryProcessing}
                        disabled={categoryProcessing}
                        onClick={handleDeleteCategory}
                    >
                        削除
                    </DangerButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default DeleteCategoryModal;