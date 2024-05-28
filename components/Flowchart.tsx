import React from "react";
import { maper } from "../constants/index";
import Image from "next/image";
import mainjoiningline2 from '../public/mainjoiningline2.svg'
interface Roadmap {
  title: string;
  sections: {
    title: string;
    items: string[];
  }[];
}
type FlowchartProps = {
  map: Roadmap[];
};
const Flowchart: React.FC<FlowchartProps> = ({map}) => {
  function splitArray(arr: any[], splitIndex: number) {
    const leftSide = arr.slice(0, splitIndex);
    const rightSide = arr.slice(splitIndex, arr.length);
    console.log(leftSide)
    console.log(rightSide)
    return { leftSide, rightSide };
  }
 
  console.log(map)
  return (
    <div className="font-Aifont   flex flex-col justify-around items-center p-5">
     <p className="bg-violet-400 m-2 p-2 rounded-xl border border-black/20"> {map[0].title}</p>
      {map[0].sections.map((sec: { items: any[]; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; },index: React.Key | null | undefined)=>
     <div key={index} className="w-full">
       <div  className="flex flex-row  items-center  text-center">
      <div className="text-black w-5/12">
        
    {
       splitArray(sec.items, sec.items.length/2).leftSide.map((e, index) => {
        return <p className="bg-[#FFE599] m-2 p-2 rounded-xl border border-black/20" key={index}>{e}</p>;
      })
 
    }
      </div>
      <div className="flex flex-col items-center w-2/12">
      <p className=" mx-2 p-2 rounded-xl border border-black/20 bg-yellow-400">{sec.title}</p>
      
<Image
alt=""
src={mainjoiningline2}
/>
      </div>
      <div className="text-black w-5/12">
        
      { splitArray(sec.items, sec.items.length/2).rightSide.map((e, index) => {
              return <p className="bg-[#FFE599] m-2 p-2 rounded-xl border border-black/20" key={index}>{e}</p>;
            })
         }
      </div>
      </div>
      
     </div>
     )}
    </div>
  );
};

export default Flowchart;
