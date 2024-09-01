import DisableButton from "@/Components/Button/DisableButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import SFormLabel from "@/Components/Form/SFormLabel";
import SInput from "@/Components/Form/SInput";
import SRadio from "@/Components/Form/SRadio";
import { methodIcons } from "@/Components/Icon/MethodIcon";
import { MethodsPageProps } from "@/types/page/MethodsPage";
import { FormControl, FormErrorMessage, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, RadioGroup, Stack } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const AddMethodModal: FC<Props & MethodsPageProps> = memo((props) => {
    const {
        isOpen,
        onClose,
        methods,
        methodError,
        methodData,
        methodProcessing,
        setMethodData,
        addMethod,
    } = props;

    
    const handleAddCategory = () => {
        addMethod({ methodData, methods });
    };    

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        決済情報追加
                    </Heading>
                </ModalHeader>
                <ModalBody>
                    <Stack spacing={4}>

                        <FormControl isRequired isInvalid={methodError!.name !== ""}>
                            <SFormLabel>タイトル</SFormLabel>
                            <SInput
                                type="text"
                                placeholder="10文字以内"
                                value={methodData!.name}
                                onChange={(e) => setMethodData({...methodData!, name: e.target.value})}
                            />
                            {methodError!.name !== "" && (
                                <FormErrorMessage>{methodError!.name}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isRequired isInvalid={methodError!.image !== ""}>
                            <SFormLabel>テーマ画像</SFormLabel>
                            <RadioGroup>
                                <Stack direction="row" spacing={4} wrap="wrap">
                                    {methodIcons.map((icon) => (
                                        <SRadio key={icon.name} value={icon.name} onChange={(e) => setMethodData({...methodData!, image: e.target.value})}>
                                            {icon.element}
                                        </SRadio>
                                    ))}
                                </Stack>
                            </RadioGroup>
                            {methodError!.image !== "" && (
                                <FormErrorMessage>{methodError!.image}</FormErrorMessage>
                            )}
                        </FormControl>

                    </Stack>
                </ModalBody>
                <ModalFooter gap={2}>

                    <DisableButton onClick={onClose}>閉じる</DisableButton>
                    <PrimaryButton
                        onClick={handleAddCategory}
                        loading={methodProcessing}
                        disabled={methodProcessing}
                    >
                        追加
                    </PrimaryButton>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default AddMethodModal;