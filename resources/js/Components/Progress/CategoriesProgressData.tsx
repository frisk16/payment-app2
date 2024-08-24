import SSelect from "@/Components/Form/SSelect";
import PaymentCircularProgress from "@/Components/Progress/PaymentCircularProgress";
import useProgressColor from "@/Fooks/useProgressColor";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useEffect } from "react";

const PaymentsProgressData: FC<PaymentsPageProps> = memo((props) => {
    const { date, month, totalPrice } = props;

    const { progressNumberColor, setProgressColor } = useProgressColor();
    const currentMonth = route().params.month ? route().params.month : String(month);
    const total = route().params.totalPrice ? Number(route().params.totalPrice) : totalPrice;

    useEffect(() => {
        setProgressColor({ total });
    }, [total]);

    const onChangeSelectMonth = (e: ChangeEvent<HTMLSelectElement>) => {
        location.href = `?month=${e.target.value}`
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
                            <SSelect
                                defaultValue={currentMonth}
                                onChange={onChangeSelectMonth}
                                border="2px solid teal"
                            >
                                {[...Array(12)].map((data, i) => (
                                    <option key={i} value={i + 1}>{`${i + 1}月のデータを表示`}</option>
                                ))}
                            </SSelect>
                        </Box>
                    </Box> 
                </Flex>
            </CardBody>
        </Card>
    )
});

export default PaymentsProgressData;