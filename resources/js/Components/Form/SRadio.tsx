import { Radio } from "@chakra-ui/react";
import { ChangeEvent, FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    size?: {};
    checked?: boolean;
};

const SRadio: FC<Props> = (props) => {
    const { children, value, onChange, size = { base: "sm", md: "md" }, checked = false } = props;

    return <Radio isChecked={checked} value={value} onChange={onChange} size={size} colorScheme="green" >{children}</Radio>
};

export default SRadio;