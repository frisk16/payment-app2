import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const HeaderActiveLinkButton: FC<Props> = (props) => {
    const { children } = props;

    return <Button
                h={16}
                borderBottom="2px solid #0a0"
                bg="white"
                borderRadius={0}
                fontSize={{ base: "0.8em", md: "1em" }}
                _hover={{ }}
            >
                {children}
            </Button>
};

export default HeaderActiveLinkButton;