import AddButton from "@/Components/Button/AddButton";
import AddCategoryModal from "@/Components/Modal/AddCategoryModal";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { Card, CardBody, CardHeader, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";

const CategoriesPageMain: FC<CategoriesPageProps> = memo((props) => {
    const { year, categories } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();    

    return (
        <header>
            <Card>
                <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm">{year}年総計</Heading>
                        <AddButton onClick={onOpen}>追加</AddButton>
                    </Flex>
                </CardHeader>
                <Divider color="gray.300" />
                <CardBody>

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