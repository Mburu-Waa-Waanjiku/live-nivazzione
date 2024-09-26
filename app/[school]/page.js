import Image from 'next/image';
import React from 'react';
import Footer from '@/components/Footer';
import ApplyButton from '@/components/ApplyButton';

function page({params}) {

  const { school } = params;
  const schoolName = school.split("-").join(' ');
  const allSchools = [
    {
      name: 'School-Of-Hospitality-Management',
      map: [0, 8],
      img: '/hospitality.jpg'
    },
    {
      name:'School-Of-Front-Office',
      map: [8, 9],
      img: '/images(1).jpeg'
    },
    {
      name:'School-Of-Fashion-Design',
      map: [9, 10],
      img: '/8df6bfb5f8a77874ef7a51d698827667.jpg',
    },
    {
      name: 'School-Of-Tourism',
      map: [10, 11],
      img: '/70d27ecabc0a6707fe2a9460dcb537fe.jpg'
    },
    {
      name: 'School-Of-ICT',
      map: [14, 15],
      img: '/ea111b13ddd50698f161e6d24a14140e.jpg'
    },
    {
      name: 'School-Of-Business',
      map: [11, 14],
      img: '/images(2).jpeg'
    },
    {
      name: 'School-Of-Cosmetology',
      map: [15, 23],
      img: '/hair-dressing.jpg'
    }
  ];

  const schoolCourses = allSchools.find((x) => x.name === school);
  console.log(schoolCourses.map);

  const schools = [
    //course 1 -- school of Hospitality management
    {
      name: 'Diploma In Hotel And Catering Management',
      Description: [
        'This is an ICM certification course. Minimum grade to start your studies on this ​course is D plus. ',
        'Course duration is 24 months. There are 2 levels ​in this course.'
      ],
      img: '/20240313_115726.jpg',
      phrase: 'Be the best in Hospitality',
      levels: [
        // {
        //   level: 'Certificate',
        //   requirements: {
        //     a: 'Minimum grade of D-'
        //   },
        //   time: '12 months',
        //   units: [
        //     'Fundamentals of the hotel &Catering Industry', 
        //     'Housekeeping & Accomodation Studies',
        //     'Restaurant Services',
        //     'Front Office Operations & Admisnistration',
        //     'Food & Beverage Management',
        //     'Food Production Theory & Practical'
        //   ]
        // },
        {
          level: 'Diploma',
          requirements: {
            a: 'Minimum grade of D-'
          },
          time: '12 months',
          units: [
            'Hotel & Catering Law',
            'Accounting, Purchasing & Cost Control',
            'Human resource in Hospitaliy',
            'Hospitality Management',
            'Marketing For Hospitality & Tourisim'
          ]
        },
        {
          level: 'Advanced Diploma',
          requirements: {
            a: 'Minimum grade of D-'
          },
          time: '12 months',
          units: [
            'Strategic Management in Hospitality',
            'Customer Service',
            'Economics & Hospitality',
            'Organisational Behaviour & Hospitality Management',
            'Environmental Management in The Hospitality Industry'
          ]
        }
      ]
    },
    //course 2
    {
      name: 'Certificate In Food & Beverage Production Sales & Service',
      Description: [
        'This is an KNEC certification course. Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 24 months. There are 2 modules ​in this course.'
      ],
      img: '/images(4).jpeg',
      phrase: 'Preparing you for the world',
      levels: [
        {
          level: 'Module 1',
          requirements: {
          },
          time: '12 months',
          units: [
            'Food & Beverage Production Theory',
            'Food and Beverage Production Practice',
            'Food Science and Nutriion',
            'Mathematics',
            'Information Communication Technology',
            'Entrepreneurship',
            'Life Skills',
            'Communication Skills'
          ]
        },
        {
          level: 'Module 2',
          requirements: {
          },
          time: '12 months',
          units: [
            'Food and Beverage sales and Service Theory',
            'Food and Beverage Sales and Service Practice',
            'Food and Beverage Control',
            'Catering Premises and Equipment',
            'Trade Projection'
          ]
        }
      ]
    },
    //course 3
    {
      name: 'Diploma In Food & Beverage Production Sales & Service',
      Description: [
        'This is an KNEC certification course. Minimum grade to start your studies on this ​course is C plain. ',
        'Course duration is 3 years. ',
      ],
      img: '/images(5).jpeg',
      phrase: 'World class Training',
      levels: [
        {
          level: 'Module 1',
          requirements: {
          },
          time: '12 months',
          units: [
            'Food & Beverage Production Theory',
            'Food and Beverage Production Practice',
            'Food Science and Nutriion',
            'Mathematics',
            'Information Communication Technology',
            'Entrepreneurship',
            'Life Skills',
            'Communication Skills'
          ]
        },
        {
          level: 'Module 2',
          requirements: {
          },
          time: '12 months',
          units: [
            'Food and Beverage sales and Service Theory',
            'Food and Beverage Sales and Service Practice',
            'Food and Beverage Control',
            'Catering Premises and Equipment',
            'Trade Projection'
          ]
        }
      ]
    },
    //course 4
    {
      name: 'Diploma In Food & Beverage Production, Pastry &  Baking',
      Description: [
        'This is an ICM certification course. Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 12 months. There are 1 module ​in this course.'
      ],
      img: '/images(8).jpeg',
      phrase: "Professionalism on it's best",
      levels: [
        {
          level: 'Module 1',
          requirements: {
          },
          time: '12 months',
          units: [
            'Food & Beverage Management',
            'Food Production Theory & Practical',
            'Restaurant Service Theory & Practical',
            'Accounting, Purchasing & Cost Control'
          ]
        }
      ]
    },
    //course 5
    {
      name: 'Certificate in Housekeeping & Accomodation',
      Description: [
        'This is an ICM certification course. Minimum grade to start your studies on this ​course is D plain ',
        'Course duration is 12 months ',
      ],
      img: '/20240628_173534.jpg',
      phrase: 'Empower your career in Hospiality field',
      levels: [
        {
          level: 'Units',
          requirements: {
          },
          time: '12 months',
          units: [
            'Using Cleaning Chemicals, Maerials & Equipment',
            'Cleaning Internal Areas, Surfaces and Furnishings',
            'Cleaning Floors & Carpets',
            'Cleaning & Servicing Guest Bedrooms'
          ]
        }
      ]
    },
    //course 6
    {
      name: 'Diploma In Event Management',
      Description: [
        'Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 12 months.'
      ],
      img: '/events.jpeg',
      phrase: 'Your beginning in event planning',
      levels: [
        {
          level: 'Units',
          requirements: {
          },
          time: '12 months',
          units: [
            'Exploring the Events Industry',
            'Events Planning',
            'Assist the Management of Health & Safety at Events Site',
            'Assist the Set-Up and Take-Down of an Event',
            'Assist in Running an Event'
          ]
        }
      ]
    },
    //course 7
    {
      name: 'Diploma In Culinary Arts',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is D minus. ',
        'Course duration is 12 months. ',
      ],
      img: '/ae77f09aad8ea172ea8f53585f5f366c.jpg',
      phrase: 'Gain skills in calinary arts',
      levels: [
        {
          level: 'Units',
          requirements: {
          },
          time: '12 months',
          units: [
            'Prepering & Cooking Fruit & Vegetable Dishes',
            'Prepering & Cooking Stocks, Sauces & Soups',
            'Prepering & Cooking Farinaccous & Egg Dishes',
            'Prepering & Cooking Meat & Poulry',
            'Prepering & Cooking Fish & Shellfish',
            'Prepering & Cooking Dough Products',
            'Prepering & Cooking Paste & Dessert Products',
            'Prepering & Cooking Biscuit, Cake & Sponge'
          ]
        }
      ]
    },
    //course 8
    {
      name: 'Diploma In Food & Beverage Service',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is D minus. ',
        'Course duration is 12 months. ',
      ],
      img: '/6cb07471145faa8a8d59f1ddc41d3156.jpg',
      phrase: 'Learn the art of Service in your field',
      levels: [
        {
          level: 'Units',
          requirements: {
          },
          time: '12 months',
          units: [
            'Setting up and Closing doen Service Areas',
            'Food Service',
            'Preparing and Serving Hot and Cold Bevrages',
            'Preparing and Serving Alcohol Beverages'
          ]
        }
      ]
    },
    //course 9 --- school of front office
    {
      name: 'Diploma In Office Management / Front Office Operations',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is -D. ',
        'Course duration is 36 months. ',
        'There are 3 levels ​in this course.'
      ],
      img: '/6f4175f2499f20423e439f7fe12f5600.png',
      phrase: 'Producing world class front office operator & office Manager',
      levels: [
        {
          level: 'Certificate in Office Practice',
          requirements: {
          },
          time: '9 months',
          units: [
            'Accounting',
            'Business Management & Admiistration',
            'Computer Appreciaion & Applications',
            'International Business Communications',
            'Office Procedure & Administration'
          ]
        },
        {
          level: 'Diploma in Office Practice',
          requirements: {
          },
          time: '9 months',
          units: [
            'Business Law',
            'Human Resource Management',
            'Management Theory & Practice',
            'Purchasing Management',
            'Sales & Salea Marketing'
          ]
        }
      ]
    },
    //course 10 --- school of fashion design
    {
      name: 'Fashion Design Level 4',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is -D. ',
        'Course duration is 36 months. ',
        'There are 3 levels ​in this course.'
      ],
      img: '/666e0b80a3c87c51a35f226b8ed47274.png',
      phrase: 'Become a world class fashion designer',
      levels: [
        {
          level: 'Basic Units',
          requirements: {
          },
          time: '9 months',
          units: [
            'Communication Skills',
            'Numeracy Skills',
            'Digital Literacy',
            'Entrepreneur Skills',
            'Environmenal Literacy',
            'Occupational Safety and Health Practices'
          ]
        },
        {
          level: 'Core Units',
          requirements: {
          },
          time: '9 months',
          units: [
            'Sewing Machine Operations',
            'Garment Sketching & Constration',
            'Fabrics and Garment Decoraion',
            'Industrial Attachment'
          ]
        }
      ]
    },
    //course 11 --- school of Tourism
    {
      name: 'Diploma In Tourism Operations & Travel',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is -D. ',
        'Course duration is 18 months. ',
      ],
      img: '/70d27ecabc0a6707fe2a9460dcb537fe.jpg',
      phrase: 'Producing Leading Profesionals in Tourism',
      levels: [
        {
          level: 'Part 1',
          requirements: {
          },
          time: '9 months',
          units: [
            'Characteristics of World Destionaions',
            'Fundamentals of the Hotel & Catering Industry',
            'Numeracy & Statistics',
            'Retail Travel Operations',
            'Structure of Travel & Tourism'
          ]
        },
        {
          level: 'Part 2',
          requirements: {
          },
          time: '9 months',
          units: [
            'Accounting',
            'Business Management',
            'Management of Travel & Tourii Operations',
            'Tour Operations',
            'Tourisim Markrting & Promotion'
          ]
        }
      ]
    },
    //course 12 --- school of business
    {
      name: 'Diploma In Sales Marketing & Marketing',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 18 months. ',
      ],
      img: '/images(2)1.jpeg',
      phrase: 'Learn the essentials in Sales & Marketing',
      levels: [
        {
          level: 'Part 1',
          requirements: {
          },
          time: '9 months',
          units: [
            'Principal and Practice of selling',
            'Marketing',
            'International Business Communication',
            'Business Economics',
            'Business Management & Administration'
          ]
        },
        {
          level: 'Part 2',
          requirements: {
          },
          time: '9 months',
          units: [
            'Public Relations',
            'Advertising / Marketing Management',
            'Sales & Sales Manaement',
            'Quantitative Method'
          ]
        }
      ]
    },
    //course 13
    {
      name: 'Diploma In Business Studies',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 18 months. ',
      ],
      img: '/ce1c35c07233d4a240d31e0875810db9.png',
      phrase: 'Advance your knowledge in Business',
      levels: [
        {
          level: 'Part 1',
          requirements: {
          },
          time: '9 months',
          units: [
            'Business Marketing & Administration',
            'International Business Communicatons',
            'Marketing',
            'Numeracy & Statistics'
          ]
        },
        {
          level: 'Part 2',
          requirements: {
          },
          time: '9 months',
          units: [
            'Accounting',
            'Business Law',
            'Econimics for Business',
            'Organisational Behaviour'
          ]
        }
      ]
    },
    //course 14
    {
      name: 'Diploma In Business Management & Administration',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is C minus. ',
        'Course duration is 36 months. ',
      ],
      
      img: '/businesss.jpeg',
      phrase: 'Where strong business names are made',
      levels: [
        {
          level: '',
          requirements: {
          },
          time: '36 months',
          units: []
        }
      ]
    },
    //course 15 --- school of ICT
    {
      name: 'Diploma In Computer Science & Cyber Security',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is C minus. ',
        'Course duration is 18 months. ',
      ],
      img: '/ea111b13ddd50698f161e6d24a14140e.jpg',
      phrase: 'Learn the essentials in ICT',
      levels: [
        {
          level: 'Units',
          requirements: {
          },
          time: '18 months',
          units: [
            'Computer Systems',
            'Software Testing',
            'Computer Science',
            'Computer Security'
          ]
        },
      ]
    },
    //course 16 --- school of beauty
    {
      name: 'Hairdressing & Beauty Therapy',
      Description: [
        'This is an NITA certification course.',
        'Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 9 months. ',
      ],
      img: '/hair-dressing.jpg',
      phrase: 'Beauty & Hairdressing At Its Best',
      levels: [
        {
          level: 'Hairdressing',
          requirements: {
          },
          time: '9 months',
          units: [
            'Blow-dry',
            'Thermal Styling',
            'Plain Corntows',
            'Braiding',
            'Twisting',
            'Crocheting',
            'Roller Seting',
            'Jamaicas',
            'Ghanians',
            'Droplines',
            'Ethiopians',
            'Weaving',
            'Realaxing',
            'Haircuting',
            'Dreadlocks',
            'Haircutting',
            'Piece Lines'
          ]
        },
        {
          level: 'Beaty',
          requirements: {
          },
          time: '9 months',
          units: [
            'Manicure',
            'Pedicure',
            'Eye blow Tweezing',
            'Make-up',
            'Facial',
            'Waxing',
            'Body Massage',
            'Ear Piercing',
            'Stickons'
          ]
        }
      ]
    },
    //course 17
    {
      name: 'Hairdressing',
      Description: [
        'This is an NITA certification course.',
        'Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 6 months. ',
      ],
      img: '/hair-dressing.jpg',
      phrase: 'Learn the art of Hair dressing',
      levels: [
        {
          level: 'Hairdressing',
          requirements: {
          },
          time: '6 months',
          units: [
            'Hairdressing theory and practical'
          ]
        },
      ]
    },
    //course 18
    {
      name: 'Beauty Therapy',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is D plain. ',
        'Course duration is 6 months. ',
      ],
      img: '/makeup.jpg',
      phrase: 'Learn the art of Beaty therapy',
      levels: [
        {
          level: 'Hairdressing',
          requirements: {
          },
          time: '6 months',
          units: [
            'Beauty theory and practical'
          ]
        },
      ]
    },
    //course 19
    {
      name: 'Diploma In Hairdressing & Beauty Therapy',
      Description: [
        'This is an ICM certification course.',
        'Minimum grade to start your studies on this ​course is D plus. ',
        'Course duration is 12 months. ',
      ],
      img: '/hair-dressing.jpg',
      phrase: 'Advance your career in Hair dressing & Beauty therapy',
      levels: [
        {
          level: 'Core Unts',
          requirements: {
          },
          time: '12 months',
          units: [
            'Salon Hygene, Health and Safety',
            'Consultation and Client Care',
            'Abatomy and Physiology for Hairdressing and Barbering'
          ]
        },
        {
          level: 'Hairdressing Units',
          requirements: {
          },
          time: '12 months',
          units: [
            'Shampooning and Conditioning hair',
            'Braiding Twisting and Thread Wrapping Hair',
            'Hair Styling and Finishing',
            'Barbering',
            'Hair Colouring',
            'Hair Cutting'
          ]
        },
        {
          level: 'Beauty therapy units',
          requirements: {
          },
          time: '12 months',
          units: [
            'Facial sin care treatment',
            'Makeup application',
            'Waxing Rechniques',
            'Manicure Trearments',
            'Pedicre Treatments',
            'Nail Art and Gel Application'
          ]
        },
        {
          level: 'Profesional units',
          requirements: {
          },
          time: '12 months',
          units: [
            'Workinh in the Hairdressing and Beauty Industry',
            'Salon Profesionalism',
            'Salon Team work',
            'Salon reception duties',
            'Salon Merchandising and sales promotion'
          ]
        },
      ]
    },
    //course 20
    {
      name: 'Certificate In Barbering',
      Description: [
        'This is an NITA certification course.',
        'Course duration is 2 months. ',
      ],
      img: '/images(15).jpeg',
      phrase: 'Start your career with a profesional barbering course',
      levels: [
        {
          level: 'Hairdressing',
          requirements: {
          },
          time: '2 months',
          units: [
            'Theory & Practice'
          ]
        },
      ]
    },
    //course 21
    {
      name: 'Certificate In Nail Technology',
      Description: [
        'This is an NITA certified course.',
        'Course duration is 2 months. ',
        'There are 3 levels ​in this course.'
      ],
      img: '/IMG-20240710-WA0021.jpg',
      phrase: 'Make a career out of the nail art industry',
      levels: [
        {
          level: 'Hairdressing',
          requirements: {
          },
          time: '2 months',
          units: [
            'Theory & Practice'
          ]
        },
      ]
    },
    //course 22
    {
      name: 'Tutors Training Course',
      Description: [
        'This is an NITA certification course.',
        'Course duration is 6 months.',
        'There are 3 levels ​in this course.'
      ],
      img: '/images(13).jpeg',
      phrase: 'Become a trainer in beauty and herapy',
      levels: [
        {
          level: 'Hairdressing',
          requirements: {
          },
          time: '6 months',
          units: [
            'Theory & Practice'
          ]
        },
      ]
    },
    //course 23
    {
      name: 'Hairdressing Packages (Short course)',
      Description: [
        'Course duration is 2 months. ',
      ],
      img: '/hair-dressing.jpg',
      phrase: 'Get a Market Ready Skills',
      levels: [
        {
          level: 'Hairdressing',
          requirements: {
          },
          time: '2 months',
          units: [
            'Weaving and Braiding',
            'Setting and Styling',
            'Chemical Hair styling and Coluring',
            'Dreadlock'
          ]
        },
      ]
    },
  ]

  return (
    <div className='w-full h-full overflow-hidden' >
      <div className='w-full  school-banner-height flex flex-col justify-center overflow-hidden' >
        <Image alt={schoolName} width={1300} height={800}  className=' min-h-full object-cover' src={schoolCourses.img} />
        <div style={{lineHeight: '70px'}} className='text-5xl slg:text-7xl text-center p-6  school-banner-height top-0 font-bold text-white z-10 flex justify-center items-center absolute school-banner-shadow w-full h-96'>
          <h1>{schoolName}</h1>
        </div>
      </div>
      <div className='px-4 py-6'>
        {schools.slice(schoolCourses.map[0], schoolCourses.map[1]).map((course, index) => (
          <>
            <div key={index} className='w-full mb-12'>
              <div className="flex mb-6 p-1 slg:p-6 mlg:pb-8 slg:p-0 flex-col slg:flex-row justify-center  relative items-center gap-4 w-full">
                <div className="title-color w-full block slg:hidden mt-6 mb-6 text-3xl text-start px-2 pt-1 pb-2 slg:text-center text-white">{index + 1}. {course.name}</div>
                <div className="w-full flex justify-center scaler xxsm:!scale-75 mlg:!scale-100  items-center h-72 slg:w-1/2">
                  <Image alt={` `} style={{transform: 'translate(20px, 0px)'}} className="absolute border-4 border-white m-1 z-10" width={300} height={400} src={course.img}/>
                  <div style={{transform: 'translate(-80px, 150px)'}} className="p-3 title-color h-32 w-48 text-3xl text-white z-10">{course.phrase}</div>
                </div>
                <div className="slg:w-1/2 h-auto slg:h-96  justify-center slg:justify-start font-sans  slg:overflow-y-auto order-thumb w-full flex  items-center ">
                  <div className="pt-4 justify-center slg:justify-start flex flex-col  h-full px-6">
                    <div className="title-color slg:block hidden mt-6 mb-6 text-3xl px-2 pt-1 pb-2 text-start slg:text-center text-white">{index + 1}. {course.name}</div>
                    {course.Description.map((d, i) => (
                      <p key={i} className="pb-3 text-xl title-text">{d}</p>
                    ))}
                    <ApplyButton applyTitle={course.name} course={course} index={index} />
                  </div>
                </div>
              </div>
            </div>
            {index === 3 && school == 'School-Of-Hospitality-Management' &&
              <div className=" text-center text-center font-bold title-gradien w-full block  mt-8 mb-8 text-3xl px-2 pt-1 pb-2 slg:text-center text-white">Competency Based Qualification Courses</div>
            }
          </>
        ))}
      </div>
      <Footer/>
    </div>
  )
}

export default page