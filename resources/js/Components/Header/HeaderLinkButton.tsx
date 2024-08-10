import { As, Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    href?: string;
};

const HeaderLinkButton: FC<Props> = (props) => {
    const { children, href = "" } = props;

    return <Button
                as="a"
                href={href}
                h={16} color="gray"
                borderBottom="1px solid #ccc"
                bg="white"
                borderRadius={0}
                fontSize={{ base: "0.8em", md: "1em" }}
                _hover={{ borderBottom: "1px solid #000" }}
            >
                {children}
            </Button>
};

export default HeaderLinkButton;