import { Center, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <Center
            display="flex"
            flexDirection="column"
            position="fixed"
            zIndex={30}
            inset={0}
            bg="rgba(255, 255, 255, 0.5)"
        >
            <Spinner
                size="xl"
                thickness="4px"
                color="blue.400"
                emptyColor="gray.300"
            />
            <Text>お待ちください</Text>
        </Center>
    )
};

export default Loading;