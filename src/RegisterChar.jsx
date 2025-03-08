import HeroAvatar from "./HeroAvatar"


const RegisterChar = ({data,idx})=>{
    return(
        <div className="flex pl-[17px]" id='REGIS-A'>
            {data[idx]?.map((item, id) => {
                if (id > 0 && id < 5) {
                    return <HeroAvatar key={id} side="right" className="mx-[-17px] w-[180px]" charName={item} />

                }
            })}
        </div>
    )
}
export default RegisterChar