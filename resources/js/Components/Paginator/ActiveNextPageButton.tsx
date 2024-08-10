import { Button } from "@chakra-ui/react";
import { FC } from "react";

const ActiveNextPageButton: FC = () => {

    return <Button
                size={{ base: "sm", md: "md" }}
                bg="teal"
                cursor="default"
                borderRadius="0 6px 6px 0"
                borderLeft="1px solid #fff"
                color="white"
                _hover={{}}
            >
                    &raquo;
            </Button>

};

export default ActiveNextPageButton;