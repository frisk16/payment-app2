import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { Heading } from "@chakra-ui/react";
import { FC, memo } from "react";

const CategoriesPageHeader: FC<CategoriesPageProps> = memo((props) => {
    return (
        <header>
            <Heading size="sm">準備中</Heading>
        </header>
    )
});

export default CategoriesPageHeader;