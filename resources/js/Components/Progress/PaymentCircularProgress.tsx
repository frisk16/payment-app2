import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    totalPrice: number;
    progressNumberColor: string;
};

const PaymentCircularProgress: FC<Props> = (props) => {
    const { totalPrice, progressNumberColor } = props;

    return (
        <CircularProgress value={(totalPrice / 300000) * 100} size={240} color={progressNumberColor}>
            <CircularProgressLabel fontSize={24} fontWeight="bold">
                ￥ { new Intl.NumberFormat().format(totalPrice) } 円
            </CircularProgressLabel>
            <CircularProgressLabel mt={8} fontSize={16}>
                最大 300,000 円
            </CircularProgressLabel>
        </CircularProgress>
    )
};

export default PaymentCircularProgress;