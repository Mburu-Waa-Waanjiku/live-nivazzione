'use state'

import React, { useState } from 'react'
import {
  Button,
  Input,
  Form,
} from 'antd/lib';
import { DatePicker, Select, Space } from 'antd';
import { IoClose } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import { useRouter } from 'next/navigation';

function Apply({applyTitle, closeLogger}) {

  const router = useRouter();
  const { Option } = Select;

  const [date, setDate] = useState('');
  const [waiting, setWaiting] = useState(false);
  
  const onChange = (date, dateString) => {
    setDate(dateString)
    console.log(date, dateString);
  };

  const RegistersubmitHandler = async (values) => {
    setWaiting(true);
    try {
      router.push(`https://wa.me/254202319877?text=*COURSE%20APPLICATION*%0A%0ACourse%20Name:%20${applyTitle ? applyTitle : value.course}%0AFull%20Name:%20${values.firstName}%20${values.secondName}%0AEmail:%20${values.email}%0APhone%20Number:%20${values.phoneNumber}%0A*THANK%20YOU*`)
      setWaiting(false);
    } catch (err) {
      console.log(err)
      setWaiting(false);
    }
  };

  const courses = [
    //course 1 -- school of Hospitality management
    'Hospitality Management',
    //course 2
    'Certificate In Food & Beverage Production Sales & Service',
    //course 3
    'Diploma In Food & Beverage Production Sales & Service',
    //course 4
    'Diploma In Food & Beverage Production, Pastry &  Baking',
    //course 5
    'Certificate in Housekeeping & Accomodation',
    //course 6
    'Diploma In Event Management',
    //course 7
    'Diploma In Culinary Arts',
    //course 8
    'Diploma In Food & Beverage Service',
    //course 9 --- school of front office
    'Diploma In Office Management / Front Office Operations',
    //course 10 --- school of fashion design
    'Fashion Design Level 4',
    //course 11 --- school of Tourism
    'Diploma In Tourism Operations & Travel',
    //course 12 --- school of business
    'Diploma In Sales Marketing & Marketing',
    //course 13
    'Diploma In Business Studies',
    //course 14
    'Diploma In Business Management & Administration',
    //course 15 --- school of ICT
    'Diploma In Computer Science & Cyber Security',
    //course 16 --- school of beauty
    'Hairdressing & Beauty Therapy',
    //course 17
    'Hairdressing',
    //course 18
    'Beauty Therapy',
    //course 19
    'Diploma In Hairdressing & Beauty Therapy',
    //course 20
    'Certificate In Barbering',
    //course 21
    'Certificate In Nail Technology',
    //course 22
    'Tutors Training Course',
    //course 23
    'Hairdressing Packages (Short course)',
  ]
  
  return (
    <div className='w-full left-0 fixed h-screen px-6 top-0 z-20 flex justify-center items-center'>
      <Form className='w-full flex flex-col border-white border-2 justify-between min-w-64 max-w-xl min-h-96 py-6 px-8 rounded-3xl title-color' onFinish={RegistersubmitHandler}>
        <IoClose onClick={closeLogger} style={{transform: 'translateY(-20px)'}} className='text-white z-10 text-xl absolute my-4'/>
        <div className='text-2xl font-medium text-center py-3 pb-8 text-white'>
          {applyTitle ? applyTitle : 'Apply Now'}
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex xsm:gap-3 flex-col xsm:flex-row'>
            {!applyTitle &&
              <Form.Item
                name="gender"
                rules={[{
                  required: true,
                }]}
              >
                <Select className="w-full" placeholder="Select A Course" >
                  {courses.map((course) => (
                    <Option key={course} value={course}>{course}</Option>
                  ))}
                </Select>
              </Form.Item>
            }
            <Form.Item
              name="firstName"
              defaultValue=""
              rules={[{
                required: true,
                minLength: 2,
              }]}
            >
              <Input placeholder='First Name'/>
            </Form.Item>
            <Form.Item
              name="secondName"
              defaultValue=""
              rules={[{
                required: true,
                minLength: 2,
              }]}
            >
              <Input placeholder='Second Name'/>
            </Form.Item>
          </div>
          <div className='flex  xsm:gap-3 flex-col xsm:flex-row'>
            <Form.Item
              name="email"
              defaultValue=""
              rules={[{
                required: true,
                minLength: 2,
              }]}
            >
              <Input placeholder='Email'/>
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              defaultValue=""
              rules={[{
                required: true,
                minLength: 2,
              }]}
            >
              <Input placeholder='Phone Number'/>
            </Form.Item>
          </div>
          <div className='flex min-w-44 xsm:min-w-52 xsm:gap-3 flex-col xsm:flex-row'>
            <Form.Item className='xsm:w-full'>
              <DatePicker className='w-full' placeholder='Date of admission' onChange={onChange} />
            </Form.Item>
          </div>
        </div>
        <div className='flex flex-col items-center justify-items-center'>
          <Form.Item>
            <Button style={{backgroundColor:'rgb(51, 51, 51)'}} className=' flex h-10 pb-2 w-32 rounded-full title-gradien justify-center' htmlType="submit" >
              {!waiting ? (
                <div className='font-medium text-lg text-white'> Apply </div>
                ) :
                (<VscLoading className='text-white animate-spin'/>)
              }
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default Apply