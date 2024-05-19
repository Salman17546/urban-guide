"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { CalendarDays, Music2, UserPlus } from "lucide-react"
import { format } from "date-fns"
import React from 'react'
import { Calendar } from "./ui/calendar";

  
function Enddatepopup() {
const [date, setDate] = React.useState<Date>()


    return (
        <AlertDialog>
        <AlertDialogTrigger className="w-full md:w-[22%]"> 
        <div className="flex items-center border-b-[1px] md:border-b-0 border-[#D8D8D8] px-6 md:px-14 py-6 md:py-0 w-full">
               <div>
                  <CalendarDays  className="text-[#8C8C8C] w-[35px] h-[35px] mr-3" />
                </div>
                <div className="w-full text-left md:text-center">
                  <h1 className="uppercase text-[#1A1A1A] font-head text-[16px] leading-[24px]">
                    End Date
                  </h1>
                  <span className="text-[#8C8C8C] font-para text-[15px] leading-[24px]">
                   {date ?format(date, "PPP"): "Add date"}
                  </span>
                </div>
              </div>
                </AlertDialogTrigger>
        <AlertDialogContent className="w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1A1A1A] font-head text-[24px] leading-[28px] mb-3">Select Your End Date. </AlertDialogTitle>
            <AlertDialogDescription className="text-center flex justify-center">
            <Calendar className="flex justify-center"
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />

            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="py-[14px] px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-[16px] leading-[24px]">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#008EC4] text-white py-[14px] px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-[16px] leading-[24px]">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    )
  }
  
  export default Enddatepopup;
  