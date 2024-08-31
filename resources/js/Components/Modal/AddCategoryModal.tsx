import DisableButton from "@/Components/Button/DisableButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { FormControl, FormErrorMessage, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const AddCategoryModal: FC<Props & CategoriesPageProps> = memo((props) => {
    const {
        isOpen,
        onClose,
        categories,
        categoryError,
        categoryData,
        categoryProcessing,
        setCategoryData,
        addCategory,
    } = props;

    
    const handleAddCategory = () => {
        addCategory({ categories, categoryData });
    };    

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        カテゴリー追加
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>

                        <FormControl isRequired isInvalid={categoryError!.name !== ""}>
                            <SFormLabel>タイトル</SFormLabel>
                            <SInput
                                type="text"
                                placeholder="10文字以内"
                                value={categoryData!.name}
                                onChange={(e) => setCategoryData({name: e.target.value})}
                            />
                            {categoryError!.name !== "" && (
                                <FormErrorMessage>{categoryError!.name}</FormErrorMessage>
                            )}
                        </FormControl>

                    </Stack>
                </ModalBody>
                <ModalFooter gap={2}>

                    <DisableButton onClick={onClose}>閉じる</DisableButton>
                    <PrimaryButton
                        onClick={handleAddCategory}
                        loading={categoryProcessing}
                        disabled={categoryProcessing}
                    >
                        追加
                    </PrimaryButton>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default AddCategoryModal;