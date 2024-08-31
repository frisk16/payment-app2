import { FaCcAmex, FaCcDinersClub, FaCcJcb, FaCcMastercard, FaCcPaypal, FaCcVisa, FaCreditCard } from "react-icons/fa6";
import { SiRakuten } from "react-icons/si";

export const methodIcons = [
    {
        name: "credit",
        element: <FaCreditCard size="2em" />
    },
    {
        name: "visa",
        element: <FaCcVisa size="2em" />
    },
    {
        name: "master",
        element: <FaCcMastercard size="2em" />
    },
    {
        name: "jcb",
        element: <FaCcJcb size="2em" />
    },
    {
        name: "diners",
        element: <FaCcDinersClub size="2em" />
    },
    {
        name: "amex",
        element: <FaCcAmex size="2em" />
    },
    {
        name: "paypal",
        element: <FaCcPaypal size="2em" />
    },
    {
        name: "rakuten",
        element: <SiRakuten size="2em" />
    }
];
