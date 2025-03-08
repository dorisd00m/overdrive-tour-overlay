import HeroAvatar from "./HeroAvatar"


const PotraitChar = ({data,idx,side,type})=>{

    

    return(
        <div className="flex pl-[17px]" id='REGIS-A'>
            {data[idx]?.map((item, id) => {
                switch (type) {
                    case 'regis':
                        if (id > 0 && id < 5) {
                            return <HeroAvatar key={id} idx={id} side={side || 'right'} className="mx-[-17px] w-[180px]" charName={item} />
                        }    
                        break;
                    case 'ban':
                        if (id > 4 && id < 8) {
                            return <HeroAvatar key={id} idx={id} side={side || 'right'} className="w-[150px] h-[150px] mx-[-14px]" charName={item} banned={true} />
                        }
                        break;
                    case 'pick':
                        if (id > 7) {
                            return <HeroAvatar key={id} idx={id} side={side || 'right'} className="w-[220px] mx-[-20px]" charName={item} />
                        }
                        break;
                
                    default:
                        
                        break;
                }
            })}
        </div>
    )
}
export default PotraitChar