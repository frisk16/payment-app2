import BaseMethodPaymentsPage from "@/Pages/Method/BaseMethodPaymentsPage";
import { PageProps } from "@/types";
import { Method } from "@/types/api/Method";
import { FC } from "react";

type Props = {
    auth: PageProps['auth'];
    method: Method;
    currentYear: number;
    currentMonth: number;
};

const ShowPage: FC<Props> = (props) => {
    const { auth, method, currentYear, currentMonth } = props;

    const year = route().params.year ? Number(route().params.year) : currentYear;
    const month = route().params.month ? Number(route().params.month) : currentMonth;
    const date = `${year}年${month}月のデータ`;
    const pageTitle = `${method.name}のデータ`;

    return (

        <BaseMethodPaymentsPage
            auth={auth}
            methodId={method.id}
            year={year}
            month={month}
            date={date}
            pageTitle={pageTitle}
        />

    )
};

export default ShowPage;