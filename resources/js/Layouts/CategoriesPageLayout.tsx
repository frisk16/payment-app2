import CategoriesPageMain from "@/Components/Main/CategoriesPageMain";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { FC } from "react";

const CategoriesPageLayout: FC<CategoriesPageProps> = (props) => {
    return (
        <>
            <CategoriesPageMain
                {...props}
            />
        </>
    )
};

export default CategoriesPageLayout;