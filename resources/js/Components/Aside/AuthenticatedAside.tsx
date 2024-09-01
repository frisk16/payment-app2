import { Box, Heading } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction } from "react";
import AppIcon from "@/Components/Icon/AppIcon";
import MenuAccordion from "@/Components/Accordion/MenuAccordion";

type Props = {
    updateCount: number;
    setLogoutProcessing: Dispatch<SetStateAction<boolean>>;
};

const AuthenticatedAside: FC<Props> = memo((props) => {    
    const { updateCount, setLogoutProcessing } = props;
    
    return (
        <aside>
            <Box
                display={{ base: "none", lg: "block" }}
                pos="fixed"
                top={0}
                left={0}
                bottom={0}
                bg="gray.300"
                w={60}
            >
                <Box h={32} p={4} borderBottom="2px solid #55f">
                    <AppIcon fontSize={{ base: 48 }} />
                    <Heading size="sm" mt={4} >帳簿管理サイト</Heading>
                </Box>

                <MenuAccordion
                    updateCount={updateCount}
                    setLogoutProcessing={setLogoutProcessing}
                />

            </Box>
        </aside>
    );
});

export default AuthenticatedAside;