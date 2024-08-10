import ApplicationLogo from "@/Components/Default/ApplicationLogo";
import GuestHeader from "@/Components/Header/GuestHeader";
import { Box, Center } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
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

            <Center my={16}>
                <Link href="/">
                    <ApplicationLogo height={64} />
                </Link>
            </Center>
            
            {children}
        </Box>
    )
});

export default GuestLayout;