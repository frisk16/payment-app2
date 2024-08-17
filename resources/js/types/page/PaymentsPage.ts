import { PaymentApiProps } from "@/Fooks/Api/usePayment";
import { Payment, PaymentData, PaymentError, PaymentPageInfo } from "@/types/api/Payment";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type PaymentsPageProps = {
    date: string;
    year: number;
    month: number;
    paymentProcessing: boolean;
    payments: Array<Payment>;
    paymentPageInfo: PaymentPageInfo | null;
    totalPrice: number;
    paymentError: PaymentError | null;
    paymentData: PaymentData | null;
    page: number;
    setPaymentData: Dispatch<SetStateAction<PaymentData | null>>;
    resetError: () => void;
    resetData: () => void;
    addPayment: (props: PaymentApiProps) => void;
    editPayment: (props: PaymentApiProps) => void;
    deletePayment: (props: PaymentApiProps) => void;
    onChangeDeleteIds: (e: ChangeEvent<HTMLInputElement>) => void;
};