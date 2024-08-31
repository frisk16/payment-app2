import DeleteIconButton from "@/Components/Button/DeleteIconButton";
import { methodIcons } from "@/Components/Icon/MethodIcon";
import { Method } from "@/types/api/Method";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    method: Method | null;
    paymentsCounter: Array<{ id: number, count: number }>;
};

const MethodListCard: FC<Props> = memo((props) => {
    const { method, paymentsCounter } = props;

    const icon = methodIcons.find((data) => data.name === method!.image);
    const countData = paymentsCounter.find((data) => data.id === method!.id);

    return (
        <Card>
            <CardBody>
                <Flex gap={8} as="a" href={route("methods.show", {id: method!.id})}>
                    <Box fontSize="2em">
                        {icon?.element}
                    </Box>
                    <Box w="full">
                        <Heading size="sm">{method!.name}</Heading>
                        <Divider border="1px solid gray" />
                        <Text fontSize="0.8em">
                            データ件数：{countData?.count ?? 0}
                        </Text>
                    </Box>
                </Flex>
                <Box textAlign="right">
                    <DeleteIconButton onClick={() => {}} />
                </Box>
            </CardBody>
        </Card>
    )
});

export default MethodListCard;