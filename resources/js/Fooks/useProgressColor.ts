import { useCallback, useMemo, useState } from "react";

type Props = {
    total: number;
};

const useProgressColor = () => {
    const [progressNumberColor, setProgressNumberColor] = useState("");

    const setProgressColor = useCallback((props: Props) => {
        const { total } = props;

        if (total < 180000) {
            setProgressNumberColor("blue.500");
        } else if (total >= 180000 && total < 240000) {
            setProgressNumberColor("yellow.500");
        } else {
            setProgressNumberColor("red.500");
        }
    }, []);

    return { progressNumberColor, setProgressColor };
};

export default useProgressColor;