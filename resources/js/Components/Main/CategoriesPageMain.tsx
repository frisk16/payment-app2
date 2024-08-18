import CategoryBadge from "@/Components/Badge/CategoryBadge";
import AddButton from "@/Components/Button/AddButton";
import NotFound from "@/Components/Default/NotFound";
import AddCategoryModal from "@/Components/Modal/AddCategoryModal";
import CategoryProgress from "@/Components/Progress/CategoryProgress";
import Loading from "@/Components/Progress/Loading";
import { CategoriesPageProps } from "@/types/page/CategoriesPage";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardHeader, Divider, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
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
                    <ul>
                        {categories[0] ? (
                            categories.map((category) => (
                                <li key={category.id}>
                                    <Box
                                        w={{ base: "full", lg: "80%" }}
                                        mx="auto"
                                        p={2}
                                        mb={2}
                                    >
                                        <Flex alignItems="end" gap={2}>
                                            <Box as="a" href="#">
                                                <CategoryBadge fontSize={{ base: "1.1em", md: "1.2em" }}>{category.name}</CategoryBadge>
                                                <Text fontSize="0.8em">データ件数：15件／500件</Text>
                                            </Box>
                                            <Box ms="auto" color="red" cursor="pointer" onClick={() => {}}>
                                                <DeleteIcon />
                                            </Box>
                                        </Flex>
                                        <Box mt={2}>
                                            <CategoryProgress value={15} />
                                        </Box>
                                    </Box>
                                </li>
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