import { memo, FC } from 'react';
import { Box, Heading, Text, useDisclosure } from '@chakra-ui/react';
import DangerButton from '@/Components/Button/DangerButton';
import DeleteUserModal from '@/Components/Modal/DeleteUserModal';

const DeleteUserForm: FC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpenModal = () => {
        onOpen();
    };

    return (
        <Box w={{ base: "100%", md: "480px", lg: "560px"}}>

            <Heading size="sm">アカウント削除</Heading>
            <Text fontSize="0.7em" color="#555">アカウント情報を削除すると、全ての支払いデータも削除されます</Text>

            <Box mt={4}>
                <DangerButton onClick={handleOpenModal}>アカウント削除</DangerButton>
            </Box>

            <DeleteUserModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </Box>
    );
});

export default DeleteUserForm;
