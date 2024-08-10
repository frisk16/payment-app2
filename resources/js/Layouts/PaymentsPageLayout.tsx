import PaymentsPageFooter from "@/Components/Footer/PaymentsPageFooter";
import PaymentsPageHeader from "@/Components/Header/PaymentsPageHeader";
import PaymentsPageMain from "@/Components/Main/PaymentsPageMain";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { FC } from "react";

const PaymentsPageLayout: FC<PaymentsPageProps> = (props) => { 
    return (
        <>
            <PaymentsPageHeader
                {...props}
            />

            <PaymentsPageMain
                {...props}
            />

            <PaymentsPageFooter
                {...props}
            />
        </>
    )
};

export default PaymentsPageLayout;