import { Button } from "@chakra-ui/react";
import { FC } from "react";

const ActivePrevPageButton: FC = () => {

    return <Button
                size={{ base: "sm", md: "md" }}
                bg="teal"
                cursor="default"
                borderRadius="6px 0 0 6px"
                borderRight="1px solid #fff"
                color="white"
                _hover={{}}
            >
                    &laquo;
            </Button>

};

export default ActivePrevPageButton;