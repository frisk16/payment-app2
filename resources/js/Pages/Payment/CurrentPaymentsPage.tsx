import BasePaymentsPage from "@/Pages/Payment/BasePaymentsPage";
import { PageProps } from "@/types";
import { FC, memo } from "react";

type Props = {
    auth: PageProps["auth"];
    today: string;
    year: number;
    month: number;
};

const CurrentPaymentsPage: FC<Props> = memo((props) => {
    const { auth, today, year, month } = props;

    const pageTitle = "今月のデータ";
    
    return (
        <BasePaymentsPage
            auth={auth}
            date={today}
            year={year}
            month={month}
            pageTitle={pageTitle}
        />
    )
});

export default CurrentPaymentsPage;