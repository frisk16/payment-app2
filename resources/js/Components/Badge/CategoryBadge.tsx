import { Badge } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    fontSize?: {};
};

const CategoryBadge: FC<Props> = (props) => {
    const { children, fontSize = { base: "0.6em", md: "0.8em" } } = props;

    return <Badge variant="outline" colorScheme="teal" fontSize={fontSize}>{children}</Badge>
};

export default CategoryBadge;