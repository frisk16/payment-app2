import { Image } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    w?: {};
};

const GuestIcon: FC<Props> = (props) => {
    const { w = { base: 14 } } = props;

    return <Image src="img/GuestIcon.png" w={w} />
};

export default GuestIcon;