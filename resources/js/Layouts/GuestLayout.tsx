import ApplicationLogo from "@/Components/Default/ApplicationLogo";
import GuestHeader from "@/Components/Header/GuestHeader";
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

            <Center my={{ base: 6, md: 16 }}>
                <ApplicationLogo height={48} />
            </Center>
            
            {children}
        </Box>
    )
});

export default GuestLayout;