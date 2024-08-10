import AddButton from "@/Components/Button/AddButton";
import AddPaymentModal from "@/Components/Modal/AddPaymentModal";
import PaymentCircularProgress from "@/Components/Progress/PaymentCircularProgress";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box, Card, CardBody, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useMemo, useState } from "react";

const PaymentsProgressData: FC<PaymentsPageProps> = memo((props) => {
    const { date, payments } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [totalPrice, setTotalPrice] = useState(0);

    useMemo(() => {
        let total = 0;
        payments.map((payment) => {
            total += Number(payment.price);
            setTotalPrice(total);
        })
    }, [payments]);
    
    let progressNumberColor = "";
    if (totalPrice < 180000) {
        progressNumberColor = "blue.500";
    } else if (totalPrice >= 180000 && totalPrice < 240000) {
        progressNumberColor = "yellow.500";
    } else {
        progressNumberColor = "red.500";
    }

    const handleOpenModal = () => {
        onOpen();
    };

    return (
        <Card h="full">
            <CardBody>
                <Flex
                    justifyContent="center"
                    alignItems={{ base: "center", md: "start" }}
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: 4, md: 16 }}
                >

                    <Box>
                        <PaymentCircularProgress totalPrice={totalPrice}/>
                    </Box>

                    <Box>
                        <Heading size="lg" my={{ base: 0, md: 8 }}>{date}</Heading>
                        <Text>
                            <Text as="span" fontSize="1.3em" fontWeight="bold" color="blue.500">
                                {Math.round((totalPrice / 300000) * 100)}%
                            </Text> / 100% 消費
                        </Text>
                        <Box w="full" mt={16}>
                            <AddButton
                                onClick={handleOpenModal}
                                w={{ base: "full" }}
                            >
                                データ追加
                            </AddButton>
                        </Box>
                    </Box>
                    
                </Flex>
            </CardBody>

            <AddPaymentModal
                {...props}
                isOpen={isOpen}
                onClose={onClose}
            />
        </Card>
    )
});

export default PaymentsProgressData;