import CategoryBadge from "@/Components/Badge/CategoryBadge";
import { Category } from "@/types/api/Category";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { FC, useMemo, useState } from "react";

type Props = {
    category: Category | null;
    paymentsCounter: Array<{ id: number, count: number }>;
}

const CategoryPageProgress: FC<Props> = (props) => {
    const { category, paymentsCounter } = props;

    const [count, setCount] = useState(0);
    useMemo(() => {
        const currentPaymentsCounter = paymentsCounter.find((counter) => counter.id === category!.id);
        setCount(currentPaymentsCounter!.count);
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
                        <Box ms="auto" color="red" cursor="pointer" onClick={() => {}}>
                            <DeleteIcon />
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
            </li>
        )
}

export default CategoryPageProgress;