import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    w?: {};
    loading?: boolean;
    disabled?: boolean;
    size?: {};
    onClick?: () => void;
};

const SuccessButton: FC<Props> = ((props) => {
    const { children, w = {}, loading = false, disabled = false, size = { base: "sm", md: "md" }, onClick = undefined } = props;

    return <Button w={w} size={size} isLoading={loading} isDisabled={disabled} onClick={onClick} bg="green.400" _hover={{ opacity: 0.5 }} color="white">{children}</Button>
});

export default SuccessButton;