import { ChevronDownIcon, ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    leftIcon: ReactNode;
    href: string;
};

const AsideLinkButton: FC<Props> = (props) => {
    const { children, leftIcon, href } = props;

    return <Button
        as="a"
        href={href}
        bg="gray.300"
        borderRadius={0}
        h={14}
        w="full"
        fontWeight="normal"
        borderBottom="2px solid #eee"
        _hover={{ bg: "gray.400" }}
    >
        <Box display="flex" w="full" justifyContent="start" alignItems="center" gap={2}>
            <span>{leftIcon}</span>
            <span>{children}</span>
        </Box>
    </Button>
};

export default AsideLinkButton;