import HeaderActiveLinkButton from "@/Components/Header/HeaderActiveLinkButton";
import HeaderLinkButton from "@/Components/Header/HeaderLinkButton";
import AppIcon from "@/Components/Icon/AppIcon";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    title: string;
};

const GuestHeader: FC<Props> = memo((props) => {
    const { title } = props;

    return (
        <header>
            <Box bg="white" h={16} px={{ base: 4, lg: 64 }} borderBottom="1px solid #ccc">
                <Flex alignItems="center" gap={4} h={16}>
                    <Box>
                        <AppIcon />
                    </Box>
                    <Box>

                        {route().current("login") ? (
                            <HeaderActiveLinkButton>ログイン</HeaderActiveLinkButton>
                        ) : (
                            <HeaderLinkButton href={route("login")}>ログイン</HeaderLinkButton>
                        )}
                        
                        {route().current("register") ? (   
                            <HeaderActiveLinkButton>会員登録</HeaderActiveLinkButton>
                        ) : (
                            <HeaderLinkButton href={route("register")}>会員登録</HeaderLinkButton>
                        )}

                    </Box>
                </Flex>
            </Box>
            <Box bg="white" h={16} px={{ base: 4, lg: 64 }}>
                <Flex h={16} alignItems="center">
                    <Heading size={{ base: "xs", md: "sm" }}>{title}</Heading>
                </Flex>
            </Box>
        </header>
    )
});

export default GuestHeader;