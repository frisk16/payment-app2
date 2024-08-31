import { DeleteIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    onClick: () => void;
};

const DeleteIconButton: FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <Box color="red" cursor="pointer" onClick={onClick}>
            <DeleteIcon />
        </Box>
    )
}

export default DeleteIconButton;