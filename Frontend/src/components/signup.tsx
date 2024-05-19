"use client";

import { MoveRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Signup() {
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const first_name = formData.get("first") as string;
    const last_name = formData.get("last") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("password") as string;

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username,first_name,last_name, email, password,password2 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
      router.push('/sign-in');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-[450px] rounded-[40px] shadow-[0px_0px_75px_0px_#00000026]">
        <div className="h-[300px] bg-[url('/signup-top.png')] bg-cover bg-right-bottom bg-no-repeat rounded-t-[40px]">
          <div className="pt-8 pl-8">
          <Link href={'/sign-in'}><div className="text-white rounded-md border-[1px] border-white w-[28px] h-[28px] flex justify-center items-center">
              <X className="w-[14px] h-[14px]" />
            </div>
            </Link>  
            <h1 className="font-heavy text-[46px] leading-[69px] text-white pl-2 pt-8">
              Create
              <br />
              Account
            </h1>
          </div>
        </div>
        <div className="bg-[#D7E5FF] rounded-b-[40px] pt-6">
            <div className="mx-10 relative z-10">
              <form onSubmit={handleSubmit}>
              <input type="text" required name="first" placeholder="First" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-5" />
              <input type="text" required name="last" placeholder="Last" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-5" />
            <input type="text" required name="username" placeholder="Username" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-5" />
            <input type="email" required name="email" placeholder="Your Email" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-5" />
            <input type="password" required name="password" placeholder="Password" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-8" />
            <div className="flex justify-between items-center px-4 pb-20">
               <div className="w-[50%] text-left"><p className="text-[32px] font-heavy">Sign up</p></div> 
               <div className="w-[50%] flex items-center justify-end"> <button className="bg-[#008EC4] rounded-full w-16 h-16 flex justify-center items-center" type="submit"><MoveRight strokeWidth={1} className="text-white"/></button></div> 
            </div>
            <div className="flex items-center px-4 pb-12">
              <div className="w-[50%] text-left"></div> 
              <div className="w-[50%] text-right "><Link href={'/sign-in'} className=""><p className="text-[18px] font-heavy text-[#000000] leadiing-[27px]">Sign In</p><div className=" border-b-[9px] w-[64px] float-right border-[#0B7EE885] mt-[-12px]"></div></Link></div>  
            </div>
            </form>
            </div>
          <div className="flex mt-[-210px]"> <div className="w-[40%]"></div><div className="h-[250px] w-[60%]"><Image src={'/signup-bottom.png'} alt="signup" width={999} height={999} className="h-full w-full rounded-b-[40px]"/></div> </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
