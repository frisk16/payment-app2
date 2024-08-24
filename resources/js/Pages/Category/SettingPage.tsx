import CategorySettingPageMain from "@/Components/Main/CategorySettingPageMain";
import useCategory from "@/Fooks/Api/useCategory";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC, useEffect } from "react";

type Props = {
    auth: PageProps['auth'];
    year: number;
    paymentsCounter: Array<{ id: number, count: number }>;
};

const SettingPage: FC<Props> = (props) => {
    const { auth, year, paymentsCounter } = props;

    const {
        categoryProcessing,
        categoryData,
        categoryError,
        categories,
        resetData,
        resetError,
        setCategoryData,
        getCategories,
        addCategory,
        deleteCategory
    } = useCategory();

    useEffect(() => getCategories(), []);

    return (
        <AuthenticatedLayout user={auth.user} title="カテゴリー設定">
            <Head title="カテゴリー設定" />

            <CategorySettingPageMain
                year={year}
                categoryProcessing={categoryProcessing}
                categoryData={categoryData}
                categoryError={categoryError}
                categories={categories}
                paymentsCounter={paymentsCounter}
                resetData={resetData}
                resetError={resetError}
                setCategoryData={setCategoryData}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
            />
            
        </AuthenticatedLayout>
    )
};

export default SettingPage;