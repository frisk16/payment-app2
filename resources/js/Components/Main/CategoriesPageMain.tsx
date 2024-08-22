import AddButton from "@/Components/Button/AddButton";
import NotFound from "@/Components/Default/NotFound";
import AddCategoryModal from "@/Components/Modal/AddCategoryModal";
import CategoryPageProgress from "@/Components/Progress/CategoryPageProgress";
import Loading from "@/Components/Progress/Loading";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { Card, CardBody, CardHeader, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";

const CategoriesPageMain: FC<CategoriesPageProps> = memo((props) => {
    const { year, categories, categoryProcessing, paymentsCounter, resetData, resetError } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const handleOpenModal = () => {
        resetData();
        resetError();
        onOpen();
    }

    return (
        <header>
            {categoryProcessing && (
                <Loading />
            )}

            <Card>
                <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm">{year}年総計</Heading>
                        <AddButton onClick={handleOpenModal}>追加</AddButton>
                    </Flex>
                </CardHeader>
                <Divider color="gray.300" />
                <CardBody>
                    <ul>
                        {categories[0] ? (
                            categories.map((category) => (

                                <CategoryPageProgress
                                    key={category.id}
                                    category={category}
                                    paymentsCounter={paymentsCounter}
                                />
                                
                            ))
                        ) : (
                            <NotFound />
                        )}
                    </ul>
                </CardBody>
            </Card>

            <AddCategoryModal
                isOpen={isOpen}
                onClose={onClose}
                {...props}
            />
        </header>
    )
});

export default CategoriesPageMain;