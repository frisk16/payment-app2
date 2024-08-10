import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const ActivePageLinkButton: FC<Props> = (props) => {
    const { children } = props;

    return <Button
                size={{ base: "sm", md: "md" }}
                bg="teal.500"
                color="white"
                borderRadius={0}
                cursor="default"
                _hover={{}}
            >
                {children}
            </Button>
};

export default ActivePageLinkButton;