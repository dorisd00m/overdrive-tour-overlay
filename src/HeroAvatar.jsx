import { clsx } from "clsx"
import { useState,useEffect } from "react"
const data = [
    { name: "XIANGLIYAO", src: "XiangliYao.gif", x: 60, y: 30 },
    { name: "YINLIN", src: "Yinlin.gif", x: 60, y: 30 },
    { name: "YOUHU", src: "Youhu.gif", x: 60, y: 30 },
    { name: "YANGYANG", src: "Yangyang.gif", x: 60, y: 30 },
    { name: "YUANWU", src: "Yuanwu.gif", x: 60, y: 30 },
    { name: "CHIXIA", src: "Chixia.gif", x: 60, y: 30 },
    { name: "JINHSI", src: "Jinhsi.gif", x: 60, y: 30 },
    { name: "JIYAN", src: "Jiyan.gif", x: 60, y: 30 },
    { name: "VERINA", src: "Verina.gif", x: 60, y: 30 },
    { name: "SHOREKEEPER", src: "Shorekeeper.gif", x: 60, y: 30 },
    { name: "CHANGLI", src: "Changli.gif", x: 60, y: 30 },
    { name: "LINYANG", src: "Linyang.gif", x: 60, y: 30 },
    { name: "ENCORE", src: "Encore.gif", x: 60, y: 30 },
    { name: "DANJIN", src: "Danjin.gif", x: 60, y: 30 },
    { name: "TAOQI", src: "Taoqi.gif", x: 60, y: 30 },
    { name: "MORTEFI", src: "Mortefi.gif", x: 60, y: 30 },
    { name: "JIANXIN", src: "Jianxin.gif", x: 60, y: 30 },
    { name: "ZHEZHI", src: "Zhezhi.gif", x: 60, y: 30 },
    { name: "CHALCARO", src: "Chalcaro.gif", x: 60, y: 30 },
    { name: "BAIZHI", src: "Baizhi.gif", x: 60, y: 30 },
    { name: "ROVER", src: "Rover.gif", x: 60, y: 30 },
    { name: "AALTO", src: "Aalto.gif", x: 60, y: 30 },
    { name: "CAMELLYA", src: "Camellya.gif", x: 60, y: 30 },
    { name: "SANHUA", src: "Sanhua.gif", x: 60, y: 30 },
    { name: "CARLOTTA", src: "Sanhua.gif", x: 60, y: 30 },
    { name: "ROCCIA", src: "Sanhua.gif", x: 60, y: 30 },
    { name: "PHOEBE", src: "Sanhua.gif", x: 60, y: 30 },
    { name: "BRANT", src: "Sanhua.gif", x: 60, y: 30 },
];

const HeroAvatar = ({side,src,charName,x,y, banned, className}) => {
    const [CurrentData,setCurrentData] = useState()
    
    const checkAvatar = () => {
        const current = data?.filter((item,id)=>(item.name == charName))
        // console.log(current)
        setCurrentData(current[0])
    }

    useEffect(()=>{
        if(charName !== undefined) {
            checkAvatar()
        }
        
    },[charName])
    useEffect(()=>{
        if(CurrentData?.length){
            console.log(CurrentData)
        }
        
    },[CurrentData])
    
    return(
        <>
            
            <div className={clsx((side === 'left' ? 'left-side' : 'right-side'),'relative w-40 h-40 bg-gray-800 clip-parallelogram flex items-center justify-center text-white font-bold overflow-hidden',className)}>
                <img src={CurrentData && '/char/'+CurrentData.src || '/char/XiangliYao.gif'} className="absolute w-full h-full object-cover" style={{objectPosition:( x && y )? `${x}% ${y}%` : '60% 30%' }} alt="" />
                <div className="bg-black/80 w-full absolute bottom-0 left-0 h-8 flex justify-center name-label items-center uppercase text-xs">
                    {charName == "XIANGLIYAO" ? "XIANGLI YAO" : charName || "Xiangli Yao"}
                </div>
                {banned && 
                    <div className="absolute left-0 top-0 w-full h-full bg-red-600/20 flex items-center justify-center" >
                        <span className="icon-[nimbus--forbidden] text-red-600 size-[30px]"></span>
                    </div>
                }
            </div>
        </>
    )
}
export default HeroAvatar