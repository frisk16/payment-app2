import ApplicationLogo from "@/Components/Default/ApplicationLogo";
import { Box, Center } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { FC, memo, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const DefaultLayout: FC<Props> = memo((props) => {
    const { children } = props;

    return (
        <Box mb={16}>
            <Center my={16}>
                <Link href="/">
                    <ApplicationLogo height={64} />
                </Link>
            </Center>
            
            {children}
        </Box>
    )
});

export default DefaultLayout;