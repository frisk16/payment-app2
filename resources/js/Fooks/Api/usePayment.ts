import useMessage from "@/Fooks/useMessage";
import { Payment, PaymentData, PaymentError, PaymentPageInfo } from "@/types/api/Payment";
import axios from "axios";
import { ChangeEvent, useCallback, useState } from "react";

export type PaymentApiProps = {
    page?: number;
    payments?: Array<Payment>;
    year?: number;
    month?: number;
    paymentData?: PaymentData | null;
    paymentId?: number;
    deleteIds?: Array<Number>;
    order?: string;
    resetData?: () => void;
    onClose?: () => void;
};

const usePayment = () => {
    const [paymentData, setPaymentData] = useState<PaymentData | null>({
        name: "",
        price: "",
        date: "",
        deleteIds: [],
        keyword: route().params.keyword ?? "",
        minPrice: route().params.minPrice ?? "",
        maxPrice: route().params.maxPrice ?? "",
    });
    const [paymentError, setPaymentError] = useState<PaymentError | null>({
        name: "",
        price: "",
        date: "",
    });
    const [payments, setPayments] = useState<Array<Payment>>([]);
    const [paymentPageInfo, setPaymentPageInfo] = useState<PaymentPageInfo | null>(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const { getMessage } = useMessage();


    // フォームデータ初期化
    const resetData = useCallback(() => {
        setPaymentData({
            name: "",
            price: "",
            date: "",
            deleteIds: [],
            keyword: "",
            minPrice: "",
            maxPrice: "",
        });
    }, []);

    // エラーメッセージ初期化
    const resetError = useCallback(() => {
        setPaymentError({
            name: "",
            price: "",
            date: "",
        });
    }, []);

    // 削除用チェックボックス
    const onChangeDeleteIds = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (paymentData!.deleteIds.includes(Number(e.target.value))) {
            const newDeleteIds = paymentData!.deleteIds.filter((id) => id !== Number(e.target.value));
            setPaymentData({...paymentData!, deleteIds: newDeleteIds});
        } else {
            setPaymentData({...paymentData!, deleteIds: [...paymentData!.deleteIds, Number(e.target.value)]});
        }
    }, [paymentData!.deleteIds]);

    // 月ごとのデータ取得
    const getCurrentPayments = useCallback((props: PaymentApiProps) => {
        const { year = 2024, month = 1, page = 1, paymentData = null, order = "DESC" } = props;

        setPaymentProcessing(true);
        axios.get(route("payments.get"), {
            params: {
                year,
                month,
                page,
                paymentData,
                order,
            }
        })
            .then((res) => {
                setPayments(res.data.payments.data);
                setPaymentPageInfo(res.data.payments);
            })
            .catch((err) => {
                getMessage({ title: "データが取得できませんでした", status: "error" });
                console.log(err);
            })
            .finally(() => setPaymentProcessing(false));
    }, []);


    /**
     * データ操作
     */

    // データ追加
    const addPayment = useCallback((props: PaymentApiProps) => {
        const { payments, paymentData = null, year = 2024, month = 1, resetData = null } = props;        

        setPaymentProcessing(true);
        axios.post(route("payments.store"), {
            paymentData,
            year,
            month,
        })
            .then((res) => {
                if (res.data.errors) {
                    getMessage({ title: "入力内容に誤りがあります", status: "warning" });
                    setPaymentError({
                        name: res.data.errors.name ?? "",
                        price: res.data.errors.price ?? "",
                        date: res.data.errors.date ?? "",
                    });
                } else {
                    getMessage({ title: "データを追加しました", status: "success" });      

                    const date = new Date(paymentData!.date);
                    if (year === Number(date.getFullYear()) && month === Number(date.getMonth() + 1)) {
                        setPayments([res.data.payment, ...payments!]);
                    }
                    resetData!();
                    resetError();
                }            
            })
            .catch((err) => {
                getMessage({ title: "データを追加できません", status: "error" });
                console.log(err);
            })
            .finally(() => setPaymentProcessing(false));        
    }, []);

    // データ編集
    const editPayment = useCallback((props: PaymentApiProps) => {
        const { payments, paymentData = null, paymentId = null, year = 2024, month = 1 } = props;
        
        setPaymentProcessing(true);
        axios.put(route("payments.update", {id: paymentId}), {
            paymentData,
        })
            .then((res) => {
                if (res.data.errors) {
                    getMessage({ title: "入力内容に誤りがあります", status: "warning" });
                    setPaymentError({
                        name: res.data.errors.name ?? "",
                        price: res.data.errors.price ?? "",
                        date: res.data.errors.date ?? "",
                    });
                } else {
                    getMessage({ title: "データを更新しました", status: "success" });

                    const date = new Date(paymentData!.date);
                    if (year === Number(date.getFullYear()) && month === Number(date.getMonth() + 1)) {
                        payments!.map((payment) => {
                            if (payment.id === paymentId) {
                                payment.name = res.data.payment.name;
                                payment.price = res.data.payment.price;
                                payment.date = res.data.payment.date;
                            } else {
                                payment;
                            }
                        });
                        setPayments(payments!);
                    } else {
                        let newPayments = null;
                        newPayments = payments!.filter((payment) => payment.id !== paymentId);
                        setPayments(newPayments);
                    }
                    resetError();
                }
            })
            .catch((err) => {
                getMessage({ title: "データを更新できません", status: "error" });
                console.log(err);
            })
            .finally(() => setPaymentProcessing(false));
    }, []);

    // データ削除
    const deletePayment = useCallback((props: PaymentApiProps) => {
        const { payments, deleteIds = [], onClose = null, resetData = null } = props;

        setPaymentProcessing(true);
        axios.put(route("payments.destroy"), {
            deleteIds,
        })
        .then((res) => {
            getMessage({ title: `${res.data.count}件削除しました`, status: "success" });
            let newPayments = payments;
            deleteIds.map((id) => {
                newPayments = newPayments!.filter((payment) => payment.id !== id);
            });            
            setPayments(newPayments!);
            resetData!();
            onClose!();
        })
        .catch((err) => {
            getMessage({ title: "データを削除できません", status: "error" });
            console.log(err);
        })
        .finally(() => setPaymentProcessing(false));
    }, []);

    return {
        paymentProcessing,
        paymentData,
        setPaymentData,
        onChangeDeleteIds,
        paymentError,
        resetError,
        resetData,
        payments,
        paymentPageInfo,
        getCurrentPayments,
        addPayment,
        editPayment,
        deletePayment,
    };
};

export default usePayment;