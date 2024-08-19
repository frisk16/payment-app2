import BaseCategoryPaymentsPage from "@/Pages/Category/BaseCategoryPaymentsPage";
import { PageProps } from "@/types";
import { Category } from "@/types/api/Category";
import { FC } from "react";

type Props = {
    auth: PageProps['auth'];
    category: Category;
    currentYear: number;
    currentMonth: number;
};

const ShowPage: FC<Props> = (props) => {
    const { auth, category, currentYear, currentMonth } = props;

    const year = route().params.year ? Number(route().params.year) : currentYear;
    const month = route().params.month ? Number(route().params.month) : currentMonth;
    const date = `${year}年${month}月のデータ`;
    const pageTitle = `${category.name}のデータ`;

    return (

        <BaseCategoryPaymentsPage
            auth={auth}
            categoryId={category.id}
            year={year}
            month={month}
            date={date}
            pageTitle={pageTitle}
        />

    )
};

export default ShowPage;