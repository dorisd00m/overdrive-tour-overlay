import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TournamentBracket from './TournamentBracket'
import HeroAvatar from './HeroAvatar'
import { useState, useEffect } from "react"


function App() {
  const [count, setCount] = useState(0)
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
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
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&_=${timestamp}`;

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
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setSpreadsheetUrl(url);
    localStorage.setItem("spreadsheetUrl", url);
    setSpreadsheetId(extractSpreadsheetId(url));
  };


  useEffect(() => {
    fetchCSVData();
    const interval = setInterval(fetchCSVData, 5000);
    return () => clearInterval(interval);
  }, [spreadsheetId]);

  useEffect(()=>{
    console.log(data)
  },[data])

  useEffect(() => {
    const savedUrl = localStorage.getItem("spreadsheetUrl");
    if (savedUrl) {
      setSpreadsheetUrl(savedUrl);
      setSpreadsheetId(extractSpreadsheetId(savedUrl));
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
          <div className="flex pl-[14px]">
            {data[1]?.map((item,id)=>{
                if(id > 0 && id < 5) {
                  return <HeroAvatar key={id} side="right" className="mx-[-14px]" charName={item} />
                  
                }
            })}
          </div>
          <div className="flex pr-[14px]">
            {data[2]?.map((item, id) => {
              if (id > 0 && id < 5) {
                return <HeroAvatar key={id} side="left" className="mx-[-14px]" charName={item} />

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
                return <HeroAvatar key={id} side="right" className="w-[150px] mx-[-14px]" charName={item} banned={true} />

              }
            })}
          </div>
          <div className="flex pr-[14px]">
            {data[2]?.map((item, id) => {
              if (id > 4 && id < 8) {
                return <HeroAvatar key={id} side="left" className="w-[150px] mx-[-14px]" charName={item} banned={true} />

              }
            })}
          </div>
        </div>
        <div className="mb-2 p-2 w-full bg-gray-200">
          Pick
        </div>
        <div className="flex gap-[100px]">
          <div className="flex pl-[14px]">
            {data[1]?.map((item, id) => {
              if (id > 7) {
                return <HeroAvatar key={id} side="right" className="w-[200px] mx-[-14px]" charName={item} />
              }
            })}
          </div>
          <div className="flex pr-[14px]">
            {data[2]?.map((item, id) => {
              if (id > 7) {
                return <HeroAvatar key={id} side="left" className="w-[200px] mx-[-14px]" charName={item} />
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
