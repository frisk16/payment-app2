import { Box, Heading } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction } from "react";
import MenuAccordion from "@/Components/Accordion/MenuAccordion";
import ThemeIcon from "@/Components/Icon/ThemeIcon";

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
                <Box p={4} borderBottom="2px solid #55f">
                    <ThemeIcon w={{ base: 40 }} />
                    <Heading mt={4} size="sm">MENU</Heading>
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