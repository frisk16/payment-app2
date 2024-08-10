import PaymentsSearchForm from "@/Components/Form/PaymentsSearchForm";
import PaymentsProgressData from "@/Components/Progress/PaymentsProgressData";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { Grid, GridItem } from "@chakra-ui/react";
import { FC } from "react";

const PaymentsPageHeader: FC<PaymentsPageProps> = (props) => {

    return (
        <header>
            <Grid
                templateColumns="repeat(2, 1fr)"
                h={240}
                gap={4}
            >
                
                <GridItem colSpan={{ base: 2, xl: 1 }}>
                    <PaymentsProgressData
                        {...props}
                    />
                </GridItem>

                <GridItem colSpan={{ base: 2, xl: 1 }}>
                    <PaymentsSearchForm
                        {...props}
                    />
                </GridItem>

            </Grid>
        </header>
    )
}

export default PaymentsPageHeader;