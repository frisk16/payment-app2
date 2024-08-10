import DeletePaymentAsideMenu from "@/Components/Aside/DeletePyamentAsideMenu";
import EditButton from "@/Components/Button/EditButton";
import EditPaymentModal from "@/Components/Modal/EditPaymentModal";
import Loading from "@/Components/Progress/Loading";
import { Payment } from "@/types/api/Payment";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Checkbox, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
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

            <TableContainer mt={{ base: "640px", md: "360px", xl: "96px" }}>
                <Table bg="white" size={{ base: "sm", md: "md" }}>
                    <Thead>
                        <Tr borderBottom="2px solid #eee">
                            <Th w="10%">削除</Th>
                            <Th w="60%">タイトル / カテゴリー</Th>
                            <Th w="30%">金額 / 日付</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {payments.map((payment) => (
                            <Tr key={payment.id} borderBottom="2px solid #eee">
                                <Td>
                                    <Checkbox
                                        value={payment.id}
                                        onChange={onChangeDeleteIds}
                                        isChecked={paymentData!.deleteIds.includes(payment.id) ? true : false}
                                    />
                                </Td>
                                <Td>
                                    <Text mb={2}>
                                        {payment.name}
                                        <Text as="span" float="right" fontSize={{ base: 16, md: 20 }}>
                                            <EditButton onClick={() => handleOpenModal(payment.id)} />
                                        </Text>
                                    </Text>
                                    <Flex gap={1}>
                                        {/* カテゴリー */}
                                    </Flex>
                                </Td>
                                <Td>
                                    <Text mb={2} fontWeight="bold" color="red.500">
                                        ￥ {new Intl.NumberFormat().format(Number(payment.price))}
                                    </Text>
                                    <Text>
                                        {payment.date}
                                    </Text>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

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