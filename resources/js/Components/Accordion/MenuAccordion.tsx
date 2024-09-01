import AsideAccordionButton from "@/Components/Aside/AsideAccordionButton";
import AsideAccordionItem from "@/Components/Aside/AsideAccordionItem";
import useCategory from "@/Fooks/Api/useCategory";
import useMethod from "@/Fooks/Api/useMethod";
import useAccordionOption from "@/Fooks/useAccordionOption";
import { CalendarIcon, ChatIcon, QuestionIcon, SettingsIcon } from "@chakra-ui/icons";
import { Accordion, Box } from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, FC, memo, SetStateAction, useEffect, useState } from "react";

type Props = {
    setLogoutProcessing: Dispatch<SetStateAction<boolean>>;
    updateCount: number;
};

const MenuAccordion: FC<Props> = memo((props) => {
    const { setLogoutProcessing, updateCount } = props;

    const { accordionIndex } = useAccordionOption();
    const { categories, getCategories } = useCategory();
    const { methods, getMethods } = useMethod();

    useEffect(() => {
        getCategories();
        getMethods();
    }, [updateCount]);

    const logout = () => {
        setLogoutProcessing(true);
        axios.post(route("logout"))
        .finally(() => {
            location.href = route("login");
        });
    };

    return (
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
                    {categories.map((category) => (
                        <AsideAccordionButton key={category.id} href={route("categories.show", {id: category.id})} title={category.name} />
                    ))}
                </AsideAccordionItem>

                <AsideAccordionItem
                    title="決済方法詳細"
                    leftIcon={<QuestionIcon />}
                >
                    <AsideAccordionButton href={route("methods.setting")} title="決済方法管理" rightIcon={<SettingsIcon />} />
                    {methods.map((method) => (
                        <AsideAccordionButton key={method.id} href={route("methods.show", {id: method.id})} title={method.name} />
                    ))}
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
    )
});

export default MenuAccordion;