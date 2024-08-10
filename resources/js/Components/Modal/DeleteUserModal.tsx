import DangerButton from "@/Components/Button/DangerButton";
import SecondaryButton from "@/Components/Button/SecondaryButton";
import SInput from "@/Components/Form/SInput";
import { FormControl, FormErrorMessage, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const DeleteUserModal: FC<Props> = memo((props) => {
    const { isOpen, onClose } = props;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteUser = () => destroy(route('profile.destroy'), {
        onError: () => reset("password"),
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
            <ModalOverlay />
            <ModalContent mx={4}>
                <ModalHeader>
                    <Heading size="sm">
                        アカウントを削除します、よろしいですか？
                    </Heading>
                </ModalHeader>
                <ModalBody>
                    <Text fontSize="0.7em" color="#555">アカウント情報を削除すると、これまでのデータは永久に削除されます。もしよろしければ確認の為、現在のパスワードを入力してください</Text>

                    <FormControl mt={4} isInvalid={errors.password !== undefined}>
                        <SInput
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="現在のパスワード"
                        />
                        {errors.password !== undefined && (
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        )}
                    </FormControl>
                </ModalBody>
                <ModalFooter gap={2}>
                    <SecondaryButton onClick={onClose}>キャンセル</SecondaryButton>
                    <DangerButton disabled={processing} loading={processing} onClick={deleteUser}>アカウント削除</DangerButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});

export default DeleteUserModal;