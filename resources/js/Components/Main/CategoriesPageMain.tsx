import AddButton from "@/Components/Button/AddButton";
import NotFound from "@/Components/Default/NotFound";
import AddCategoryModal from "@/Components/Modal/AddCategoryModal";
import Loading from "@/Components/Progress/Loading";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { Card, CardBody, CardHeader, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";

const CategoriesPageMain: FC<CategoriesPageProps> = memo((props) => {
    const { year, categories, categoryProcessing } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();    

    return (
        <header>
            {categoryProcessing && (
                <Loading />
            )}

            <Card>
                <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm">{year}年総計</Heading>
                        <AddButton onClick={onOpen}>追加</AddButton>
                    </Flex>
                </CardHeader>
                <Divider color="gray.300" />
                <CardBody>
                    {categories[0] ? (
                        categories.map((category) => (
                            <p key={category.id}>{category.name}</p>
                        ))
                    ) : (
                        <NotFound />
                    )}
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