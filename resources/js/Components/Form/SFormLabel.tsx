import { FormLabel } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    fontSize?: {};
};

const SFormLabel: FC<Props> = (props) => {
    const { children, fontSize = { base: "0.8em", md: "1em" } } = props;

    return <FormLabel fontSize={fontSize}>{children}</FormLabel>
};

export default SFormLabel;