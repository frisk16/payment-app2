import usePayment from "@/Fooks/Api/usePayment";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoriesPageLayout from "@/Layouts/CategoriesPageLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC, memo, useEffect } from "react";

type Props = {
    auth: PageProps["auth"];
    methodId: number;
    date: string;
    year: number;
    month: number;
    pageTitle: string;
};

const BaseMethodPaymentsPage: FC<Props> = memo((props) => {
    const { auth, methodId, date, year, month, pageTitle } = props;

    const page = route().params.page ? Number(route().params.page) : 1;
    
    const {
        paymentProcessing,
        payments,
        paymentPageInfo,
        totalPrice,
        paymentError,
        paymentData,
        updateCount,
        setPaymentData,
        resetError,
        resetData,
        getMethodPayments,
        addPayment,
        editPayment,
        deletePayment,
        onChangeDeleteIds,
    } = usePayment();

    useEffect(() => {
        getMethodPayments({
            methodId,
            year,
            month,
            page,
        });
    }, [updateCount]);

    return (
        <AuthenticatedLayout user={auth.user} title={pageTitle} >

            <Head title={pageTitle} />

            <CategoriesPageLayout
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

export default BaseMethodPaymentsPage;