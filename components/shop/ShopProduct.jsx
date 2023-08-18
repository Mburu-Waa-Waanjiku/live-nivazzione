import React from 'react';
import Image from 'next/image';
import {
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
} from "recharts";
import { MdOutlineSwipeUp } from 'react-icons/md';
import { IoIosEye } from 'react-icons/io';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { BiBox } from 'react-icons/bi';

export default function ShopProduct({ product }) {
  
  //(orders * ratio/action.length)
  const myPerformance = Math.round(((11 * 10/ 81) + (11 * 20/ 21) + (11 * 20/ 56) + (11 * 50/ 24))) 
  const circleSize = 30;
  const data = [
    { name: 'L1', value: myPerformance, fill: '#202020' }
  ];

  return (
    <div className='rounded-3xl max-w-xl outline-bshadow w-full p-2 mt-3 bg-white'>
      <div className=' h-40 grid gap-1 grid-cols-3'>
        <div className='relative h-full'>
          <Image className='bg-gray-200 w-fitdiv max-w-48 rounded-3xl'  layout="fill" objectFit="contain" alt='' src={product.image[0].item}/>
        </div>
        <div className='col-start-2 col-span-2 grid grid-cols-3'>
          <div className='flex flex-col gap-2 justify-center  items-center'>
            <b className=' hidden xxsm:block'>Performance</b>
            <div className='w-full flex gap-2 items-center justify-center h-auto'>
              <RadialBarChart
                width={circleSize}
                height={circleSize}
                cx={circleSize / 2}
                cy={circleSize / 2}
                innerRadius={12}
                outerRadius={18}
                barSize={4}
                data={data}
                startAngle={90}
                endAngle={450}
                >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={true}
                />
              <RadialBar
                clockwise
                background={{ fill: 'rgb(0, 0, 0, 0.4)' }}
                dataKey="value"
                cornerRadius={circleSize / 3}
                fill="#82ca9d"
              />
              </RadialBarChart>
              <b>{myPerformance}%</b>
            </div>
          </div>
          <div className='flex flex-col overflow-y-scroll h-36 overflow-x-hidden font-semibold gap-2 justify-center  items-center'>
            {product.sizes.map((size) => (
              <div key={size} className='flex gap-1 xxsm:gap-2 font-semibold items-center'>
                <div className='font-bold'>{size.psize}</div>
                <div>{size.count}</div>
              </div>
            ))}
          </div>
          <div className='flex flex-col font-semibold gap-2 justify-center  items-center'>
            <div className='flex gap-2'>
              <MdOutlineSwipeUp className='text-xl'/> <b>81</b>
            </div>
            <div className='flex gap-2'>
              <IoIosEye className='text-xl'/> <b>21</b>
            </div>
            <div className='flex gap-2'>
              <BsEmojiHeartEyes className='text-xl'/> <b>56</b>
            </div>
            <div className='flex gap-2'>
              <FiShoppingBag className='text-xl'/> <b>24</b>
            </div>
            <div className='flex gap-2'>
              <BiBox className='text-xl'/> <b>11</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
