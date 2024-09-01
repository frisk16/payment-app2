import CategoryBadge from "@/Components/Badge/CategoryBadge";
import ToggleCategoryModal from "@/Components/Modal/ToggleCategoryModal";
import usePayment from "@/Fooks/Api/usePayment";
import { Category } from "@/types/api/Category";
import { EditIcon } from "@chakra-ui/icons";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";

type Props = {
    paymentId: number;
};

const PaymentCategory: FC<Props> = memo((props) => {
    const { paymentId } = props;

    const [currentCategories, setCurrentCategories] = useState<Array<Category>>([]);
    const { getCategoryLists, toggleCategory } = usePayment();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => getCategoryLists({ paymentId, setCurrentCategories }), []);

    return (
        <div>
            <Flex onClick={onOpen} cursor="pointer" alignItems="center" gap={1}>
                <EditIcon color="green" fontSize="1.1em" />
                <Text>カテゴリー：</Text>
                {currentCategories[0] ? (
                        currentCategories.map((category) => (
                        <CategoryBadge key={category.id} fontSize={{ base: "0.8em", md: "1em" }}>{category.name}</CategoryBadge>
                    ))
                ) : (
                    <Text>無し</Text>
                )}
                
            </Flex>

            <ToggleCategoryModal
                paymentId={paymentId}
                setCurrentCategories={setCurrentCategories}
                toggleCategory={toggleCategory}
                isOpen={isOpen}
                onClose={onClose}
            />
        </div>
    )
});

export default PaymentCategory;