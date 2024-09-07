import GuestHeader from "@/Components/Header/GuestHeader";
import ThemeIcon from "@/Components/Icon/ThemeIcon";
import { Box, Center } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
};

const GuestLayout: FC<Props> = memo((props) => {
    const { title, children } = props;

    return (
        <Box mb={16}>
            <GuestHeader title={title} />

            <Center my={8}>
                <ThemeIcon />
            </Center>
            
            {children}
        </Box>
    )
});

export default GuestLayout;