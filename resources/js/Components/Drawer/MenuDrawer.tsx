import MenuAccordion from "@/Components/Accordion/MenuAccordion";
import AppIcon from "@/Components/Icon/AppIcon";
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    setLogoutProcessing: Dispatch<SetStateAction<boolean>>;
};

const MenuDrawer: FC<Props> = memo((props) => {
    const { isOpen, onClose, setLogoutProcessing } = props;

    return (
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            autoFocus={false}
        >
            <DrawerOverlay />
            <DrawerContent bg="gray.100">
                <DrawerCloseButton />
                <DrawerHeader p={0}>
                    <Box h={32} p={4} borderBottom="2px solid #55f">
                        <AppIcon fontSize={{ base: 48 }} />
                        <Heading size="sm" mt={4} >帳簿管理サイト</Heading>
                    </Box>
                </DrawerHeader>
                <DrawerBody p={0} bg="gray.300">

                    <MenuAccordion
                        setLogoutProcessing={setLogoutProcessing}
                    />

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
});

export default MenuDrawer;