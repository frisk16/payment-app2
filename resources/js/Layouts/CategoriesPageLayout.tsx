import PaymentsPageFooter from "@/Components/Footer/PaymentsPageFooter";
import CategoriesPageHeader from "@/Components/Header/CategoriesPageHeader";
import PaymentsPageMain from "@/Components/Main/PaymentsPageMain";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { FC } from "react";

const CategoriesPageLayout: FC<PaymentsPageProps> = (props) => {
    return (
        <>
            <CategoriesPageHeader
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

export default CategoriesPageLayout;