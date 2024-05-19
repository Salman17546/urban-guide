import { Facebook } from "lucide-react";
import Image from "next/image";
import React from "react";

function Footer() {
  return (<>
    <div className="bg-black px-8 md:px-28">
        <div className="py-8 px-3">
        <div>
        <h1 className="font-logo text-4xl md:text-[56px] md:leading-[67px] uppercase text-white">
            Events Ibiza
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 md:pt-2">
            <div className="flex w-full md:w-[50%] gap-x-12">
                <p className="font-light text-[14px] text-[#BFBFBF] leading-[19px]">About us</p>
                <p className="font-light text-[14px] text-[#BFBFBF] leading-[19px]">Privacy policy</p>
                <p className="font-light text-[14px] text-[#BFBFBF] leading-[19px]">Terms of services</p>
            </div>
            <div className="flex w-full md:w-[50%] justify-center md:justify-end items-center pt-4 md:pt-0">
              <Image src={'/fb.jpeg'} alt="fb" width={20} height={20} className="rounded-full w-[28px] h-[28px] mx-2"/>
            <Image src={'/twitter.jpeg'} alt="twitter" width={20} height={20} className="rounded-full w-[28px] h-[28px] mx-2"/>
            <Image src={'/tictok.jpeg'} alt="ig" width={20} height={20} className="rounded-full w-[28px] h-[28px] mx-2"/>
            <Image src={'/youtube.jpeg'} alt="yt" width={20} height={20} className="rounded-full w-[28px] h-[28px] mx-2"/>
            </div>
        </div>
        </div>
        <div className="border-t-[1px] border-[#666666] text-center py-2"><span className="font-para text-[12px] text-[#8B8B8B] leading-[18px]">© Copyright Events Ibiza 2024</span> </div>
    </div>
    </>
  );
}

export default Footer;
