import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onClick: () => void;
    w?: {};
    size?: {};
};

const AddButton: FC<Props> = (props) => {
    const { children, onClick, w = {}, size = { base: "sm", md: "md" } } = props;

    return <Button w={w} size={size} onClick={onClick} leftIcon={<AddIcon />} variant="outline" colorScheme="blue">{children}</Button>
};

export default AddButton;