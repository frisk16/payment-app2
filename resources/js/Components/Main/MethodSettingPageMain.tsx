import AddButton from "@/Components/Button/AddButton";
import MethodListCard from "@/Components/Card/MethodListCard";
import NotFound from "@/Components/Default/NotFound";
import AddMethodModal from "@/Components/Modal/AddMethodModal";
import Loading from "@/Components/Progress/Loading";
import { MethodsPageProps } from "@/types/page/MethodsPage";
import { Card, CardHeader, Flex, Grid, GridItem, Heading, useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";

const MethodSettingPageMain: FC<MethodsPageProps> = memo((props) => {
    const { year, methods, methodProcessing, paymentsCounter, resetData, resetError } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const handleOpenModal = () => {
        resetData();
        resetError();
        onOpen();
    }

    return (
        <header>

            {methodProcessing && (
                <Loading />
            )}

            <Card mb={8}>
                <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm">{year}年総計</Heading>
                        <AddButton onClick={handleOpenModal}>追加</AddButton>
                    </Flex>
                </CardHeader>
            </Card>

            {methods[0] ? (

                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                    {methods.map((method) => (
                        <GridItem
                            key={method.id}
                            colSpan={{ base: 12, md: 6, lg: 4, xl: 3 }}
                        >
                            <MethodListCard
                                method={method}
                                paymentsCounter={paymentsCounter}
                            />
                        </GridItem>
                    ))}
                </Grid>

            ) : (
                <NotFound />
            )}

            <AddMethodModal
                isOpen={isOpen}
                onClose={onClose}
                {...props}
            />
        </header>
    )
});

export default MethodSettingPageMain;