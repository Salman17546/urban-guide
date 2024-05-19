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
import { UserPlus } from "lucide-react"

  
  import React from 'react'
import Checkboxes from "./checkboxes"
import Artistpagination from "./artist-pagination"
  
  function Artistpopup() {
    interface Artist {
      name: string[];}
    const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/artists/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        return;
      }
  
      const data = await response.json();
      const names = data.results.map((artist:Artist) => artist.name);
      console.log('Success:', data);
      // router.push('/account');
    } catch (error) {
      console.error('Error:', error);
    }}

// const names = ["Atif Aslam" , "Arijit Singh" , "Neha Kakkar" , "Armaan Malik" , "Shreya Goshal" , "Sonu Nigam" , "A.R. Rahman"]

    return (
        <AlertDialog>
        <AlertDialogTrigger onClick={handleClick} className="w-full md:w-[22%]"> 
        <div className="flex items-center border-b-[1px] border-r-0 md:border-r-[1px] md:border-b-0 border-[#D8D8D8] px-6 md:px-14 py-6 md:py-0 w-full">
            <div>
                  <UserPlus className="text-[#8C8C8C] w-[35px] h-[35px] mr-3" />
                </div>
                <div className="w-full text-left md:text-center">
                  <h1 className="uppercase text-[#1A1A1A] font-head text-[16px] leading-[24px]">
                    Artist
                  </h1>
                  <span className="text-[#8C8C8C] font-para text-[15px] leading-[24px]">
                    Add artist
                  </span>
                </div>
                </div>
                </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1A1A1A] font-head text-[24px] leading-[28px] mb-3">Select Your Favorite Artist. </AlertDialogTitle>
            <AlertDialogDescription className="h-[420px] overflow-y-auto">
              <div className="mb-3">
              <input type="text" placeholder="Search Your Favourite Artist" className="text-[#1A1A1A] font-para text-[16px] w-full h-10 px-3 border-[1px] border-[#b8b8b8] rounded-lg mb-5"/>
{/* {names.map((name) => (
     <Checkboxes name={name} />
))} */}
</div>
<Artistpagination/>

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
  
  export default Artistpopup;
  