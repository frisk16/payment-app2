import { As, Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    as?: As;
    href?: string;
    w?: {};
    loading?: boolean;
    disabled?: boolean;
    size?: {};
    onClick?: () => void;
};

const PrimaryButton: FC<Props> = ((props) => {
    const { children, href = undefined, as = "button", w = {}, loading = false, disabled = false, size = { base: "sm", md: "md" }, onClick = undefined } = props;

    return <Button
                as={as}
                href={href}
                w={w}
                size={size}
                isLoading={loading}
                isDisabled={disabled}
                onClick={onClick}
                bg="blue.400"
                _hover={{ opacity: 0.5 }}
                color="white"
            >
                {children}
            </Button>
});

export default PrimaryButton;