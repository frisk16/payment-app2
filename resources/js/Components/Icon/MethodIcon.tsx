import { BsCashCoin, BsQrCode } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";
import { FaAmazon, FaApple, FaCcAmex, FaCcDinersClub, FaCcJcb, FaCcMastercard, FaCcPaypal, FaCcVisa, FaCreditCard, FaGoogle, FaLine, FaRobot } from "react-icons/fa6";
import { GiPenguin } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdAtm } from "react-icons/md";
import { SiRakuten } from "react-icons/si";
import { TbBrandPaypay } from "react-icons/tb";

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
        name: "money",
        element: <BsCashCoin size="2em" />
    },
    {
        name: "paypal",
        element: <FaCcPaypal size="2em" />
    },
    {
        name: "rakuten",
        element: <SiRakuten size="2em" />
    },
    {
        name: "phone",
        element: <IoIosPhonePortrait size="2em" />
    },
    {
        name: "qr",
        element: <BsQrCode size="2em" />
    },
    {
        name: "line",
        element: <FaLine size="2em" />
    },
    {
        name: "amazon",
        element: <FaAmazon size="2em" />
    },
    {
        name: "atm",
        element: <MdAtm size="2em" />
    },
    {
        name: "paypay",
        element: <TbBrandPaypay size="2em" />
    },
    {
        name: "google",
        element: <FaGoogle size="2em" />
    },
    {
        name: "apple",
        element: <FaApple size="2em" />
    },
    {
        name: "android",
        element: <DiAndroid size="2em" />
    },
    {
        name: "suica",
        element: <GiPenguin size="2em" />
    },
    {
        name: "pasmo",
        element: <FaRobot size="2em" />
    }
];
