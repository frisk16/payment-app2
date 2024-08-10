import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import { PaymentData } from "@/types/api/Payment";
import { FormControl, InputAddon, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction } from "react";

type Props = {
    paymentData: PaymentData | null;
    setPaymentData: Dispatch<SetStateAction<PaymentData | null>>;
};

const PriceSearchForm: FC<Props> = memo((props) => {
    const { paymentData, setPaymentData } = props;

    return (
        <FormControl>
            <SFormLabel>金額</SFormLabel>
            <InputGroup>
                <InputGroup>
                    <SInput
                        type="number"
                        borderRadius="6px 0 0 6px"
                        value={paymentData!.minPrice}
                        onChange={(e) => setPaymentData({...paymentData!, minPrice: e.target.value})}
                    />
                    <InputRightElement color="gray.500">￥</InputRightElement>
                </InputGroup>
                <InputAddon borderRadius={0} h="inherit">ー</InputAddon>
                <InputGroup>
                    <SInput
                        type="number"
                        borderRadius="0 6px 6px 0"
                        value={paymentData!.maxPrice}
                        onChange={(e) => setPaymentData({...paymentData!, maxPrice: e.target.value})}
                    />
                    <InputRightElement color="gray.500">￥</InputRightElement>
                </InputGroup>
            </InputGroup>
        </FormControl>
    )
});

export default PriceSearchForm;