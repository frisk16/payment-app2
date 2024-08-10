import { Button } from "@chakra-ui/react";
import { FC, ReactElement, ReactNode } from "react";

type Props = {
    children: ReactNode;
    leftIcon?: ReactElement;
    w?: {};
    loading?: boolean;
    disabled?: boolean;
    size?: {};
    onClick?: () => void;
};

const DangerButton: FC<Props> = ((props) => {
    const { children, leftIcon = undefined, w = {}, loading = false, disabled = false, size = { base: "sm", md: "md" }, onClick = undefined } = props;

    return <Button w={w} leftIcon={leftIcon} size={size} isLoading={loading} isDisabled={disabled} onClick={onClick} bg="red.400" _hover={{ opacity: 0.5 }} color="white">{children}</Button>
});

export default DangerButton;