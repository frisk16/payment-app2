import { Image } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    w?: {};
};

const ThemeIcon: FC<Props> = (props) => {
    const { w = { base: 56 } } = props;

    return <Image src="img/AppImage.png" w={w} />
};

export default ThemeIcon;