import { LinkIcon } from "@chakra-ui/icons";
import { FC } from "react";

type Props = {
    fontSize?: {};
};

const AppIcon: FC<Props> = (props) => {
    const { fontSize = { base: 24 } } = props;

    return <LinkIcon fontSize={fontSize} />
};

export default AppIcon;