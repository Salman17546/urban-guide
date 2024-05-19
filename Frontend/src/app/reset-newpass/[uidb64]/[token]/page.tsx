"use client";

import { MoveRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation'; // Correct useRouter import
import React, { useEffect, useState } from "react";

function Resetnew() {
  const params = useParams<{ uidb64: string; token: string }>()
  const uidb64 = params.uidb64
  const token = params.token
  console.log(`Token: ${token}`)
  console.log(`uidb64: ${uidb64}`)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const new_password = formData.get("password1") as string;
    const confirmPassword = formData.get("confirm_new_password") as string;
    if (new_password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!uidb64 || !token) {
      alert("Invalid or missing token");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/password-reset-confirm/${uidb64}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: new_password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }
      const data = await response.json();
      alert(data.message)
      window.location.href = '/sign-in';
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-[450px] rounded-[40px] shadow-[0px_0px_75px_0px_#00000026]">
        <div className="h-[300px] bg-[url('/signup-top.png')] bg-cover bg-right-bottom bg-no-repeat rounded-t-[40px]">
          <div className="pt-8 pl-8">
            <Link href={'/account'}>
              <div className="text-white rounded-md border-[1px] border-white w-[28px] h-[28px] flex justify-center items-center">
                <X className="w-[14px] h-[14px]" />
              </div>
            </Link>
            <h1 className="font-heavy text-[46px] leading-[69px] text-white pl-2 pt-8">
              Enter New
              <br />
              Password
            </h1>
          </div>
        </div>
        <div className="bg-[#D7E5FF] rounded-b-[40px] pt-6">
          <div className="mx-10 relative z-10">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                required
                name="password1"
                placeholder="New password"
                className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-5"
              />
              <input
                type="password" name="confirm_new_password" placeholder="Confirm new password"
                className="bg-white text-black px-6 text-[16px] font-semi w-full h-14 rounded-[20px] outline-none focus:border-[#fff] opacity-100 placeholder-black mb-8"
              />
              <div className="flex justify-between items-center px-4 pb-20">
                <div className="w-[50%] text-left">
                  <p className="text-[32px] font-heavy">Reset</p>
                </div>
                <div className="w-[50%] flex items-center justify-end">
                  <button className="bg-[#008EC4] rounded-full w-16 h-16 flex justify-center items-center" type="submit">
                    <MoveRight strokeWidth={1} className="text-white" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex mt-[-130px]">
            <div className="w-[40%]"></div>
            <div className="h-[250px] w-[60%]">
              <Image src={'/signup-bottom.png'} alt="signup" width={999} height={999} className="h-full w-full rounded-b-[40px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resetnew;
