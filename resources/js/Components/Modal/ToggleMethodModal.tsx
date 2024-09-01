import DisableButton from "@/Components/Button/DisableButton";
import SuccessButton from "@/Components/Button/SuccessButton";
import NotFound from "@/Components/Default/NotFound";
import SSelect from "@/Components/Form/SSelect";
import useMethod from "@/Fooks/Api/useMethod";
import { PaymentApiProps } from "@/Fooks/Api/usePayment";
import { Method } from "@/types/api/Method";
import { Box, Flex, FormControl, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction, useEffect, useMemo, useState } from "react";

type Props = {
    paymentId: number;
    setCurrentMethod: Dispatch<SetStateAction<Method | null>>;
    toggleMethod: (props: PaymentApiProps) => void;
    isOpen: boolean;
    onClose: () => void;
};

const ToggleMethodModal: FC<Props> = memo((props) => {
    const { paymentId, setCurrentMethod, toggleMethod, isOpen, onClose } = props;

    const [data, setData] = useState(0);
    const [loading, setLoading] = useState(false);
    const { methods, getMethods } = useMethod();

    useMemo(() => {
        setData(0);
    }, [isOpen]);

    const handleToggleMethod = () => {
        toggleMethod({ paymentId, data, setCurrentMethod, setLoading });
    };

    useEffect(() => getMethods(), []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        決済方法選択
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl>
                        <Flex gap={4} flexWrap="wrap">
                            {methods[0] ? (
                                <SSelect defaultValue="0" onChange={(e) => setData(Number(e.target.value))}>
                                    <option value="0">不明</option>
                                    {methods.map((method) => (
                                        <option key={method.id} value={method.id}>{method.name}</option>
                                    ))}
                                </SSelect>
                            ) : (
                                <Box mx="auto">
                                    <NotFound />
                                </Box>
                            )}
                            {}
                        </Flex>
                    </FormControl>
                </ModalBody>

                <ModalFooter gap={2}>

                    <DisableButton onClick={onClose}>閉じる</DisableButton>
                    <SuccessButton
                        onClick={handleToggleMethod}
                        disabled={!methods[0] || loading}
                        loading={loading}
                    >
                        更新
                    </SuccessButton>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default ToggleMethodModal;