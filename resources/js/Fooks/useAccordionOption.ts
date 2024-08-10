import useUrl from "@/Fooks/Url/useUrl";
import { useMemo, useState } from "react";

const useAccordionOption = () => {
    const [accordionIndex, setAccordionIndex] = useState<number[]>([]);
    const pathNameLists = ["/payments", "/categories", "/methods", "/profile"];
    const { pathName } = useUrl();
    
    useMemo(() => {
        pathNameLists.map((list, i) => {
            pathName.indexOf(list) !== -1 ? setAccordionIndex([i]) : null;
        });
    }, []);

    return { accordionIndex };
};

export default useAccordionOption;