import CategoryBadge from "@/Components/Badge/CategoryBadge";
import usePayment from "@/Fooks/Api/usePayment";
import { Flex, Text } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";

type Props = {
    paymentId: number;
};

const PaymentCategory: FC<Props> = memo((props) => {
    const { paymentId } = props;

    const { getCategoryLists, categories } = usePayment();

    useEffect(() => getCategoryLists({ paymentId }), []);

    return (
        <Flex>
            <Text>カテゴリー：</Text>
            {categories.map((category) => (
                <CategoryBadge key={category.id}>{category.name}</CategoryBadge>
            ))}
        </Flex>
    )
});

export default PaymentCategory;