import AddButton from "@/Components/Button/AddButton";
import SSelect from "@/Components/Form/SSelect";
import AddPaymentModal from "@/Components/Modal/AddPaymentModal";
import PaymentCircularProgress from "@/Components/Progress/PaymentCircularProgress";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box, Card, CardBody, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useMemo, useState } from "react";

const PaymentsProgressData: FC<PaymentsPageProps> = memo((props) => {
    const { date, month, totalPrice, resetData, resetError } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentMonth = route().params.month ? route().params.month : String(month);

    const total = route().params.totalPrice ? Number(route().params.totalPrice) : totalPrice;
    const [progressNumberColor, setProgressNumberColor] = useState("");
    useMemo(() => {
        if (total < 180000) {
            setProgressNumberColor("blue.500");
        } else if (total >= 180000 && total < 240000) {
            setProgressNumberColor("yellow.500");
        } else {
            setProgressNumberColor("red.500");
        }
    }, []);

    const onChangeSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
        location.href = `?month=${e.target.value}`
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
                        <PaymentCircularProgress
                            totalPrice={total}
                            progressNumberColor={progressNumberColor}
                        />
                    </Box>

                    <Box>
                        <Heading size="lg" my={{ base: 0, md: 8 }}>{date}</Heading>
                        <Text>
                            <Text as="span" fontSize="1.3em" fontWeight="bold" color={progressNumberColor}>
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
                <Box mt={8} px={{ base: 0, md: 24, xl: 64 }} >
                    <SSelect
                        defaultValue={currentMonth}
                        onChange={onChangeSelectMonth}
                        size={{ base: "md", lg: "lg" }}
                        border="2px solid teal"
                    >
                        {[...Array(12)].map((data, i) => (
                            <option key={i} value={i + 1}>{`${i + 1}月のデータを表示`}</option>
                        ))}
                    </SSelect>
                </Box>
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