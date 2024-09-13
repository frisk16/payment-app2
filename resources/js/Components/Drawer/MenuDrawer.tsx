import MenuAccordion from "@/Components/Accordion/MenuAccordion";
import ThemeIcon from "@/Components/Icon/ThemeIcon";
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    updateCount: number;
    setLogoutProcessing: Dispatch<SetStateAction<boolean>>;
};

const MenuDrawer: FC<Props> = memo((props) => {
    const { isOpen, onClose, updateCount, setLogoutProcessing } = props;

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
                    <Box p={4} borderBottom="2px solid #55f">
                        <ThemeIcon w={{ base: 40 }} />
                        <Heading mt={4} size="sm">MENU</Heading>
                    </Box>
                </DrawerHeader>
                <DrawerBody p={0} bg="gray.300">

                    <MenuAccordion
                        setLogoutProcessing={setLogoutProcessing}
                        updateCount={updateCount}
                    />

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
});

export default MenuDrawer;