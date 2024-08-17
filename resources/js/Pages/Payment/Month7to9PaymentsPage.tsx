import BasePaymentsPage from "@/Pages/Payment/BasePaymentsPage";
import { PageProps } from "@/types";
import { FC, memo } from "react";

type Props = {
    auth: PageProps["auth"];
    year: number;
};

const Month7to9PaymentsPage: FC<Props> = memo((props) => {
    const { auth, year } = props;
    
    const month = route().params.month && route().params.month.match(/^(7|8|9)$/) ? Number(route().params.month) : 1;
    const pageTitle = `${month}月のデータ`;
    const date = `${year}年${month}月のデータ`;    

    return (
        <BasePaymentsPage
            auth={auth}
            date={date}
            year={year}
            month={month}
            pageTitle={pageTitle}
        />
    )
});

export default Month7to9PaymentsPage;