"use client";

import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Signin() {
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username_or_email = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username_or_email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log('Success:', data);
      router.push('/account');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-[450px] rounded-[40px] shadow-[0px_0px_75px_0px_#00000026]">
        <div className="h-[430px] bg-[url('/loginedit-img.png')] bg-cover bg-no-repeat rounded-t-[40px]">
          <div className="pt-8 pl-8">
          <Link href={'/'}><div className="text-white rounded-md border-[1px] border-white w-[28px] h-[28px] flex justify-center items-center">
              <X className="w-[14px] h-[14px]" />
            </div>
            </Link>  
            <h1 className="font-heavy text-[46px] leading-[69px] text-white pl-2 pt-8">
              Welcome
              <br />
              Back
            </h1>
          </div>
        </div>
        <div className="bg-[#D7E5FF] rounded-b-[40px] ">
            <div className="mx-10">
              <form onSubmit={handleSubmit}>
            <input type="text" required name = "username" placeholder="Your Email or Username" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-5" />
            <input type="password" required name = "password" placeholder="Password" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-8" />
            <div className="flex justify-between items-center px-4 pb-20">
               <div className="w-[50%] text-left"><p className="text-[32px] font-heavy">Sign in</p></div> 
               <div className="w-[50%] flex items-center justify-end"> <button className="bg-[#008EC4] rounded-full w-16 h-16 flex justify-center items-center" type="submit"><MoveRight strokeWidth={1} className="text-white"/></button></div> 
            </div>
            <div className="flex items-center px-4 pb-12">
              <div className="w-[50%] text-left"><Link href={'/sign-up'} className="block"><p className="text-[18px] font-heavy text-[#000000] leadiing-[27px]">Sign Up</p><div className=" border-b-[9px] border-[#0B7EE885] mt-[-13px] w-[70px]"></div></Link> </div> 
              <div className="w-[50%] text-left "><Link href={'/forget'} className="block"><p className="text-[18px] font-heavy text-[#000000] leadiing-[27px]">Forgot Password</p><div className=" border-b-[9px] border-[#FF000085] mt-[-14px] mr-3"></div></Link></div>  
            </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
