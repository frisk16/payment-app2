import { Select } from "@chakra-ui/react";
import { ChangeEvent, FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    size?: {};
};

const SSelect: FC<Props> = (props) => {
    const { children, onChange, size = { base: "sm", md: "md" } } = props;

    return <Select onChange={onChange} size={size}>{children}</Select>
};

export default SSelect;