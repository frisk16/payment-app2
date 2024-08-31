import { Method } from "@/types/api/Method";
import { EditIcon } from "@chakra-ui/icons";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useState } from "react";

type Props = {
    paymentId: number;
}

const PaymentMethod: FC<Props> = memo((props) => {
    const { paymentId } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentMethod, setCurrentMethod] = useState<Method | null>(null);

    return (
        <div>
            <Flex onClick={onOpen} cursor="pointer" alignItems="center" gap={1}>
                <EditIcon color="green" fontSize="1.1em" />
                <Text>決済方法：</Text>
                {currentMethod ? (
                    <></>
                ) : (
                    <Text>不明</Text>
                )}
            </Flex>

            
        </div>
    )
});

export default PaymentMethod;