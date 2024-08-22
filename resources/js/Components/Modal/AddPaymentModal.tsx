import DisableButton from "@/Components/Button/DisableButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { FormControl, FormErrorMessage, Heading, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const AddPaymentModal: FC<Props & PaymentsPageProps> = memo((props) => {
    const { isOpen, onClose, resetData, paymentProcessing, payments, paymentError, paymentData, setPaymentData, addPayment, year, month } = props;
    
    const handleAddPayment = () => {
        addPayment({ payments, paymentData, year, month, resetData });
    };    

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        支払いデータ追加
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
                    <PrimaryButton
                        onClick={handleAddPayment}
                        loading={paymentProcessing}
                        disabled={paymentProcessing}
                    >
                        追加
                    </PrimaryButton>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default AddPaymentModal;