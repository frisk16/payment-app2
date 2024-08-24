import CategoriesProgressData from "@/Components/Progress/CategoriesProgressData";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Box } from "@chakra-ui/react";
import { FC } from "react";

const CategoriesPageHeader: FC<PaymentsPageProps> = (props) => {

    return (
        <header>
            <Box mb={6}>
                <CategoriesProgressData
                    {...props}
                />
            </Box>
        </header>
    )
}

export default CategoriesPageHeader;