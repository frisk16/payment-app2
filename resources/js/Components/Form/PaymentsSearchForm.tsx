import PrimaryButton from "@/Components/Button/PrimaryButton";
import PriceSearchForm from "@/Components/Form/PriceSearchForm";
import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import SSelect from "@/Components/Form/SSelect";
import PaymentSearchModal from "@/Components/Modal/PaymentSearchModal";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box, Card, CardBody, Flex, FormControl, Stack, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useState } from "react";

const PaymentsSearchForm: FC<PaymentsPageProps> = memo((props) => {
    const { year, month, paymentData, setPaymentData } = props;

    const [order, setOrder] = useState("DESC");
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Card h="full">
            <CardBody>

                {/* PC Style */}
                <Box display={{ base: "none", md: "block" }}>
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
                        <Flex gap={8} direction={{ base: "column", md: "row" }} justifyContent="center">
                            
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
                    <FormControl mt={8} textAlign="right">
                        <PrimaryButton
                            as="a"
                            w={{ base: "100%", md: "120px" }}
                            href={`?year=${year}&month=${month}&keyword=${paymentData!.keyword}&maxPrice=${paymentData!.maxPrice}&minPrice=${paymentData!.minPrice}&order=${order}`}
                        >
                            検索
                        </PrimaryButton>
                    </FormControl>
                </Box>

                {/* Phone Style */}
                <Box display={{ base: "block", md: "none" }}>
                    <PrimaryButton w="full" onClick={onOpen}>検索フォーム表示</PrimaryButton>
                </Box>
            </CardBody>

            <PaymentSearchModal
                isOpen={isOpen}
                onClose={onClose}
                {...props}
            />
        </Card>
    )
});

export default PaymentsSearchForm;