import { Button } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    href: string;
}

const NextPageButton: FC<Props> = (props) => {
    const { href } = props;

    return <Button
                as="a"
                href={href}
                size={{ base: "sm", md: "md" }}
                bg="gray.400"
                borderRadius="0 6px 6px 0"
                borderLeft="1px solid #fff"
                _hover={{ opacity: 0.7 }}
            >
                    &raquo;
            </Button>

};

export default NextPageButton;