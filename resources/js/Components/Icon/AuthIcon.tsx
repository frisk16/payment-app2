import { Image } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    w?: {};
};

const AuthIcon: FC<Props> = (props) => {
    const { w = { base: 14 } } = props;

    return <Image src="img/AuthIcon.png" w={w} />
};

export default AuthIcon;