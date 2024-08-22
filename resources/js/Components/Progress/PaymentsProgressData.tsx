import AddButton from "@/Components/Button/AddButton";
import AddPaymentModal from "@/Components/Modal/AddPaymentModal";
import PaymentCircularProgress from "@/Components/Progress/PaymentCircularProgress";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box, Card, CardBody, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";

const PaymentsProgressData: FC<PaymentsPageProps> = memo((props) => {
    const { date, totalPrice, resetData, resetError } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const total = route().params.totalPrice ? Number(route().params.totalPrice) : totalPrice;
    let progressNumberColor = "";
    if (total < 180000) {
        progressNumberColor = "blue.500";
    } else if (total >= 180000 && total < 240000) {
        progressNumberColor = "yellow.500";
    } else {
        progressNumberColor = "red.500";
    }

    const handleOpenModal = () => {
        resetData();
        resetError();
        onOpen();
    }

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
                        <PaymentCircularProgress totalPrice={total}/>
                    </Box>

                    <Box>
                        <Heading size="lg" my={{ base: 0, md: 8 }}>{date}</Heading>
                        <Text>
                            <Text as="span" fontSize="1.3em" fontWeight="bold" color="blue.500">
                                {Math.round((total / 300000) * 100)}%
                            </Text> / 100% 消費
                        </Text>
                        <Box w="full" mt={{ base: 6, md: 16 }}>
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