import { Progress } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    value: number;
}

const CategoryProgress: FC<Props> = (props) => {
    const { value } = props;

    return (
        <Progress
            value={(value / 500) * 100}
            size="sm"
            colorScheme="green"
            bgColor="gray.200"
        />
    )
}

export default CategoryProgress;