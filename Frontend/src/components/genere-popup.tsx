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
import { Music2, UserPlus } from "lucide-react"

  
  import React from 'react'
import Checkboxes from "./checkboxes"
import Artistpagination from "./artist-pagination"
import Generepagination from "./genere-pagination"
  
  function Generepopup() {

const names = ["Pop" , "Hip Hop" , "Classic" , "Romantic" ]


    return (
        <AlertDialog>
        <AlertDialogTrigger className="w-full md:w-[22%]"> 
        <div className="flex items-center border-b-[1px] border-r-0 md:border-r-[1px] md:border-b-0 border-[#D8D8D8] px-6 md:px-14 py-6 md:py-0 w-full">
                <div>
                  <Music2 className="text-[#8C8C8C] w-[35px] h-[35px] mr-3" />
                </div>
                <div className="w-full text-left md:text-center">
                  <h1 className="uppercase text-[#1A1A1A] font-head text-[16px] leading-[24px]">
                    Genres
                  </h1>
                  <span className="text-[#8C8C8C] font-para text-[15px] leading-[24px]">
                    Add genres
                  </span>
                </div>
              </div>
                </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1A1A1A] font-head text-[24px] leading-[28px] mb-3">Select Your Favorite Genere. </AlertDialogTitle>
            <AlertDialogDescription className="h-[420px] overflow-y-auto">
              <div className="mb-3">
                <input type="search" placeholder="Search Your Favourite Genere" className="text-[#1A1A1A] font-para text-[16px] w-full h-10 px-3 border-[1px] border-[#b8b8b8] rounded-lg mb-5"/>
{names.map((name) => (
     <Checkboxes name={name} />
))}
</div>
<Generepagination/>

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
  
  export default Generepopup;
  