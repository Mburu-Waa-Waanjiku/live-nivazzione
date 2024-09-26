import React from 'react'
import Image from 'next/image'
import ApplyButton from '@/components/ApplyButton'
import Footer from '@/components/Footer';

function page({params}) {

  const school = params.courses;
  const schoolName = school.split('-').join(' ');
  console.log(school);
  const allSchools = [
    {
      name: 'Short-Courses-In-Business',
      map: [0, 5],
    },
    {
      name:'Short-Courses-In-Front-Office-Operations',
      map: [5, 6],
    },
    {
      name:'Short-Courses-In-Hospitality',
      map: [6, 12],
    },
    {
      name:'Short-Courses-In-Tourism',
      map: [12, 13],
    },
    {
      name: 'Short-Courses-In-ICT',
      map: [13, 14],
    },
    {
      name: 'Short-Courses-In-Hairdressing',
      map: [14, 18],
    },
    {
      name: 'Short-Courses-In-Beauty',
      map: [18, 23],
    },
    {
      name: 'Integrated-Courses-(After-form-4)',
      map: [23, 28],
    },
    {
      name: 'Care-Giver',
      map: [28, 29],
    }
  ];

  const schoolCourses = allSchools.find((x) => x.name === school);

  const shortCourses = [
      {
        name: 'Customer Service',
        image: '/images.jpeg'
      },
      {
        name: 'Public relations',
        image: '/images(1).jpeg'
      },
      {
        name:'Management',
        image: '/images(2).jpeg'
      },
      {
        name:'Book Keeping',
        image: '/images(3).jpeg'
      },
      {
        name: 'Store Keeping',
        image: '/images(6).jpeg'
      },
      {
        name: 'Front Office Operations',
        image: '/6f4175f2499f20423e439f7fe12f5600.png'
      },
      {
        name: 'House Keeping',
        image: '/20240628_173534.jpg'
      },
      {
        name: 'Food & Beverage Service',
        image: '/images(4).jpeg'
      },
      {
        name: 'Food & Beverage Production',
        image: '/images(5).jpeg'
      },
      {
        name: 'Pastry & Baking',
        image: '/images(8).jpeg'
      },
      {
        name: 'Nutrition & Dietetics',
        image: '/nutrition.jpeg'
      },
      {
        name: 'Cake Baking & Cake Decoration',
        image: '/images(12).jpeg'
      },
      {
        name: 'Tour Guiding',
        image: '/70d27ecabc0a6707fe2a9460dcb537fe.jpg'
      },
      {
        name: 'Computer Packages',
        image: '/ea111b13ddd50698f161e6d24a14140e.jpg'
      },
      {
        name: 'Weaving & Braiding',
        image: '/images(16).jpeg'
      },
      {
        name: 'Setting & Styling Dread Locks',
        image: '/images(23).jpeg'
      },
      {
        name: 'Setting',
        image: '/images(18).jpeg'
      },
      {
        name: 'Chemical Hair Relaxing',
        image: '/images(19).jpeg'
      },
      {
        name: 'Manicure',
        image: '/IMG-20240710-WA0021.jpg'
      },
      {
        name: 'Beauty Packages',
        image: '/images(13).jpeg'
      },
      {
        name: 'Massage',
        image: '/images(22).jpeg'
      },
      {
        name: 'Facial Therapy',
        image: '/images(20).jpeg'
      },
      {
        name: 'Make Up',
        image: '/images(21).jpeg'
      },
      {
        name: 'Business Communication',
        image: '/images(1).jpeg'
      },
      {
        name: 'Community Health Worker',
        image: '/images(9).jpeg'
      },
      {
        name: 'Entrepreneurship',
        image: '/images(10).jpeg'
      },
      {
        name: 'Leadership',
        image: '/entrepreneur.jpeg'
      },
      {
        name: 'Cake Baking & Cake Decoration',
        image: '/images(12).jpeg'
      },
      {
        name: 'Care Giver',
        image: '/images(9).jpeg'
      },
  ]

  return (
    <div className='w-full overflow-hidden'>
      <div className='mlg:p-3'>
        <div className='py-8 px-8 text-3xl font-Bold text-white title-gradien'>
          <h1 className='pb-4'>{schoolName}</h1>
          <p className='text-base font-medium'>This courses take {school == 'Short-Courses-In-Business' ? '3 Months' : school == 'Short-Courses-In-Hospitality' ? '3 Months except Cake Baking & Cake Decoration which takes 2 Months' : '2'}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div style={{maxWidth:1000}} className="p-6 grid gap-0.5 grid-cols-1 slg:grid-cols-2">
          {shortCourses.slice(schoolCourses.map[0], schoolCourses.map[1]).map((course, index) => (
            <div  key={index} className=" relative max-w-96 slg:max-w-full">
              <Image alt={course.name} width={800} height={600} src={course.image}/>
              <div className="absolute flex flex-col justify-end short-coursebg text-white h-2/3 bottom-0 w-full p-5">
                <h1 className="text-3xl font-bold pb-6">{course.name}</h1>  
                <ApplyButton shortCourse={true} applyTitle={course.name}/>
                </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page