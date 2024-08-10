import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onClick: () => void;
    w?: {};
    size?: {};
};

const DisableButton: FC<Props> = (props) => {
    const { children, onClick, w = {}, size = { base: "sm", md: "md" } } = props;

    return <Button w={w} size={size} onClick={onClick} variant="ghost" colorScheme="gray">{children}</Button>
};

export default DisableButton;