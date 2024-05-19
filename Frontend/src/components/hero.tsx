"use client"
import { ArrowRight, CalendarDays, Music2, Search, UserPlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import Card from "./event-card";
import Popup from "./artist-popup";
import Generepopup from "./genere-popup";
import Artistpopup from "./artist-popup";
import Startdatepopup from "./start-date-popup";
import Enddatepopup from "./end-date-popup";
import Link from "next/link";

function Hero() {
  const token = localStorage.getItem('token');
  return (<>
    <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center h-[735px] flex flex-col justify-between">
      <header className="flex justify-between items-center px-8 md:px-28 py-5 md:py-10">
        <div>
          <h1 className="font-logo text-4xl md:text-[56px] md:leading-[67px] uppercase text-white">
            Events Ibiza
          </h1>
        </div>
        <div>
          {token ?
        <Link href={'/account'} > <button className="bg-[#008EC4] text-white py-2 md:py-[14px] px-4 md:px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-xs md:text-[16px] md:leading-[24px]">
            ACCOUNT
          </button></Link>
          :
          <Link href={'/sign-in'} > <button className="bg-[#008EC4] text-white py-2 md:py-[14px] px-4 md:px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-xs md:text-[16px] md:leading-[24px]">
            SIGN IN/UP
          </button></Link> }
        </div>
      </header>

      <div className="bg-white mb-[-270px] md:mb-[-138px] mx-8 md:mx-24 rounded-[32px] p-6 md:px-12 md:py-10 shadow-lg blur-24 text-blue-800">
        <div>
          <div>
            <h1 className="uppercase font-semi text-3xl md:text-[60px] md:leading-[90px] text-[#008EC4]">
              THE PARTY THAT SUITS YOU!
            </h1>
            <h3 className="uppercase font-para text-base md:text-[32px] text-black">
              FIND THE PARTY THAT MATCHES WITH YOUR VIBE!
            </h3>
          </div>

          <button className="bg-[#1DB954] text-white my-5 md:mt-[36px] md:mb-14 py-2 md:py-[14px] px-4 md:px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-xs md:text-[16px] md:leading-[24px] flex items-center">
            <Image
              src={"/spotify-logo.png"}
              alt="spotify-logo"
              width={30}
              height={30}
              className="mr-4"
            />{" "}
            GET YOUR FAVORITE ARTIST AND GENRES WITH SPOTIFY
          </button>

          <div className="">
            <div className="flex flex-col md:flex-row justify-center md:items-center px-3 md:px-0 py-0 md:py-5 w-[100%] border-[1px] border-[#D9D9D9] rounded-[72px]">
              <Artistpopup/>
              <Generepopup/>
              <Startdatepopup/>
              <Enddatepopup/>
              <div className="w-full md:w-[12%] flex items-center justify-center md:justify-end py-4 md:py-0 md:pr-2">
                <button className="bg-[#008EC4] text-white rounded-[56px] p-[14px]">
                  <Search className="w-[25px] h-[25px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-[270px] md:mt-[138px] px-8 md:px-24">
      <h1 className="uppercase font-head text-3xl md:text-[40px] md:leading-[44px] text-[#1A1A1A] text-center py-16">SEARCH RESULTS</h1>
      <div className="flex flex-col md:flex-row items-center gap-x-14">
        <div className="w-full md:w-[25%]">
          <Card />
        </div>
        <div className="w-full md:w-[25%]">
          <Card />
        </div>
        <div className="w-full md:w-[25%]">
          <Card />
        </div>
        <div className="w-full md:w-[25%]">
          <Card />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-x-14 py-16">

        <div className="w-full md:w-[25%]">
          <Card />
        </div>
        <div className="w-full md:w-[25%]">
          <Card />
        </div>
        <div className="w-full md:w-[25%]">
          <Card />
        </div>
        <div className="w-full md:w-[25%]">
          <Card />
        </div>
      </div>
     <div className="flex justify-center"><button className="font-head text-[#1A1A1A] text-[16px] leading-[24px] flex items-center text-center rounded-[40px] border-[1px] border-[#D8D8D8] py-[12px] px-[24px]">Load more <ArrowRight className="w-[20px] h-[20px] ml-2"/></button></div> 
    </div>
    </>
  );
}

export default Hero;
// "use client";
// import { ArrowRight, Search } from "lucide-react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Card from "./event-card";
// import Popup from "./artist-popup";
// import Generepopup from "./genere-popup";
// import Artistpopup from "./artist-popup";
// import Startdatepopup from "./start-date-popup";
// import Enddatepopup from "./end-date-popup";
// import Link from "next/link";

// function Hero() {
//   const [token, setToken] = useState(null);
//   const [genres, setGenres] = useState([]);
//   const [artists, setArtists] = useState([]);

//   useEffect(() => {
//     const toke = localStorage.getItem('token');
//     if (token) {
//       setToken(token);
//       fetchSpotifyData(token);
//     }
//   }, []);

//   const fetchSpotifyData = async (token:string) => {
//     try {
//       const response = await fetch("http://localhost:8000/getspotifygenres", {
//         method: "GET",
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data.genres);
//         console.log(data.artists);
//       } else {
//         console.error("Failed to fetch Spotify data");
//       }
//     } catch (error) {
//       console.error("Error fetching Spotify data:", error);
//     }
//   };

//   const handleSpotifyLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/spotifyauth/", {
//         method: "GET",
//       });
//       if (response.redirected) {
//         window.location.href = response.url;
//       }
//     } catch (error) {
//       console.error("Error initiating Spotify login:", error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center h-[735px] flex flex-col justify-between">
//         <header className="flex justify-between items-center px-8 md:px-28 py-5 md:py-10">
//           <div>
//             <h1 className="font-logo text-4xl md:text-[56px] md:leading-[67px] uppercase text-white">
//               Events Ibiza
//             </h1>
//           </div>
//           <div>
//             {token ? (
//               <Link href={"/account"}>
//                 <button className="bg-[#008EC4] text-white py-2 md:py-[14px] px-4 md:px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-xs md:text-[16px] md:leading-[24px]">
//                   ACCOUNT
//                 </button>
//               </Link>
//             ) : (
//               <Link href={"/sign-in"}>
//                 <button className="bg-[#008EC4] text-white py-2 md:py-[14px] px-4 md:px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-xs md:text-[16px] md:leading-[24px]">
//                   SIGN IN/UP
//                 </button>
//               </Link>
//             )}
//           </div>
//         </header>

//         <div className="bg-white mb-[-270px] md:mb-[-138px] mx-8 md:mx-24 rounded-[32px] p-6 md:px-12 md:py-10 shadow-lg blur-24 text-blue-800">
//           <div>
//             <div>
//               <h1 className="uppercase font-semi text-3xl md:text-[60px] md:leading-[90px] text-[#008EC4]">
//                 THE PARTY THAT SUITS YOU!
//               </h1>
//               <h3 className="uppercase font-para text-base md:text-[32px] text-black">
//                 FIND THE PARTY THAT MATCHES WITH YOUR VIBE!
//               </h3>
//             </div>

//             <button
//               className="bg-[#1DB954] text-white my-5 md:mt-[36px] md:mb-14 py-2 md:py-[14px] px-4 md:px-[24px] rounded-[50px] drop-shadow[2px_4px_2px_0px_#FFFFFF33;] uppercase font-para text-xs md:text-[16px] md:leading-[24px] flex items-center"
//               onClick={handleSpotifyLogin}
//             >
//               <Image
//                 src={"/spotify-logo.png"}
//                 alt="spotify-logo"
//                 width={30}
//                 height={30}
//                 className="mr-4"
//               />{" "}
//               GET YOUR FAVORITE ARTIST AND GENRES WITH SPOTIFY
//             </button>

//             <div className="">
//               <div className="flex flex-col md:flex-row justify-center md:items-center px-3 md:px-0 py-0 md:py-5 w-[100%] border-[1px] border-[#D9D9D9] rounded-[72px]">
//                 <Artistpopup />
//                 <Generepopup />
//                 <Startdatepopup />
//                 <Enddatepopup />
//                 <div className="w-full md:w-[12%] flex items-center justify-center md:justify-end py-4 md:py-0 md:pr-2">
//                   <button className="bg-[#008EC4] text-white rounded-[56px] p-[14px]">
//                     <Search className="w-[25px] h-[25px]" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-[270px] md:mt-[138px] px-8 md:px-24">
//         <h1 className="uppercase font-head text-3xl md:text-[40px] md:leading-[44px] text-[#1A1A1A] text-center py-16">
//           SEARCH RESULTS
//         </h1>
//         <div className="flex flex-col md:flex-row items-center gap-x-14">
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//         </div>
//         <div className="flex flex-col md:flex-row items-center gap-x-14 py-16">
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//           <div className="w-full md:w-[25%]">
//             <Card />
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <button className="font-head text-[#1A1A1A] text-[16px] leading-[24px] flex items-center text-center rounded-[40px] border-[1px] border-[#D8D8D8] py-[12px] px-[24px]">
//             Load more <ArrowRight className="w-[20px] h-[20px] ml-2" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Hero;
