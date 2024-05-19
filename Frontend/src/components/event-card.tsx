import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

function Card() {
  return (
    <div className="w-full py-5 md:py-0">
      <Image
        src={"/tile-img.png"}
        alt="tileimg"
        width={250}
        height={500}
        className="w-full h-[256px] rounded-[12px] object-cover"
      />
      <div>
        <div className="flex items-center justify-between py-[13px]">
          <div>
            <h1 className="font-head text-[18px] leading-[24px] text-[#1A1A1A]">
              Pyramid
            </h1>
            <div className="flex items-center pt-1">
              <MapPin className="w-[16px] h-[16px] text-[#8C8C8C] mr-1" />
              <p className="text-[#2C2C2C] font-para text-[14px] leading-[18px]">
                Amnesia Club
              </p>
            </div>
          </div>
          <div className="text-end">
            <p className="font-para text-[13px] text-[#2C2C2C] leading-[14px]">
              Stage 1
            </p>
            <p className="font-light text-[11px] text-[#8C8C8C] leading-[12px] py-1">
              Fisher
            </p>
            <p className="font-light text-[11px] text-[#8C8C8C] leading-[12px]">
              David Guetta
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pb-2">
          <div>
          <div className="flex items-center pt-1">
              <CalendarDays className="w-[16px] h-[16px] text-[#8C8C8C] mr-1" />
              <p className="text-[#8C8C8C] font-light text-[14px] leading-[18px]">
              2024-08-08
              </p>
            </div>
            <div className="flex items-center pt-1">
              <Clock className="w-[16px] h-[16px] text-[#8C8C8C] mr-1" />
              <p className="text-[#8C8C8C] font-light text-[14px] leading-[18px]">
              00:00 - 06:00
              </p>
            </div>
          </div>
          <div className="text-end">
            <p className="font-para text-[13px] text-[#2C2C2C] leading-[14px]">
              Stage 1
            </p>
            <p className="font-light text-[11px] text-[#8C8C8C] leading-[12px] py-1">
              Fisher
            </p>
            <p className="font-light text-[11px] text-[#8C8C8C] leading-[12px]">
              David Guetta
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
            <div>
            <button className="bg-[#008EC4] font-inter text-white rounded-[8px] py-[10px] px-[16px]">
             Buy Tickets
            </button>
            </div>
            <div className="text-end">
            <p className="font-para text-[13px] text-[#2C2C2C] leading-[14px]">
              Stage 1
            </p>
            <p className="font-light text-[11px] text-[#8C8C8C] leading-[12px] py-1">
              Fisher
            </p>
            <p className="font-light text-[11px] text-[#8C8C8C] leading-[12px]">
              David Guetta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
