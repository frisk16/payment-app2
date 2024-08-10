import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    totalPrice: number;
};

const PaymentCircularProgress: FC<Props> = (props) => {
    const { totalPrice } = props;

    return (
        <>
            {totalPrice < 180000 && (
                <CircularProgress value={(totalPrice / 300000) * 100} size={240} color="blue.400">
                    <CircularProgressLabel fontSize={24} fontWeight="bold">
                        ￥ { new Intl.NumberFormat().format(totalPrice) } 円
                    </CircularProgressLabel>
                    <CircularProgressLabel mt={8} fontSize={16}>
                        最大 300,000 円
                    </CircularProgressLabel>
                </CircularProgress>
            )}

            {totalPrice >= 180000 && totalPrice < 240000 && (
                <CircularProgress value={(totalPrice / 300000) * 100} size={240} color="yellow.400">
                    <CircularProgressLabel fontSize={24} fontWeight="bold">
                        ￥ {totalPrice} 円
                    </CircularProgressLabel>
                    <CircularProgressLabel mt={8} fontSize={16}>
                        最大 300,000 円
                    </CircularProgressLabel>
                </CircularProgress>
            )}

            {totalPrice >= 240000 && (
                <CircularProgress value={(totalPrice / 300000) * 100} size={240} color="red.400">
                    <CircularProgressLabel fontSize={24} fontWeight="bold">
                        ￥ {totalPrice} 円
                    </CircularProgressLabel>
                    <CircularProgressLabel mt={8} fontSize={16}>
                        最大 300,000 円
                    </CircularProgressLabel>
                </CircularProgress>
            )}
        </>
    )
};

export default PaymentCircularProgress;