import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TournamentBracket from './TournamentBracket'
import HeroAvatar from './HeroAvatar'
import { useState, useEffect } from "react"
import { HashRouter, Routes, Route } from "react-router-dom";
import RegisterChar from './RegisterChar'
import PotraitChar from './PotraitChar'

function App() {
  
  const [count, setCount] = useState(0)
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");

  const [sheetCost, setSheetCost] = useState("488856757")
  const [dataCost,setDataCost] = useState([]);
  const [prevDataCost,setPrevDataCost] = useState([]);

  const [sheetBattle, setSheetBattle] = useState("914454523")
  const [dataBattle,setDataBattle] = useState([]);
  const [prevDataBattle,setPrevDataBattle] = useState([]);


  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);

  const [loading, setLoading] = useState(false);


  const extractSpreadsheetId = (url) => {
    const match = url.match(/\/d\/(.*?)(\/|$)/);
    return match ? match[1] : "";
  };

  const fetchCSVData = () => {
    if (!spreadsheetId) return;

    setLoading(true);
    const timestamp = new Date().getTime();
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&_=${timestamp}&gid=0#gid=0`;
    const csvSheetCost = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&_=${timestamp}&gid=${sheetCost}#gid=${sheetCost}`;
    const csvSheetBattle = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&_=${timestamp}&gid=${sheetBattle}#gid=${sheetBattle}`;

    fetch(csvUrl)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv
          .split("\n")
          .filter((row) => row.trim() !== "")
          .map((row) => row.split(",").map((cell) => cell.replace(/(^"|"$)/g, "")))
          .filter((row) => row.length > 1);

        if (JSON.stringify(rows) !== JSON.stringify(data)) {
          setPrevData(data);
          setData(rows);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CSV:", error);
        setLoading(false);
      });

    fetch(csvSheetCost)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv
          .split("\n")
          .filter((row) => row.trim() !== "")
          .map((row) => row.split(",").map((cell) => cell.replace(/(^"|"$)/g, "")))
          .filter((row) => row.length > 1);

        if (JSON.stringify(rows) !== JSON.stringify(data)) {
          setPrevDataCost(data);
          setDataCost(rows);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CSV:", error);
        setLoading(false);
      });
    fetch(csvSheetBattle)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv
          .split("\n")
          .filter((row) => row.trim() !== "")
          .map((row) => row.split(",").map((cell) => cell.replace(/(^"|"$)/g, "")))
          .filter((row) => row.length > 1);

        if (JSON.stringify(rows) !== JSON.stringify(data)) {
          setPrevDataBattle(data);
          setDataBattle(rows);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CSV:", error);
        setLoading(false);
      });
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setSpreadsheetUrl(url);
    localStorage.setItem("spreadsheetUrlOD", url);
    setSpreadsheetId(extractSpreadsheetId(url));
  };

  const sheetCostChange = (e) => {
    const url = e.target.value;
    setSheetCost(url);
    localStorage.setItem("spreadsheetSheetIdCost", url);    
  };

  const sheetBattleChange = (e) => {
    const url = e.target.value;
    setSheetBattle(url);
    localStorage.setItem("spreadsheetSheetIdBattle", url);    
  };


  useEffect(() => {
    fetchCSVData();
    const interval = setInterval(fetchCSVData, 5000);
    return () => clearInterval(interval);
  }, [spreadsheetId]);

  useEffect(()=>{
    if(data) {
      console.log(data)
    }
    if(dataCost) {
      console.log({dataCost: dataCost})
    }
  },[data])

  useEffect(() => {
    const savedUrl = localStorage.getItem("spreadsheetUrlOD");
    const savedSheetIdCost = localStorage.getItem("spreadsheetSheetIdCost");
    const savedSheetIdBattle = localStorage.getItem("spreadsheetSheetIdBattle");
    if (savedUrl) {
      setSpreadsheetUrl(savedUrl);
      setSpreadsheetId(extractSpreadsheetId(savedUrl));
      if(savedSheetIdCost) {
        setSheetCost(savedSheetIdCost)
      }
      if(savedSheetIdBattle) {
        setSheetBattle(savedSheetIdBattle)
      }
    }

    // const handleHashChange = () => {
    //   const hash = window.location.hash.replace("#", "");
    //   const element = document.getElementById(hash);
    //   if (element) {
    //     element.scrollIntoView({ behavior: "smooth", block: "start" });
    //   }
    // };

    // window.addEventListener("hashchange", handleHashChange);
    // return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={
            <>
              <div className='w-full'>
                <input
                  type="text"
                  value={spreadsheetUrl}
                  onChange={handleUrlChange}
                  placeholder="Masukkan URL Google Spreadsheet"
                  className="p-2 border border-gray-300 rounded-md w-full mb-4"
                />
              </div>
              <div className='w-full'>
                <input
                  type="text"
                  value={sheetCost}
                  onChange={sheetCostChange}
                  placeholder="Masukkan SheetId dari COST"
                  className="p-2 border border-gray-300 rounded-md w-full mb-4"
                />
              </div>
              <div className='w-full'>
                <input
                  type="text"
                  value={sheetBattle}
                  onChange={sheetBattleChange}
                  placeholder="Masukkan SheetId dari Battle"
                  className="p-2 border border-gray-300 rounded-md w-full mb-4"
                />
              </div>
              
            </>
          } />
          <Route path="/regis-a" element={<PotraitChar type={'regis'} data={data} idx={1} />} />
          <Route path="/regis-b" element={<PotraitChar type={'regis'} side={'left'} data={data} idx={2} />} />
          <Route path="/ban-a" element={<PotraitChar type={'ban'} data={data} idx={1} />} />
          <Route path="/ban-b" element={<PotraitChar type={'ban'} side={'left'} data={data} idx={2} />} />
          <Route path="/pick-a" element={<PotraitChar type={'pick'} data={data} idx={1} />} />
          <Route path="/pick-b" element={<PotraitChar type={'pick'} side={'left'} data={data} idx={2} />} />
          <Route path="/cost" element={
            <div className="flex ">
              {/* COST A */}
              <div className="flex flex-col ">
                <div className="flex ">
                  <div className='py-2 w-10'>
                    <img src="/overdrive-tour-overlay/character.png" alt="" className='mx-auto' />
                  </div>
                  <div className="flex font-digital" id='COST-CHAR-A'>
                    {dataCost[1]?.map((item, id) => {
                      if (id > 0 && id < 4) {
                        return <div key={id} className='p-2 w-20 text-yellow-500 text-xl flex items-center gap-1'>{item || "--"} <span className='icon-[lsicon--lightning-filled]'></span></div>
                      }
                    })}
                  </div>
                </div>
                <div className="flex pl-5">
                  <div className='py-2 w-10'>
                    <img src="/overdrive-tour-overlay/weapon.png" alt="" className='mx-auto' />
                  </div>
                  <div className="flex font-digital" id='COST-CHAR-A'>
                    {dataCost[1]?.map((item, id) => {
                      if (id > 3 && id < 7) {
                        return <div key={id} className='p-2 w-20 text-yellow-500 text-xl flex items-center gap-1'>{item || "--"} <span className='icon-[lsicon--lightning-filled]'></span></div>
                      }
                    })}
                  </div>
                </div>
              </div>
              {/* {/* TOTAL COST */}
              <div className='flex'>
                <div className='p-2  text-yellow-500 text-4xl flex items-center gap-1 font-digital' id='COST-TOTAL-A'>

                  {dataCost[1]?.map((item, id) => {
                    if (id == 7) {
                      return <div key={id}>{item} /</div>
                    }
                    if (id == 8) {
                      return <div key={id}>{item}</div>
                    }
                  })}
                </div>
                <div className='p-2  text-yellow-500 text-4xl flex items-center gap-1 font-digital' id='COST-TOTAL-B'>

                  {dataCost[2]?.map((item, id) => {
                    if (id == 7) {
                      return <div key={id}>{item} /</div>
                    }
                    if (id == 8) {
                      return <div key={id}>{item}</div>
                    }
                  })}
                </div>
              </div>
              {/* COST B */}
              <div className="flex flex-col ">
                <div className="flex pl-5">
                  <div className="flex font-digital" id='COST-CHAR-B'>
                    {dataCost[2]?.map((item, id) => {
                      if (id > 0 && id < 4) {
                        return <div key={id} className='p-2 w-20 text-yellow-500 text-xl flex justify-end items-center gap-1'>{item || "--"} <span className='icon-[lsicon--lightning-filled]'></span></div>
                      }
                    })}
                  </div>
                  <div className='py-2 w-10'>
                    <img src="/overdrive-tour-overlay/character.png" alt="" className='mx-auto' />
                  </div>
                </div>
                <div className="flex pr-5 ">
                  <div className="flex font-digital" id='COST-WP-B'>
                    {dataCost[2]?.map((item, id) => {
                      if (id > 3 && id < 7) {
                        return <div key={id} className='p-2 w-20 text-yellow-500 text-xl flex justify-end items-center gap-1'>{item || "--"} <span className='icon-[lsicon--lightning-filled]'></span></div>
                      }
                    })}
                  </div>
                  <div className='py-2 w-10'>
                    <img src="/overdrive-tour-overlay/weapon.png" alt="" className='mx-auto' />
                  </div>
                </div>
              </div>
              {/* <div className="flex pr-[20px]">
            {data[2]?.map((item, id) => {
              if (id > 7) {
                return <HeroAvatar key={id} side="left" className="w-[220px] mx-[-20px]" charName={item} />
              }
            })}
          </div> */}
            </div>
          } />
          <Route path="/battle-name" element={
            <>
              <div className="flex flex-col gap-5 w-[300px]">
                <div className='text-left'>
                  {dataBattle[1] ?dataBattle[1]?.map((item, id) => {
                    if (id == 0) {
                      return <div key={id} className='font-jersey-10 text-white text-4xl'>{item}</div>
                    }
                  }) : <div className='font-jersey-10 text-white text-4xl'>--</div>}
                </div>
                <div className="relative p-1 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 w-fit">
                  <div className="w-full p-1 bg-black rounded-full">

                    {dataBattle[1] ? dataBattle[1]?.map((item, id) => {
                      if (id == 1) {
                        return (
                          <div key={id} className='flex gap-1'>
                            {item == 0 && 
                              <>
                                <img src={'./win-0.svg'} alt="" />
                                <img src={'./win-0.svg'} alt="" />
                              </>
                            }
                            {item == 1 && 
                              <>
                                <img src={'./win-1.svg'} alt="" />
                                <img src={'./win-0.svg'} alt="" />
                              </>
                            }
                            {item == 2 && 
                              <>
                                <img src={'./win-1.svg'} alt="" />
                                <img src={'./win-1.svg'} alt="" />
                              </>
                            }
                          </div>
                        )
                      }
                    }) : 
                      <div className='flex gap-1'>                                              
                        <img src={'./win-0.svg'} alt="" />
                        <img src={'./win-0.svg'} alt="" />                                               
                      </div>
                    }
                  </div>                  
                </div>
                <div className="relative p-1 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 w-fit">
                  <div className="w-full p-1 bg-black rounded-full">

                    {dataBattle[2] ? dataBattle[2]?.map((item, id) => {
                      if (id == 1) {
                        return (
                          <div key={id} className='flex gap-1'>
                            {item == 0 &&
                              <>
                                <img src={'./win-0.svg'} alt="" />
                                <img src={'./win-0.svg'} alt="" />
                              </>
                            }
                            {item == 1 &&
                              <>
                                <img src={'./win-1.svg'} alt="" />
                                <img src={'./win-0.svg'} alt="" />
                              </>
                            }
                            {item == 2 &&
                              <>
                                <img src={'./win-1.svg'} alt="" />
                                <img src={'./win-1.svg'} alt="" />
                              </>
                            }
                          </div>
                        )
                      }
                    }) :
                      <div className='flex gap-1'>
                        <img src={'./win-0.svg'} alt="" />
                        <img src={'./win-0.svg'} alt="" />
                      </div>
                    }
                  </div>                  
                </div>
                <div className='text-right'>
                  {dataBattle[2] ? dataBattle[2]?.map((item, id) => {
                    if (id == 0) {
                      return <div key={id} className='font-jersey-10 text-white text-4xl'>{item}</div>
                    }
                  }) : <div  className='font-jersey-10 text-white text-4xl'>--</div>}
                </div>
              </div>
            </>
          } />

        </Routes>
      </HashRouter>
      <div className="flex flex-col gap-5">
        
        {/* <div className="mb-2 p-2 w-full bg-gray-200">
          Register
        </div>
        <div className="flex flex-col gap-20">
          <div className="flex pl-[17px]" id='REGIS-A'>
            {data[1]?.map((item,id)=>{
                if(id > 0 && id < 5) {
                  return <HeroAvatar key={id} side="right" className="mx-[-17px] w-[180px]" charName={item} />
                  
                }
            })}
          </div>
          <div className="flex pl-[17px]" id='REGIS-B'>
            {data[2]?.map((item, id) => {
              if (id > 0 && id < 5) {
                return <HeroAvatar key={id} side="left" className="mx-[-17px] w-[180px]" charName={item} />

              }
            })}
          </div>
        </div>
        <div className="mb-2 p-2 w-full bg-gray-200">
          Ban
        </div>
        <div className="flex flex-col gap-20">
          <div className="flex pl-[14px]" id='BAN-A'>
            {data[1]?.map((item, id) => {
              if (id > 4 && id < 8) {
                return <HeroAvatar key={id} side="right" className="w-[150px] h-[150px] mx-[-14px]" charName={item} banned={true} />

              }
            })}
          </div>
          <div className="flex pl-[14px]" id='BAN-B'>
            {data[2]?.map((item, id) => {
              if (id > 4 && id < 8) {
                return <HeroAvatar key={id} side="left" className="w-[150px] h-[150px] mx-[-14px]" charName={item} banned={true} />

              }
            })}
          </div>
        </div>
        <div className="mb-2 p-2 w-full bg-gray-200">
          Pick
        </div>
        <div className="flex flex-col gap-20">
          <div className="flex pl-[20px]" id='PICK-A'>
            {data[1]?.map((item, id) => {
              if (id > 7) {
                return <HeroAvatar key={id} side="right" className="w-[220px] mx-[-20px]" charName={item} />
              }
            })}
          </div>
          <div className="flex pl-[20px]" id='PICK-B'>
            {data[2]?.map((item, id) => {
              if (id > 7) {
                return <HeroAvatar key={id} side="left" className="w-[220px] mx-[-20px]" charName={item} />
              }
            })}
          </div>
        </div> */}
        
        
      </div>
    </>
  )
}

export default App
