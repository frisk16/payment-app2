
export type Payment = {
    id: number;
    name: string;
    price: string;
    date: string;
};

export type PaymentPageInfo = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type PaymentData = {
    name: string;
    price: string;
    date: string;
    deleteIds: Array<Number>;
    keyword: string;
    minPrice: string;
    maxPrice: string;
};

export type PaymentError = {
    name: string;
    price: string;
    date: string;
};