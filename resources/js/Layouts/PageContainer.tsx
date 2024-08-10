import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const PageContainer: FC<Props> = (props) => {
    const { children } = props;

    return <Box mx={{ base: 4, lg: 8 }} mt={16}>{children}</Box>
};

export default PageContainer;