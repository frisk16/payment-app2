import DisableButton from "@/Components/Button/DisableButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import PriceSearchForm from "@/Components/Form/PriceSearchForm";
import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import SSelect from "@/Components/Form/SSelect";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Flex, FormControl, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction, useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    order: string;
    setOrder: Dispatch<SetStateAction<string>>;
};

const PaymentSearchModal: FC<Props & PaymentsPageProps> = memo((props) => {
    const { isOpen, onClose, paymentData, setPaymentData, year, month, order, setOrder } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>   
                
                <ModalHeader>
                    <Heading size="sm">
                        支払いデータ検索
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Stack spacing={4}>
                    <FormControl>
                            <SFormLabel>ワード検索</SFormLabel>
                            <SInput
                                type="text"
                                value={paymentData!.keyword}
                                onChange={(e) => setPaymentData({...paymentData!, keyword: e.target.value})}
                                placeholder="タイトル名"
                            />
                        </FormControl>
                        <Flex gap={8} direction="column" justifyContent="center">
                            
                            <FormControl>
                                <SFormLabel>日付</SFormLabel>
                                <SSelect onChange={(e) => setOrder(e.target.value)}>
                                    <option value="DESC">新しい順</option>
                                    <option value="ASC">古い順</option>
                                </SSelect>
                            </FormControl>

                            <PriceSearchForm
                                paymentData={paymentData}
                                setPaymentData={setPaymentData}
                            />
                        </Flex>
                    </Stack>
                </ModalBody>

                <ModalFooter gap={2}>
                    <DisableButton onClick={onClose}>閉じる</DisableButton>
                    <PrimaryButton
                            as="a"
                            href={`?year=${year}&month=${month}&keyword=${paymentData!.keyword}&maxPrice=${paymentData!.maxPrice}&minPrice=${paymentData!.minPrice}&order=${order}`}
                        >
                            検索
                    </PrimaryButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default PaymentSearchModal;