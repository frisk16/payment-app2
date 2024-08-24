import { Select } from "@chakra-ui/react";
import { ChangeEvent, FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    defaultValue: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    size?: {};
    border?: string;
};

const SSelect: FC<Props> = (props) => {
    const { children, onChange = null, size = { base: "sm", md: "md" }, border = null, defaultValue } = props;

    return <Select onChange={onChange!} size={size} border={border!} defaultValue={defaultValue}>{children}</Select>
};

export default SSelect;