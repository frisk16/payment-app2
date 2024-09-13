import ThemeIcon from "@/Components/Icon/ThemeIcon";
import { Box, Center } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const DefaultLayout: FC<Props> = memo((props) => {
    const { children } = props;

    return (
        <Box mb={16}>
            <Center my={16}>
                <ThemeIcon w={{ base: 48, md: 56 }} />
            </Center>

            {children}
        </Box>
    )
});

export default DefaultLayout;