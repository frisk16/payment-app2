import DisableButton from "@/Components/Button/DisableButton";
import SuccessButton from "@/Components/Button/SuccessButton";
import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import { Payment } from "@/types/api/Payment";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { FormControl, FormErrorMessage, Heading, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";

type Props = {
    targetPayment: Payment | null;
    isOpen: boolean;
    onClose: () => void;
};

const EditPaymentModal: FC<Props & PaymentsPageProps> = memo((props) => {
    const { targetPayment, isOpen, onClose, paymentProcessing, payments, paymentError, paymentData, setPaymentData, resetError, editPayment, year, month } = props;
    
    useEffect(() => resetError(),[isOpen]);

    useEffect(() => {
        setPaymentData({
            ...paymentData!,
            name: targetPayment?.name ?? "",
            price: targetPayment?.price ?? "",
            date: targetPayment?.date ?? "",
        });     
    }, [targetPayment]);    
    
    const handleEditPayment = () => {
        editPayment({ payments, paymentData, paymentId: targetPayment!.id, year, month });
    };    

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        支払いデータ編集
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>

                        <FormControl isRequired isInvalid={paymentError!.name !== ""}>
                            <SFormLabel>タイトル</SFormLabel>
                            <SInput
                                type="text"
                                placeholder="10文字以内"
                                value={paymentData!.name}
                                onChange={(e) => setPaymentData({...paymentData!, name: e.target.value})}
                            />
                            {paymentError!.name !== "" && (
                                <FormErrorMessage>{paymentError!.name}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isRequired isInvalid={paymentError!.price !== ""}>
                            <SFormLabel>金額</SFormLabel>
                            <InputGroup>
                                <SInput
                                    type="number"
                                    min={0}
                                    placeholder="半角数字のみ"
                                    value={paymentData!.price}
                                    onChange={(e) => setPaymentData({...paymentData!, price: e.target.value})}
                                />
                                <InputRightElement color="gray">￥</InputRightElement>
                            </InputGroup>
                            {paymentError!.price !== "" && (
                                <FormErrorMessage>{paymentError!.price}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isRequired isInvalid={paymentError!.date !== ""}>
                            <SFormLabel>日付</SFormLabel>
                            <SInput
                                type="date"
                                value={paymentData!.date}
                                onChange={(e) => setPaymentData({...paymentData!, date: e.target.value})}
                            />
                            {paymentError!.date !== "" && (
                                <FormErrorMessage>{paymentError!.date}</FormErrorMessage>
                            )}
                        </FormControl>

                    </Stack>
                </ModalBody>
                <ModalFooter gap={2}>

                    <DisableButton onClick={onClose}>閉じる</DisableButton>
                    <SuccessButton
                        onClick={handleEditPayment}
                        loading={paymentProcessing}
                        disabled={paymentProcessing}
                    >
                        更新
                    </SuccessButton>
                    
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default EditPaymentModal;