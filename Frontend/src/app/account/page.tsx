"use client"
import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from 'react';
interface AccountData {
  id: number;
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  spotify_connection: boolean,
  spotify_genres: string[],
  spotify_artists: string[]
}

function Account() {
  const [data, setData] = useState<AccountData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await fetch('http://localhost:8000/get-details', {
          method: 'GET',
          headers: {
            "Authorization": `TOKEN ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.error);
          return;
        }

        const data: AccountData = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center h-[300px]">
      <header className="flex justify-between items-center px-8 md:px-28 py-5 md:py-10">
        <div>
          <h1 className="font-logo text-4xl md:text-[56px] md:leading-[67px] uppercase text-white">
            Events Ibiza
          </h1>
        </div>
        <div>
        {/* Button */}
        </div>
      </header>
      <div className='bg-white h-[95px] rounded-[44px] mx-8 md:mx-24 text-center flex items-center justify-center mt-10 md:mt-0'>
            <p className='text-[#008EC4] font-logo text-5xl md:text-[56px] md:leading-[67px] uppercase'>My Account</p>
        </div>
    </div>

<div className='flex flex-col md:flex-row px-8 md:px-24 py-10 md:py-28'>
<div className='w-full md:w-[50%]'>
    <h2 className='font-para text-[#008EC4] text-[32px] leading-[48px] mb-10'>User Details</h2>

<div className='mb-5'>
    <h5 className='font-semi text-[17px] leading-[22px] text-[#000] opacity-50'>Username</h5>
    <h4 className='font-para text-[19px] leading-[27px] text-[#000]'>{data?.username}</h4>
    </div>
        
<div className='mb-5'>
    <h5 className='font-semi text-[17px] leading-[22px] text-[#000] opacity-50'>Email</h5>
    <h4 className='font-para text-[19px] leading-[27px] text-[#000]'>{data?.email}</h4>
    </div>
        
<div className='mb-5'>
    <h5 className='font-semi text-[17px] leading-[22px] text-[#000] opacity-50'>Spotify connection</h5>
    <h4 className='font-para text-[19px] leading-[27px] text-[#000]'>{data?.spotify_connection ?  'Yes' : 'No'}</h4>

    </div>
        
<div className='mb-5'>
    <h5 className='font-semi text-[17px] leading-[22px] text-[#000] opacity-50'>Favorite artists from Spotify</h5>
    <h4 className='font-para text-[19px] leading-[27px] text-[#000]'>{data?.spotify_artists}</h4>
    </div>
        
<div className='mb-8'>
    <h5 className='font-semi text-[17px] leading-[22px] text-[#000] opacity-50'>Favorite genres from Spotify</h5>
    <h4 className='font-para text-[19px] leading-[27px] text-[#000]'>{data?.spotify_genres}</h4>
    </div>

    <div className=''> 
   <Link href={'/reset'}><button className="bg-[#008EC4] font-inter text-white rounded-[8px] py-[10px] px-[16px]">
             Change password
            </button>
            </Link> 
           <Link href={'/delete'}><p className="bg-[#fff] font-para text-[13px] text-[#BF3333] py-[20px] underline">
             Delete account
            </p></Link> 
    </div>

</div>

<div className='w-full md:w-[50%] text-center'>
<h2 className='font-para text-[#008EC4] text-[32px] leading-[48px] mb-10'>Saved Searchs</h2>

<ul className='text-center'>
    <li className='font-para text-[16px] leading-[27px] text-[#000] underline list-disc list-inside mb-4'>House Parties</li>
    <li className='font-para text-[16px] leading-[27px] text-[#000] underline list-disc list-inside mb-4'>Parties in august</li>
    <li className='font-para text-[16px] leading-[27px] text-[#000] underline list-disc list-inside mb-4'>Events for vacations with friends</li>
    <li className='font-para text-[16px] leading-[27px] text-[#000] underline list-disc list-inside mb-4'>David Guetta related events</li>
</ul>
<div className='mt-16'>
<h2 className='font-para text-[#008EC4] text-[32px] leading-[48px] mb-10'>Communication Preferences</h2>

<div className='flex  items-center justify-around mb-6'>

<div className='w-[30%]'>
<div className='w-[140px]'>
<label className="container font-para block">Newsletter
  <input type="checkbox"/>
  <span className="checkmark rounded-md"></span>
</label>
</div>
</div>
<div className='w-[30%]'>
<div className='w-[140px]'>
<label className="container font-para block">Events
  <input type="checkbox"/>
  <span className="checkmark rounded-md"></span>
</label>
</div>

</div>
</div>

<div className='flex  items-center justify-around'>

<div className='w-[30%]'>
<div className='w-[140px]'>
<label className="container font-para block">Marketing
  <input type="checkbox"/>
  <span className="checkmark rounded-md"></span>
</label>
</div>
</div>
<div className='w-[30%]'>
<div className='w-[140px]'>
<label className="container font-para block">Offers
  <input type="checkbox"/>
  <span className="checkmark rounded-md"></span>
</label>
</div>

</div>
</div>

</div>

</div>
</div>

<Footer/>

</>
  )
}

export default Account;
