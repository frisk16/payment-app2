import { Badge } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const CategoryBadge: FC<Props> = (props) => {
    const { children } = props;

    return <Badge variant="outline" colorScheme="teal" fontSize={{ base: "0.6em", md: "0.8em" }}>{children}</Badge>
};

export default CategoryBadge;