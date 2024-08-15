import DeletePaymentAsideMenu from "@/Components/Aside/DeletePyamentAsideMenu";
import PaymentCategory from "@/Components/Badge/PaymentCategory";
import EditPaymentModal from "@/Components/Modal/EditPaymentModal";
import Loading from "@/Components/Progress/Loading";
import { Payment } from "@/types/api/Payment";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useState } from "react";

const PaymentsPageMain: FC<PaymentsPageProps> = memo((props) => {
    const { payments, paymentProcessing, paymentData, resetData, onChangeDeleteIds } = props;
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [targetPayment, setTargetPayment] = useState<Payment | null>(null);

    const handleOpenModal = (paymentId: number) => {
        setTargetPayment(payments.find((payment) => payment.id === paymentId) ?? null);
        onOpen();
    };
    
    return (
        <main>
            {paymentProcessing && (
                <Loading />
            )}

            {paymentData!.deleteIds[0] && (
                <DeletePaymentAsideMenu
                    {...props}
                    resetData={resetData}
                    deleteIds={paymentData!.deleteIds}
                />
            )}

            <Box mt={{ base: "280px", md: "350px", xl: "84px" }}>
                {payments.map((payment) => (
                    <Card borderRadius={0} mb={3} key={payment.id}>
                        <CardHeader p={{ base: 2, md: 4 }} fontSize="0.8em">
                            <Flex justifyContent="space-between">
                                <PaymentCategory paymentId={payment.id} />
                                <Text fontWeight="bold">{payment.date}</Text>
                            </Flex>
                        </CardHeader>
                        <CardBody fontSize={{ base: "0.9em", md: "1em" }} pt={2}>
                            <Flex justifyContent="start" alignItems="center" gap={4}>
                                <Box>
                                    <Checkbox
                                        value={payment.id}
                                        onChange={onChangeDeleteIds}
                                        isChecked={paymentData!.deleteIds.includes(payment.id) ? true : false}
                                    >
                                        <Text ms={2} fontSize={{ base: "0.9em", md: "1em" }}>{payment.name}</Text>
                                    </Checkbox>
                                </Box>
                                <Box ms="auto">
                                    <Text fontWeight="bold" color="red.500">
                                        ￥ {new Intl.NumberFormat().format(Number(payment.price))} 円
                                    </Text>
                                </Box>
                            </Flex>
                        </CardBody>
                        <Divider color="gray.300" />
                        <CardFooter fontSize="0.8em" p={0} alignItems="center">
                            <Text ms={4}>支払い：不明</Text>
                            <Box ms="auto">
                                <Button
                                    borderRadius={0}
                                    leftIcon={<EditIcon />}
                                    size={{ base: "xs", md: "sm" }}
                                    bg="green.400"
                                    color="white"
                                    _hover={{ opacity: 0.8 }}
                                    onClick={() => handleOpenModal(payment.id)}
                                >
                                    編集
                                </Button>
                            </Box>
                        </CardFooter>
                    </Card>
                ))}
            </Box>

            <EditPaymentModal
                {...props}
                targetPayment={targetPayment}
                isOpen={isOpen}
                onClose={onClose}
            />
        </main>
    )
});

export default PaymentsPageMain;