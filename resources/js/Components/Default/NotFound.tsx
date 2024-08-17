import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";

const NotFound: FC = () => {
    return (
        <Flex flexDirection="column" alignItems="center" gap={4} color="gray" py={8}>
            <WarningIcon fontSize="5em" />
            <Heading size="sm">データがありません</Heading>
        </Flex>
    )
};

export default NotFound;