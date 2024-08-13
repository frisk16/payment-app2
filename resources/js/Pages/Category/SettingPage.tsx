import useCategory from "@/Fooks/Api/useCategory";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoriesPageLayout from "@/Layouts/CategoriesPageLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { FC, useEffect } from "react";

type Props = {
    auth: PageProps['auth'];
    year: number;
};

const SettingPage: FC<Props> = (props) => {
    const { auth, year } = props;

    const {
        categoryProcessing,
        categoryData,
        categoryError,
        categories,
        resetData,
        resetError,
        setCategoryData,
        getCategories
    } = useCategory();

    useEffect(() => getCategories(), []);

    return (
        <AuthenticatedLayout user={auth.user} title="カテゴリー設定">
            <Head title="カテゴリー設定" />

            <CategoriesPageLayout
                year={year}
                categoryProcessing={categoryProcessing}
                categoryData={categoryData}
                categoryError={categoryError}
                categories={categories}
                resetData={resetData}
                resetError={resetError}
                setCategoryData={setCategoryData}
            />
            
        </AuthenticatedLayout>
    )
};

export default SettingPage;