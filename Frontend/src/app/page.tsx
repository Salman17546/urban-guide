import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero/>
    <div className="px-8 md:px-24 py-14 md:py-[105px]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[36%] ">
          <Image
            src={"/subscribe-img.png"}
            alt="..."
            width={428}
            height={360}
            className="w-full h-[220px] md:h-[360px] object-cover rounded-tl-[32px] rounded-tr-[32px]  md:rounded-bl-[32px] md:rounded-tr-none"
          />
        </div>
        <div className="w-full px-5 md:px-0 md:w-[64%] bg-[#F3F3F3] rounded-br-[32px] rounded-bl-[32px] md:rounded-tr-[32px] md:rounded-bl-none h-[315px] md:h-[360px]">
          {" "}
          <div className="flex flex-col items-center pt-10 md:pt-[90px]">
            <h1 className="font-head text-xl md:text-[32px] md:leading-[42px] text-center text-black">
              Get special offers,
              <br /> and the best events in Ibiza!
            </h1>
            <div className="bg-white md:w-[544px] h-[50px] md:h-[64px] rounded-[56px] shadow-[0px_8px_16px_0px_#00000014] flex items-center justify-between mt-5">
              {" "}
              <div className=" w-[80%] md:w-[70%]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white font-para outline-none focus:border-[#fff] w-full h-[80%] ml-6"
                />
              </div>
              <div className="hidden md:block w-[30%]"><button className="font-head text-sm md:text-[16px] text-[#F6F6F6] bg-[#008395] md:leading-[22px] py-2 md:py-[12px] px-5 md:px-[36px] rounded-[72px]">Subscribe</button></div>
            </div>
            <button className="block md:hidden mt-4 font-head text-sm md:text-[16px] text-[#F6F6F6] bg-[#008395] md:leading-[22px] py-3 md:py-[12px] px-7 md:px-[36px] rounded-[72px]">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
