import PaymentsPaginator from "@/Components/Paginator/PaymentsPaginator";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box } from "@chakra-ui/react";
import { FC } from "react";

const PaymentsPageFooter: FC<PaymentsPageProps> = (props) => {
    const { paymentPageInfo, year, month } = props;

    return (
        <footer>
            <Box my={16}>
                <PaymentsPaginator
                    paymentPageInfo={paymentPageInfo}
                    year={year}
                    month={month}
                />
            </Box>
        </footer>
    )
};

export default PaymentsPageFooter;