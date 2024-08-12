import useUrl from "@/Fooks/Url/useUrl";
import { Button, Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    title: string;
    href?: string;
    rightIcon?: ReactNode;
    onClick?: () => void;
};

const AsideAccordionButton: FC<Props> = (props) => {
    const { title, href = "#", rightIcon = undefined, onClick = undefined } = props;
    const { pathName } = useUrl();

    let bg = undefined;
    let color = undefined;
    let hover = 0.5;

    const hrefPathname = href !== "#" ? new URL(href).pathname : "#";
    if (hrefPathname === pathName) {
        bg = "blue.400";
        color = "white";
        hover = 1;
    }

    return (
        <Button
            as="a"
            href={href}
            onClick={onClick}
            h={14}
            w="full"
            fontWeight="normal"
            borderRadius={0}
            bg={bg}
            color={color}
            _hover={{ opacity: hover }}
            ps={8}
        >
            <Flex justifyContent="space-between" w="full" gap={2}>
                <span>{title}</span>
                <span>{rightIcon}</span>
            </Flex>
        </Button>
    )
};

export default AsideAccordionButton;