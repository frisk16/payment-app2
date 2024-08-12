import CategoriesPageHeader from "@/Components/Header/CategoriesPageHeader";
import CategoriesPageMain from "@/Components/Main/CategoriesPageMain";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { FC } from "react";

const CategoriesPageLayout: FC<CategoriesPageProps> = (props) => {
    return (
        <>
            <CategoriesPageHeader
                {...props}
            />

            <CategoriesPageMain
                {...props}
            />
        </>
    )
};

export default CategoriesPageLayout;