import DangerButton from "@/Components/Button/DangerButton";
import DisableButton from "@/Components/Button/DisableButton";
import DeletePaymentModal from "@/Components/Modal/DeletePaymentModal";
import { PaymentsPageProps } from "@/types/page/PaymentsPage";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    resetData: () => void;
    deleteIds: Array<Number>;
};

const DeletePaymentAsideMenu: FC<Props & PaymentsPageProps> = (props) => {
    const { resetData, deleteIds } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const handleOpenModal = () => {
        onOpen();
    }

    return (
        <aside>
            <Box
                position="fixed"
                left={0}
                right={0}
                bottom={0}
                h={16}
                p={4}
                bg="gray.400"
                zIndex={10}
            >
                <Flex justifyContent="end" alignItems="center" gap={2}>
                    <Text color="white" fontWeight="bold">{deleteIds.length}件選択中</Text>
                    <DisableButton onClick={resetData}>選択解除</DisableButton>
                    <DangerButton onClick={handleOpenModal} leftIcon={<DeleteIcon />}>削除</DangerButton>
                </Flex>
            </Box>

            <DeletePaymentModal
                {...props}
                isOpen={isOpen}
                onClose={onClose}
                deleteIds={deleteIds}
                resetData={resetData}
            />
        </aside>
    )
};

export default DeletePaymentAsideMenu;