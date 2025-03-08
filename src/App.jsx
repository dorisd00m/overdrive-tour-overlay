import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TournamentBracket from './TournamentBracket'
import HeroAvatar from './HeroAvatar'
import { useState, useEffect } from "react"


function App() {
  const [count, setCount] = useState(0)
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");

  const [sheetCost, setSheetCost] = useState("488856757")
  const [dataCost,setDataCost] = useState([]);
  const [prevDataCost,setPrevDataCost] = useState([]);


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
    if (savedUrl) {
      setSpreadsheetUrl(savedUrl);
      setSpreadsheetId(extractSpreadsheetId(savedUrl));
      if(savedSheetIdCost) {
        setSheetCost(savedSheetIdCost)
      }
    }
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <div className='w-full'>
          <input
            type="text"
            value={spreadsheetUrl}
            onChange={handleUrlChange}
            placeholder="Masukkan URL Google Spreadsheet"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          />
        </div>
        <div className="mb-2 p-2 w-full bg-gray-200">
          Register
        </div>
        <div className="flex gap-[50px]">
          <div className="flex pl-[17px]">
            {data[1]?.map((item,id)=>{
                if(id > 0 && id < 5) {
                  return <HeroAvatar key={id} side="right" className="mx-[-17px] w-[180px]" charName={item} />
                  
                }
            })}
          </div>
          <div className="flex pr-[17px]">
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
        <div className="flex gap-[100px]">
          <div className="flex pl-[14px]">
            {data[1]?.map((item, id) => {
              if (id > 4 && id < 8) {
                return <HeroAvatar key={id} side="right" className="w-[150px] h-[150px] mx-[-14px]" charName={item} banned={true} />

              }
            })}
          </div>
          <div className="flex pr-[14px]">
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
        <div className="flex gap-[100px]">
          <div className="flex pl-[20px]">
            {data[1]?.map((item, id) => {
              if (id > 7) {
                return <HeroAvatar key={id} side="right" className="w-[220px] mx-[-20px]" charName={item} />
              }
            })}
          </div>
          <div className="flex pr-[20px]">
            {data[2]?.map((item, id) => {
              if (id > 7) {
                return <HeroAvatar key={id} side="left" className="w-[220px] mx-[-20px]" charName={item} />
              }
            })}
          </div>
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
        <div className="flex gap-[10px]">
          {/* COST A */}
          <div className="flex flex-col ">
            <div className="flex ">
              <div className='py-2 w-10'>
                <img src="/overdrive-tour-overlay/character.png" alt="" className='mx-auto' />
              </div>
              <div className="flex font-digital">
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
              <div className="flex font-digital">
                {dataCost[1]?.map((item, id) => {
                  if (id > 3 && id < 7) {
                    return <div key={id} className='p-2 w-20 text-yellow-500 text-xl flex items-center gap-1'>{item || "--"} <span className='icon-[lsicon--lightning-filled]'></span></div>
                  }
                })}
              </div>
            </div>
          </div>
          {/* TOTAL COST */}
          <div className='flex'>
            <div className='p-2  text-yellow-500 text-4xl flex items-center gap-1 font-digital'>

              {dataCost[1]?.map((item, id) => {
                if (id == 7) {
                  return <div key={id}>{item} /</div>
                }
                if (id == 8) {
                  return <div key={id}>{item}</div>
                }
              })}
            </div>
            <div className='p-2  text-yellow-500 text-4xl flex items-center gap-1 font-digital'>

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
            <div className="flex  justify-end">
              <div className="flex font-digital">
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
            <div className="flex pr-5 justify-end">
              <div className="flex font-digital">
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
      </div>
    </>
  )
}

export default App
