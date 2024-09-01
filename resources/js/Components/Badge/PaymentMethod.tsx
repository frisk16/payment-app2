import ToggleMethodModal from "@/Components/Modal/ToggleMethodModal";
import usePayment from "@/Fooks/Api/usePayment";
import { Method } from "@/types/api/Method";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";

type Props = {
    paymentId: number;
}

const PaymentMethod: FC<Props> = memo((props) => {
    const { paymentId } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getMethodList, toggleMethod } = usePayment();
    const [currentMethod, setCurrentMethod] = useState<Method | null>(null);

    useEffect(() => getMethodList({ paymentId, setCurrentMethod }), []);

    return (
        <div>
            <Flex onClick={onOpen} cursor="pointer" alignItems="center" gap={1}>
                <EditIcon color="green" fontSize="1.1em" />
                <Text>決済方法：</Text>
                {currentMethod ? (
                    <Box>{currentMethod.name}</Box>
                ) : (
                    <Text>不明</Text>
                )}
            </Flex>

            <ToggleMethodModal
                isOpen={isOpen}
                onClose={onClose}
                paymentId={paymentId}
                toggleMethod={toggleMethod}
                setCurrentMethod={setCurrentMethod}
            />
        </div>
    )
});

export default PaymentMethod;