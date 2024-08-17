import PaymentsPaginator from "@/Components/Paginator/PaymentsPaginator";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box } from "@chakra-ui/react";
import { FC } from "react";

const PaymentsPageFooter: FC<PaymentsPageProps> = (props) => {
    const { paymentPageInfo, year, month, totalPrice } = props;

    return (
        <footer>
            <Box my={16}>
                <PaymentsPaginator
                    paymentPageInfo={paymentPageInfo}
                    totalPrice={totalPrice}
                    year={year}
                    month={month}
                />
            </Box>
        </footer>
    )
};

export default PaymentsPageFooter;