import { FaNodeJs } from "react-icons/fa"
import HomePage from "./HomePage"
import * as fs from "fs";

async function getData() {
  // const DB_URL = process.env.databaseURL + '/.json'
  // const res = await fetch(DB_URL, { cache: 'no-store' })
  // const data = res.json()
  try{
    const jsonData = fs.readFileSync("data.json", "utf-8");
    console.log("Data from file :  " + jsonData);
    return JSON.parse(jsonData);
  } catch (err) {
    console.log("Error reading file :  " + err);
  }
}
 
export default async function page() {

  const data = await getData()

  return (
    <>
      {data ?
        <HomePage data={data} />
        :
        <div className='h-screen w-screen flex flex-col items-center justify-center gap-5 text-violet-600 fixed z-30 bg-gray-100 dark:bg-grey-900'>
          <FaNodeJs size={100} className='animate-pulse' />
          <p className='animate-pulse text-xl'>Loading...</p>
        </div>
      }
    </>
  )
}