import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    href: string;
};

const PageLinkButton: FC<Props> = (props) => {
    const { children, href } = props;

    return <Button
                as="a"
                href={href}
                size={{ base: "sm", md: "md" }}
                bg="gray.300"
                borderRadius={0}
                borderBottom="2px solid teal"
            >
                {children}
            </Button>
};

export default PageLinkButton;