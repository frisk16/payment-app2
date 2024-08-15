import ApplicationLogo from "@/Components/Default/ApplicationLogo";
import AsideAccordionButton from "@/Components/Aside/AsideAccordionButton";
import AsideAccordionItem from "@/Components/Aside/AsideAccordionItem";
import { CalendarIcon, ChatIcon, QuestionIcon, SettingsIcon } from "@chakra-ui/icons";
import { Accordion, Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { FC, memo, useState } from "react";
import useAccordionOption from "@/Fooks/useAccordionOption";
import Loading from "@/Components/Progress/Loading";
import AppIcon from "@/Components/Icon/AppIcon";

const AuthenticatedAside: FC = memo(() => {
    const { accordionIndex } = useAccordionOption();
    const [logoutProcessing, setLogoutProcessing] = useState(false);

    const logout = () => {
        setLogoutProcessing(true);
        axios.post(route("logout"))
        .finally(() => {
            location.reload();
        });
    };
    
    return (
        <aside>
            {logoutProcessing && (
                <Loading />
            )}

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

                <Box>
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
                            <AsideAccordionButton href={route("categories.setting")} title="カテゴリー管理" rightIcon={<SettingsIcon />} />
                        </AsideAccordionItem>

                        <AsideAccordionItem
                            title="支払い方法詳細"
                            leftIcon={<QuestionIcon />}
                        >
                            <AsideAccordionButton title="支払い方法管理" rightIcon={<SettingsIcon />} />
                        </AsideAccordionItem>

                        <AsideAccordionItem
                            title="ユーザー管理"
                            leftIcon={<SettingsIcon />}    
                        >
                            <AsideAccordionButton href={route("profile.edit")} title="マイページ" />
                            <AsideAccordionButton onClick={logout} title="ログアウト" />
                        </AsideAccordionItem>
                    </Accordion>
                </Box>

            </Box>
        </aside>
    );
});

export default AuthenticatedAside;