import CategoryBadge from "@/Components/Badge/CategoryBadge";
import DeleteIconButton from "@/Components/Button/DeleteIconButton";
import DeleteCategoryModal from "@/Components/Modal/DeleteCategoryModal";
import { Category } from "@/types/api/Category";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Progress, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useMemo, useState } from "react";

type Props = {
    category: Category | null;
}

const CategorySettingProgress: FC<Props & CategoriesPageProps> = (props) => {
    const { category, paymentsCounter, categories, categoryProcessing, deleteCategory } = props;

    const [count, setCount] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpenModal = () => {
        onOpen();
    }

    useMemo(() => {
        const currentPaymentsCounter = paymentsCounter.find((counter) => counter.id === category!.id);
        setCount(currentPaymentsCounter?.count ?? 0);
    }, []);

    return (
            <li>
                <Box
                    w={{ base: "full", lg: "80%" }}
                    mx="auto"
                    p={2}
                    mb={2}
                >
                    <Flex alignItems="end" gap={2}>
                        <Box as="a" href={route("categories.show", {id: category!.id})}>
                            <CategoryBadge fontSize={{ base: "1.1em", md: "1.2em" }}>{category!.name}</CategoryBadge>
                            <Text fontSize="0.8em">データ件数：{count}件／500件</Text>
                        </Box>
                        <Box ms="auto">
                            <DeleteIconButton onClick={handleOpenModal} />
                        </Box>
                    </Flex>
                    <Box mt={2}>
                        <Progress
                            value={(count / 500) * 100}
                            size="sm"
                            colorScheme="green"
                            bgColor="gray.200"
                        />
                    </Box>
                </Box>

                <DeleteCategoryModal
                    isOpen={isOpen}
                    onClose={onClose}
                    category={category}
                    categories={categories}
                    categoryProcessing={categoryProcessing}
                    deleteCategory={deleteCategory}
                />
            </li>
        )
}

export default CategorySettingProgress;