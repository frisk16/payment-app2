import useMessage from "@/Fooks/useMessage";
import { Category } from "@/types/api/Category";
import { Method } from "@/types/api/Method";
import { Payment, PaymentData, PaymentError, PaymentPageInfo } from "@/types/api/Payment";
import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

export type PaymentApiProps = {
    page?: number;
    payments?: Array<Payment>;
    year?: number;
    month?: number;
    paymentData?: PaymentData | null;
    paymentId?: number;
    categoryId?: number;
    methodId?: number;
    deleteIds?: Array<Number>;
    order?: string;
    data?: Array<Number> | number;
    setCurrentCategories?: Dispatch<SetStateAction<Array<Category>>>;
    setCurrentMethod?: Dispatch<SetStateAction<Method | null>>;
    resetData?: () => void;
    onClose?: () => void;
    setLoading?: Dispatch<SetStateAction<boolean>>;
};

const usePayment = () => {
    const [paymentData, setPaymentData] = useState<PaymentData | null>({
        methodId: null,
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
    const [updateCount, setUpdateCount] = useState(0);
    const [paymentPageInfo, setPaymentPageInfo] = useState<PaymentPageInfo | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [loading, setLoading] = useState(false); 
    const { getMessage } = useMessage();


    /**
     * フォームデータ初期化
     */
    const resetData = useCallback(() => {
        setPaymentData({
            methodId: null,
            name: "",
            price: "",
            date: "",
            deleteIds: [],
            keyword: "",
            minPrice: "",
            maxPrice: "",
        });
    }, []);

    /**
     * エラーメッセージ初期化
     */
    const resetError = useCallback(() => {
        setPaymentError({
            name: "",
            price: "",
            date: "",
        });
    }, []);

    /**
     * 削除用チェックボックスイベント
     */
    const onChangeDeleteIds = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (paymentData!.deleteIds.includes(Number(e.target.value))) {
            const newDeleteIds = paymentData!.deleteIds.filter((id) => id !== Number(e.target.value));
            setPaymentData({...paymentData!, deleteIds: newDeleteIds});
        } else {
            setPaymentData({...paymentData!, deleteIds: [...paymentData!.deleteIds, Number(e.target.value)]});
        }
    }, [paymentData!.deleteIds]);

    /**
     * 月ごとのデータ取得
     */
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
                setTotalPrice(res.data.totalPrice);
            })
            .catch((err) => {
                getMessage({ title: "データが取得できませんでした", status: "error" });
                console.log(err);
            })
            .finally(() => setPaymentProcessing(false));
    }, []);

    /**
     * カテゴリー毎のデータ取得
     */
    const getCategoryPayments = useCallback((props: PaymentApiProps) => {
        const { year = 2024, month = 1, categoryId = null, page = 1 } = props;

        setPaymentProcessing(true);
        axios.get(route("payments.get_category_payments", {category_id: categoryId}), {
            params: {
                year,
                month,
                page,
            }
        })
        .then((res) => {
            setPayments(res.data.payments.data);
            setPaymentPageInfo(res.data.payments);
            setTotalPrice(res.data.totalPrice);
        })
        .catch((err) => {
            getMessage({ title: "データが取得できませんでした", status: "error" });
            console.log(err);
        })
        .finally(() => setPaymentProcessing(false));
    }, []);

    /**
     * 決済情報毎のデータ取得
     */
    const getMethodPayments = useCallback((props: PaymentApiProps) => {
        const { year = 2024, month = 1, methodId = null, page = 1 } = props;

        setPaymentProcessing(true);
        axios.get(route("payments.get_method_payments", {method_id: methodId}), {
            params: {
                year,
                month,
                page,
            }
        })
        .then((res) => {
            setPayments(res.data.payments.data);
            setPaymentPageInfo(res.data.payments);
            setTotalPrice(res.data.totalPrice);
        })
        .catch((err) => {
            getMessage({ title: "データが取得できませんでした", status: "error" });
            console.log(err);
        })
        .finally(() => setPaymentProcessing(false));
    }, []);


    /**-----------------------
     * データ操作
    --------------------------*/


    /**
     * データ追加
     */
    const addPayment = useCallback((props: PaymentApiProps) => {
        const { payments, paymentData = null, year = null, month = null, resetData = null, setLoading = null } = props;
        
        setLoading!(true);
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
                        setUpdateCount((cnt) => cnt + 1);
                    }
                    resetData!();
                    resetError();
                }            
            })
            .catch((err) => {
                getMessage({ title: "データを追加できません", status: "error" });
                console.log(err);
            })
            .finally(() => setLoading!(false));
    }, []);

    /**
     * データ編集
     */
    const editPayment = useCallback((props: PaymentApiProps) => {
        const { payments, paymentData = null, paymentId = null, year = null, month = null, setLoading = null } = props;
        
        setLoading!(true);
        axios.put(route("payments.update", {payment_id: paymentId}), {
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
                        setUpdateCount((cnt) => cnt + 1);
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
            .finally(() => setLoading!(false));
    }, []);

    /**
     * データ削除
     */
    const deletePayment = useCallback((props: PaymentApiProps) => {
        const { payments, deleteIds = [], onClose = null, resetData = null, setLoading = null } = props;

        setLoading!(true);
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
            setUpdateCount((cnt) => cnt + 1);

            resetData!();
            onClose!();
        })
        .catch((err) => {
            getMessage({ title: "データを削除できません", status: "error" });
            console.log(err);
        })
        .finally(() => setLoading!(false));
    }, []);



    /**------------------------
     * タグ関連
     -------------------------*/

    /**
     * 各データ毎のカテゴリー取得
     */
    const getCategoryLists = useCallback((props: PaymentApiProps) => {
        const { paymentId = null, setCurrentCategories = null } = props;

        axios.get(route("payments.get_categories", {payment_id: paymentId}))
            .then((res) => setCurrentCategories!(res.data.categories))
            .catch((err) => console.log(err));
    }, []);

    /**
     * 各データのカテゴリー追加、削除
     */
    const toggleCategory = useCallback((props: PaymentApiProps) => {
        const { paymentId = null, data = [], setCurrentCategories = null, setLoading = null } = props;

        setLoading!(true);
        axios.put(route("payments.toggle_category", {payment_id: paymentId}), {
            data
        })
        .then((res) => {
            if (res.data.error) {
                getMessage({ title: res.data.error, status: "warning" });
            } else {
                getMessage({ title: "タグを更新しました", status: "success" });
                setCurrentCategories!(res.data.currentCategories);
            }
        })
        .catch((err) => {
            getMessage({ title: "タグ更新中にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => setLoading!(false));
    }, []);

    /**
     * 各データ毎の決済情報取得
     */
    const getMethodList = useCallback((props: PaymentApiProps) => {
        const { paymentId = null, setCurrentMethod = null } = props;

        axios.get(route("payments.get_method", {payment_id: paymentId}))
            .then((res) => {
                setCurrentMethod!(res.data.method);
            })
            .catch((err) => console.log(err));
    }, []);

    /**
     * 各データ毎の決済タグ変更
     */
    const toggleMethod = useCallback((props: PaymentApiProps) => {
        const { paymentId = null, data = null, setCurrentMethod = null, setLoading = null } = props;

        setLoading!(true);
        axios.put(route("payments.toggle_method", {payment_id: paymentId}), {
            data
        })
        .then((res) => {
            getMessage({ title: "タグを更新しました", status: "success" });
            setCurrentMethod!(res.data.currentMethod);
        })
        .catch((err) => {
            getMessage({ title: "タグ更新中にエラーが発生しました", status: "error" });
            console.log(err);
        })
        .finally(() => setLoading!(false));
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
        totalPrice,
        getCurrentPayments,
        getCategoryPayments,
        getMethodPayments,
        addPayment,
        editPayment,
        deletePayment,
        getCategoryLists,
        toggleCategory,
        getMethodList,
        toggleMethod,
        updateCount,
        loading,
        setLoading
    };
};

export default usePayment;