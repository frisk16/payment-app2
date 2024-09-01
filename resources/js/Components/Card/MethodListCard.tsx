import DeleteIconButton from "@/Components/Button/DeleteIconButton";
import { methodIcons } from "@/Components/Icon/MethodIcon";
import DeleteMethodModal from "@/Components/Modal/DeleteMethodModal";
import { Method } from "@/types/api/Method";
import { MethodsPageProps } from "@/types/page/MethodsPage";
import { Box, Card, CardBody, Divider, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    method: Method;
};

const MethodListCard: FC<Props & MethodsPageProps> = memo((props) => {
    const { method, paymentsCounter } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const icon = methodIcons.find((data) => data.name === method!.image);
    const countData = paymentsCounter.find((data) => data.id === method!.id);

    const handleOpenModal = () => {
        onOpen();
    };

    return (
        <Card>
            <CardBody>
                <Flex gap={8} as="a" href={route("methods.show", {id: method.id})}>
                    <Box fontSize="2em">
                        {icon?.element}
                    </Box>
                    <Box w="full">
                        <Heading size="sm">{method.name}</Heading>
                        <Divider border="1px solid gray" />
                        <Text fontSize="0.8em">
                            データ件数：{countData?.count ?? 0}件
                        </Text>
                    </Box>
                </Flex>
                <Box textAlign="right">
                    <DeleteIconButton onClick={handleOpenModal} />
                </Box>
            </CardBody>

            <DeleteMethodModal
                {...props}
                isOpen={isOpen}
                onClose={onClose}
                method={method}
            />
        </Card>
    )
});

export default MethodListCard;