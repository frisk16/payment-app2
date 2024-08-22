import { Input } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

type Props = {
    type: "text" | "password" | "email" | "date" | "datetime-local" | "number" | "tel" | "search" | "file" | "hidden";
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    name?: string;
    min?: number;
    placeholder?: string;
    borderRadius?: string;
    size?: {};
};

const SInput: FC<Props> = (props) => {
    const { type, value = undefined, onChange, name = "", min = 0, placeholder = "", borderRadius = undefined, size = { base: "sm", md: "md" } } = props;

    return <Input
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                min={min}
                placeholder={placeholder}
                borderRadius={borderRadius}
                size={size}
            />
};

export default SInput;