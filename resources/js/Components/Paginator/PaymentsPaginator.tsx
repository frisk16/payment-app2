import ActiveNextPageButton from "@/Components/Paginator/ActiveNextPageButton";
import ActivePageLinkButton from "@/Components/Paginator/ActivePageLinkButton";
import ActivePrevPageButton from "@/Components/Paginator/ActivePrevPageButton";
import NextPageButton from "@/Components/Paginator/NextPageButton";
import PageLinkButton from "@/Components/Paginator/PageLinkButton";
import PrevPageButton from "@/Components/Paginator/PrevPageButton";
import { PaymentPageInfo } from "@/types/api/Payment";
import { Box, Flex } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    paymentPageInfo: PaymentPageInfo | null;
    year: number;
    month: number;
    totalPrice: number;
}

const PaymentsPaginator: FC<Props> = memo((props) => {
    const { paymentPageInfo, year, month, totalPrice } = props;

    const keyword = route().params.keyword ? route().params.keyword : "";
    const minPrice = route().params.minPrice ? route().params.minPrice : "";
    const maxPrice = route().params.maxPrice ? route().params.maxPrice : "";
    const total = route().params.totalPrice ? Number(route().params.totalPrice) : totalPrice;

    return (
        <Flex justifyContent="center">
            <Box>
                {paymentPageInfo?.current_page === 1 ? (
                    <ActivePrevPageButton />
                ) : (
                    <PrevPageButton
                        href={`?year=${year}&month=${month}&keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&totalPrice=${total}&page=${Number(route().params.page) - 1}`}
                    />
                )}
            </Box>
            <Box>
                {[...Array(paymentPageInfo?.last_page)].map((data, i) => (
                    i + 1 === paymentPageInfo?.current_page ? (
                        <ActivePageLinkButton key={i}>{i + 1}</ActivePageLinkButton>
                    ) : ( 
                        <PageLinkButton
                            key={i}
                            href={`?year=${year}&month=${month}&keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&totalPrice=${total}&page=${i + 1}`}
                        >
                            {i + 1}
                        </PageLinkButton>
                    )
                ))}
            </Box>
            <Box>
                {paymentPageInfo?.current_page === paymentPageInfo?.last_page ? (
                    <ActiveNextPageButton />
                ) : (
                    <NextPageButton 
                        href={`?year=${year}&month=${month}&keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&totalPrice=${total}&page=${Number(route().params.page) + 1}`}
                    />
                )}
            </Box>
        </Flex>
    )
});

export default PaymentsPaginator;