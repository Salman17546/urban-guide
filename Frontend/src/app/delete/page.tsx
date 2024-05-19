"use client";

import { MoveRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
function Delete() {
  
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await fetch('http://localhost:8000/delete-user/', {
        method: 'DELETE',
        headers: {
          'Authorization': `TOKEN ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }
      else{
        const data = await response.json();
        alert(data.message);
        router.push('/');
      }
    
    } catch (error) {
      alert(error);

    }
  };
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-[450px] rounded-[40px] shadow-[0px_0px_75px_0px_#00000026]">
        <div className="h-[300px] bg-[url('/signup-top.png')] bg-cover bg-right-bottom bg-no-repeat rounded-t-[40px]">
          <div className="pt-8 pl-8">
          <Link href={'/account'}><div className="text-white rounded-md border-[1px] border-white w-[28px] h-[28px] flex justify-center items-center">
              <X className="w-[14px] h-[14px]" />
            </div>
            </Link>  
            <h1 className="font-heavy text-[46px] leading-[69px] text-white pl-2 pt-8">
              Are you 
              <br />
              sure 😔
            </h1>
          </div>
        </div>
        <div className="bg-[#D7E5FF] rounded-b-[40px] pt-6">
            <div className="mx-10 relative z-10">
              <form onSubmit={handleSubmit}>
                <p className="font-para text-black text-[18px] text-center leading-[27px] px-4 pt-3 pb-6">You are about to delete your account. Please insert current password in order to proceed with the deletion.</p>
            <input type="text" required name="password" placeholder="Current password" className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-16" />
            <div className="flex justify-between items-center px-4 pb-20">
               <div className="w-[50%] text-left"><p className="text-[32px] font-heavy">Delete</p></div> 
               <div className="w-[50%] flex items-center justify-end"> <button className="bg-[#008EC4] rounded-full w-16 h-16 flex justify-center items-center" type="submit"><MoveRight strokeWidth={1} className="text-white"/></button></div> 
            </div>
            </form>
            </div>
          <div className="flex mt-[-130px]"> <div className="w-[40%]"></div><div className="h-[250px] w-[60%]"><Image src={'/signup-bottom.png'} alt="signup" width={999} height={999} className="h-full w-full rounded-b-[40px]"/></div> </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
