import usePayment from "@/Fooks/Api/usePayment";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaymentsPageLayout from "@/Layouts/PaymentsPageLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC, memo, useEffect } from "react";

type Props = {
    auth: PageProps["auth"];
    date: string;
    year: number;
    month: number;
    pageTitle: string;
};

const BaseCategoryPaymentsPage: FC<Props> = memo((props) => {
    const { auth, date, year, month, pageTitle } = props;

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
        getCategoryPayments, 
        addPayment,
        editPayment,
        deletePayment,
        onChangeDeleteIds,
    } = usePayment();

    useEffect(() => {
        getCategoryPayments({
            year,
            month,
            page,
        })
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} title={pageTitle} >

            <Head title={pageTitle} />

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
                page={page}
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

export default BaseCategoryPaymentsPage;