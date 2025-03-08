import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { img } from "framer-motion/client";

const data = [
    { name: "XIANGLIYAO", src: "XiangliYao.gif", x: 60, y: 30 },
    { name: "YINLIN", src: "Yinlin.gif", x: 90, y: 30 },
    { name: "YOUHU", src: "Youhu.gif", x: 60, y: 30 },
    { name: "YANGYANG", src: "Yangyang.gif", x: 60, y: 30 },
    { name: "YUANWU", src: "Yuanwu.gif", x: 60, y: 30 },
    { name: "CHIXIA", src: "Chixia.gif", x: 60, y: 30 },
    { name: "JINHSI", src: "Jinhsi.gif", x: 60, y: 30 },
    { name: "JIYAN", src: "Jiyan.gif", x: 60, y: 30 },
    { name: "VERINA", src: "Verina.gif", x: 60, y: 30 },
    { name: "SHOREKEEPER", src: "Shorekeeper.gif", x: 60, y: 30 },
    { name: "CHANGLI", src: "Changli.gif", x: 60, y: 30 },
    { name: "LINYANG", src: "Linyang.gif", x: 100, y: 30 },
    { name: "ENCORE", src: "Encore.gif", x: 60, y: 30 },
    { name: "DANJIN", src: "Danjin.gif", x: 60, y: 30 },
    { name: "TAOQI", src: "Taoqi.gif", x: 60, y: 30 },
    { name: "MORTEFI", src: "Mortefi.gif", x: 60, y: 30 },
    { name: "JIANXIN", src: "Jianxin.gif", x: 60, y: 30 },
    { name: "ZHEZHI", src: "Zhezhi.gif", x: 60, y: 30 },
    { name: "CHALCARO", src: "Chalcaro.gif", x: 60, y: 30 },
    { name: "BAIZHI", src: "Baizhi.gif", x: 60, y: 30 },
    { name: "ROVER", src: "Rover.gif", x: 60, y: 30 },
    { name: "S.ROVER", src: "Rover.gif", x: 60, y: 30 },
    { name: "H.ROVER", src: "Rover.gif", x: 60, y: 30 },
    { name: "AALTO", src: "Aalto.gif", x: 60, y: 30 },
    { name: "CAMELLYA", src: "Camellya.gif", x: 60, y: 30 },
    { name: "SANHUA", src: "Sanhua.gif", x: 60, y: 30 },
    { name: "CARLOTTA", src: "Carlotta.gif", x: 60, y: 30 },
    { name: "ROCCIA", src: "Roccia.gif", x: 60, y: 30 },
    { name: "PHOEBE", src: "Phoebe.gif", x: 60, y: 30 },
    { name: "BRANT", src: "Brant.webp", x: 60, y: 30 },
];

const HeroAvatar = ({ side, src, charName, x, y, banned, className,idx }) => {
    const [CurrentData, setCurrentData] = useState({ name: "XIANGLIYAO", src: "XiangliYao.gif", x: 60, y: 30 });

    const checkAvatar = () => {
        const current = data?.filter((item) => item.name == charName);
        setCurrentData(current[0]);
    };

    useEffect(() => {
        if (charName !== undefined) {
            checkAvatar();
        }
    }, [charName]);

    const imageVariants = {
        hidden: { scaleX: 1, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 2, ease: "linear" }
        }
    };

    return (
        
            <div
                className={clsx(
                    side === "left" ? "left-side" : "right-side",
                    "relative w-40 h-40 bg-gray-800 clip-parallelogram flex items-center justify-center text-white font-bold overflow-hidden",
                    className
                )}
            >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={charName}
                            initial={{ y: 0 }}
                            animate={{ y: -150 }}
                            exit={{ y: 0 }}
                            src='/overdrive-tour-overlay/GATE1.png'  
                            transition={{ duration: 1, ease: "easeInOut" }} // Durasi 0.3 detik dengan easing smooth
                            className="w-[220px]  top-[-80px] left-0 right-0 mx-auto object-bottom absolute z-50"
                        />
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={charName}
                            initial={{ opacity: 0 }}
                            animate={{  opacity: 1}}
                            exit={{  opacity: 0}}
                            transition={{ duration: .5, delay: .2, ease: "easeInOut" }} 
                            src={(CurrentData && "/overdrive-tour-overlay/char/" + CurrentData.src || "/overdrive-tour-overlay/char/XiangliYao.gif")}
                            className="absolute w-full h-full object-cover top-0 left-0 z-20"
                            style={{ objectPosition: `${CurrentData?.x}% ${CurrentData?.y}%` || "60% 30%" }}
                            alt=""
                        />
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={charName}
                            initial={{ y: -20 }}
                            animate={{ y: 250 }}
                            exit={{ y: -20 }}
                            src='/overdrive-tour-overlay/GATE2.png'
                            transition={{ duration: 1, ease: "easeInOut" }} // Durasi 0.3 detik dengan easing smooth
                            className="w-[220px] top-[30px] left-0 absolute object-bottom z-50"
                        />
                    </AnimatePresence>
                                                            
                <div className="bg-black/80 w-full absolute bottom-0 left-0 h-8 flex justify-center name-label items-center uppercase text-xs z-40">
                    {charName == "XIANGLIYAO" ? "XIANGLI YAO" : charName || "Xiangli Yao"}
                </div>
                {banned && (
                    <div className="absolute left-0 top-0 w-full h-full bg-red-600/40 flex items-center justify-center">
                        <span className="icon-[nimbus--forbidden] text-red-600 size-[30px]"></span>
                    </div>
                )}
            </div>
        
    );
};

export default HeroAvatar;
