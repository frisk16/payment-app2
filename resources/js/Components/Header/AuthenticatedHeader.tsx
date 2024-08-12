import ApplicationLogo from "@/Components/Default/ApplicationLogo";
import MenuDrawer from "@/Components/Drawer/MenuDrawer";
import HeaderActiveLinkButton from "@/Components/Header/HeaderActiveLinkButton";
import HeaderLinkButton from "@/Components/Header/HeaderLinkButton";
import useAccordionOption from "@/Fooks/useAccordionOption";
import { User } from "@/types";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { FC, memo } from "react";

type Props = {
    title: string;
    user: User;
};

const AuthenticatedHeader: FC<Props> = memo((props) => {
    const { title, user } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accordionIndex } = useAccordionOption();

    return (
        <header>
            <Box
                bg="white"
                h={16}
                ps={{ base: 4, lg: 64 }}
                pe={4}
                borderBottom="1px solid #ccc"
            >
                <Flex alignItems="center" gap={4} h={16}>
                    <Box>
                        <ApplicationLogo height={32} />
                    </Box>
                    <Box>
                        {route().current("payments.current") ? (
                            <HeaderActiveLinkButton>ホーム</HeaderActiveLinkButton>
                        ) : (
                            <HeaderLinkButton href={route("payments.current")}>ホーム</HeaderLinkButton>
                        )}
                        
                    </Box>
                    <Box ms="auto" fontSize={{ base: "0.8em", md: "1em" }}>
                        ようこそ、{user.name}様
                    </Box>
                </Flex>
            </Box>
            <Box
                bg="white"
                h={16}
                ps={{ base: 4, lg: 64 }}
                pe={2}
            >
                <Flex h={16} alignItems="center" justifyContent="start" gap={4}>
                    {/* Drawer Button */}
                    <HamburgerIcon
                        onClick={onOpen}
                        fontSize="1.5em"
                        cursor="pointer"
                        display={{ base: "block", lg: "none" }}
                        _hover={{ color: "teal" }}
                    />

                    <Heading size="sm">{title}</Heading>
                    <Box ms="auto">
                        {route().current("payments.month_1to3") && (
                            ["1", "2", "3"].map((m) => (
                                m === route().params.month ? (
                                    <HeaderActiveLinkButton key={m}>{m}月</HeaderActiveLinkButton>
                                ) : (
                                    <HeaderLinkButton key={m} href={`?month=${m}`}>{m}月</HeaderLinkButton>
                                )
                            ))
                        )}

                        {route().current("payments.month_4to6") && (
                            ["4", "5", "6"].map((m) => (
                                m === route().params.month ? (
                                    <HeaderActiveLinkButton key={m}>{m}月</HeaderActiveLinkButton>
                                ) : (
                                    <HeaderLinkButton key={m} href={`?month=${m}`}>{m}月</HeaderLinkButton>
                                )
                            ))
                            
                        )}

                        {route().current("payments.month_7to9") && (
                            ["7", "8", "9"].map((m) => (
                                m === route().params.month ? (
                                    <HeaderActiveLinkButton key={m}>{m}月</HeaderActiveLinkButton>
                                ) : (
                                    <HeaderLinkButton key={m} href={`?month=${m}`}>{m}月</HeaderLinkButton>
                                )
                            ))
                        )}

                        {route().current("payments.month_10to12") && (
                            ["10", "11", "12"].map((m) => (
                                m === route().params.month ? (
                                    <HeaderActiveLinkButton key={m}>{m}月</HeaderActiveLinkButton>
                                ) : (
                                    <HeaderLinkButton key={m} href={`?month=${m}`}>{m}月</HeaderLinkButton>
                                )
                            ))
                        )}
                    </Box>
                </Flex>
            </Box>

            <MenuDrawer isOpen={isOpen} onClose={onClose} accordionIndex={accordionIndex} />
        </header>
    )
});

export default AuthenticatedHeader;