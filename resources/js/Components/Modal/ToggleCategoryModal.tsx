import CategoryBadge from "@/Components/Badge/CategoryBadge";
import DisableButton from "@/Components/Button/DisableButton";
import SuccessButton from "@/Components/Button/SuccessButton";
import NotFound from "@/Components/Default/NotFound";
import SCheckbox from "@/Components/Form/SCheckbox";
import useCategory from "@/Fooks/Api/useCategory";
import { PaymentApiProps } from "@/Fooks/Api/usePayment";
import { Category } from "@/types/api/Category";
import { Box, Flex, FormControl, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";

type Props = {
    paymentId: number;
    setCurrentCategories: Dispatch<SetStateAction<Array<Category>>>;
    toggleCategory: (props: PaymentApiProps) => void;
    paymentProcessing: boolean;
    isOpen: boolean;
    onClose: () => void;
};

const ToggleCategoryModal: FC<Props> = memo((props) => {
    const { paymentId, setCurrentCategories, toggleCategory, paymentProcessing, isOpen, onClose } = props;

    const [data, setData] = useState<Array<Number>>([]);
    const { categories, getCategories } = useCategory();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (data.includes(Number(e.target.value))) {
            setData(data.filter((data) => data !== Number(e.target.value)));
        } else {
            setData([...data, Number(e.target.value)]);
        }
    };

    const handleToggleCategory = () => {
        toggleCategory({ paymentId, data, setCurrentCategories });
    };

    useEffect(() => getCategories(), []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        カテゴリー選択
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl>
                        <Flex gap={4} flexWrap="wrap">
                            {categories[0] ? (
                                categories.map((category) => (
                                    <SCheckbox key={category.id} value={category.id} onChange={onChange} isChecked={data.includes(category.id)}>
                                        <CategoryBadge fontSize={{ base: "0.9em" }}>{category.name}</CategoryBadge>
                                    </SCheckbox>
                                ))
                            ) : (
                                <Box mx="auto">
                                    <NotFound />
                                </Box>
                            )}
                            {}
                        </Flex>
                    </FormControl>
                </ModalBody>

                <ModalFooter gap={2}>

                    <DisableButton onClick={onClose}>閉じる</DisableButton>
                    <SuccessButton
                        onClick={handleToggleCategory}
                        disabled={!categories[0] || paymentProcessing}
                        loading={paymentProcessing}
                    >
                        更新
                    </SuccessButton>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default ToggleCategoryModal;