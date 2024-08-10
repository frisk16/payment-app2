import { Button } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    href: string;
}

const PrevPageButton: FC<Props> = (props) => {
    const { href } = props;

    return <Button
                as="a"
                href={href}
                size={{ base: "sm", md: "md" }}
                bg="gray.400"
                borderRadius="6px 0 0 6px"
                borderRight="1px solid #fff"
                _hover={{ opacity: 0.7 }}
            >
                    &laquo;
            </Button>

};

export default PrevPageButton;