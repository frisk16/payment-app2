import { Checkbox } from "@chakra-ui/react";
import { ChangeEvent, FC, ReactNode } from "react";

type Props = {
    isChecked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
    name?: string;
    size?: {};
};

const SCheckbox: FC<Props> = (props) => {
    const { isChecked, onChange, children = undefined, name = "", size = { base: "sm", md: "md" } } = props;

    return <Checkbox
                isChecked={isChecked}
                onChange={onChange}
                name={name}
                size={size}
            >
                {children}
            </Checkbox>
};

export default SCheckbox;