import AsideAccordionButton from "@/Components/Aside/AsideAccordionButton";
import AsideAccordionItem from "@/Components/Aside/AsideAccordionItem";
import AsideLinkButton from "@/Components/Aside/AsideLinkButton";
import ApplicationLogo from "@/Components/Default/ApplicationLogo";
import { ArrowLeftIcon, CalendarIcon, ChatIcon, QuestionIcon, SettingsIcon } from "@chakra-ui/icons";
import { Accordion, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading } from "@chakra-ui/react";
import axios from "axios";
import { FC, memo } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    accordionIndex: number[];
};

const MenuDrawer: FC<Props> = memo((props) => {
    const { isOpen, onClose, accordionIndex } = props;

    const logout = () => {
        axios.post(route("logout"))
        .finally(() => location.reload());
    };

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
                        <ApplicationLogo height={64} />
                        <Heading size="sm">帳簿管理サイト</Heading>
                    </Box>
                </DrawerHeader>
                <DrawerBody p={0}>
                    <Box>
                        <AsideLinkButton
                            href={route("dashboard")}
                            leftIcon={<ArrowLeftIcon />}
                        >
                            ホームヘ
                        </AsideLinkButton>

                        <Accordion defaultIndex={accordionIndex} allowMultiple>

                            <AsideAccordionItem
                                title="支払いデータ詳細"
                                leftIcon={<ChatIcon />}
                            >
                                <AsideAccordionButton href={route("payments.current")} title="今月のデータ" />
                                <AsideAccordionButton href={route("payments.month_1to3", {month: 1})} title="1〜3月のデータ" />
                                <AsideAccordionButton href={route("payments.month_4to6", {month: 4})} title="4〜6月のデータ" />
                                <AsideAccordionButton href={route("payments.month_7to9", {month: 7})} title="7〜9月のデータ" />
                                <AsideAccordionButton href={route("payments.month_10to12", {month: 10})} title="10〜12月のデータ" />
                            </AsideAccordionItem>

                            <AsideAccordionItem
                                title="カテゴリー詳細"
                                leftIcon={<CalendarIcon />}
                            >
                                <AsideAccordionButton href={route("dashboard")} title="カテゴリー管理" rightIcon={<SettingsIcon />} />
                                <AsideAccordionButton href={route("dashboard")} title="交通費" />
                                <AsideAccordionButton href={route("dashboard")} title="生活費" />
                            </AsideAccordionItem>

                            <AsideAccordionItem
                                title="支払い方法詳細"
                                leftIcon={<QuestionIcon />}
                            >
                                <AsideAccordionButton href={route("dashboard")} title="支払い方法管理" rightIcon={<SettingsIcon />} />
                                <AsideAccordionButton href={route("dashboard")} title="Suica" />
                                <AsideAccordionButton href={route("dashboard")} title="クレジットカード" />
                            </AsideAccordionItem>

                            <AsideAccordionItem
                                title="ユーザー管理"
                                leftIcon={<SettingsIcon />}    
                            >
                                <AsideAccordionButton href={route("profile.edit")} title="マイページ" />
                                <AsideAccordionButton href={route("dashboard")} onClick={logout} title="ログアウト" />
                            </AsideAccordionItem>
                        </Accordion>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
});

export default MenuDrawer;