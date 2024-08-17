import usePayment from "@/Fooks/Api/usePayment";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaymentsPageLayout from "@/Layouts/PaymentsPageLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC, memo, useEffect } from "react";

type Props = {
    auth: PageProps["auth"];
};

const Month10to12PaymentsPage: FC<Props> = memo((props) => {
    const { auth } = props;
    
    const year = new Date().getFullYear();
    const month = route().params.month && route().params.month.match(/^(10|11|12)$/) ? Number(route().params.month) : 1;
    const pageTitle = `${month}月のデータ`;
    const date = `${year}年${month}月のデータ`;
    const page = route().params.page ? Number(route().params.page) : 1;
    
    const {
        paymentProcessing,
        payments,
        paymentPageInfo,
        totalPrice,
        paymentError,
        paymentData,
        setPaymentData,
        resetError,
        resetData,
        getCurrentPayments, 
        addPayment,
        editPayment,
        deletePayment,
        onChangeDeleteIds,
    } = usePayment();

    useEffect(() => getCurrentPayments({ year, month, page, paymentData }), []);

    return (
        <AuthenticatedLayout user={auth.user} title={pageTitle}>
            <Head  title={pageTitle} />

            <PaymentsPageLayout
                date={date}
                year={year}
                month={month}
                paymentProcessing={paymentProcessing}
                payments={payments}
                paymentPageInfo={paymentPageInfo}
                totalPrice={totalPrice}
                paymentError={paymentError}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
                resetError={resetError}
                resetData={resetData}
                addPayment={addPayment}
                editPayment={editPayment}
                deletePayment={deletePayment}
                onChangeDeleteIds={onChangeDeleteIds}
            />
            
        </AuthenticatedLayout>
    )
});

export default Month10to12PaymentsPage;