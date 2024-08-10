import usePayment from "@/Fooks/Api/usePayment";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaymentsPageLayout from "@/Layouts/PaymentsPageLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC, memo, useEffect } from "react";

type Props = {
    auth: PageProps["auth"];
    today: string;
    year: number;
    month: number;
};

const CurrentPaymentsPage: FC<Props> = memo((props) => {
    const { auth, today, year, month } = props;

    const page = Number(route().params.page);
    
    const {
        paymentProcessing,
        payments,
        paymentPageInfo,
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

    useEffect(() => {
        getCurrentPayments({
            year,
            month,
            page,
            paymentData,
            order: route().params.order,
        })
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} title="今月のデータ">
            <Head  title="今月のデータ" />

            <PaymentsPageLayout
                date={today}
                year={year}
                month={month}
                paymentProcessing={paymentProcessing}
                payments={payments}
                paymentPageInfo={paymentPageInfo}
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

export default CurrentPaymentsPage;