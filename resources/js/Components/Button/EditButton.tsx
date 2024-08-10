import { EditIcon } from "@chakra-ui/icons";
import { FC } from "react";

type Props = {
    onClick: () => void;
};

const EditButton: FC<Props> = (props) => {
    const { onClick } = props;

    return <EditIcon onClick={onClick} cursor="pointer" color="green.600" />
};

export default EditButton;