import Image from "next/image";
import RightArrow from "../Icons/RightArrow";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className=" text-4xl font-semibold">
          Everything <br /> is better <br /> with a&nbsp;
          <span className="text-primary">pizza</span>
        </h1>
        <p className="my-6 py-4 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, simple yet
          delicious joy in life.
        </p>
        <div className="flex gap-4 items-center text-sm">
          <button className=" bg-primary flex justify-center gap-2 items-center uppercase text-white font-semibold py-2 px-4 rounded-full">
            <Link href={"/menu"}>Order now</Link>
            <RightArrow />
          </button>
          <button className="flex border-0 items-center font-semibold gap-2 text-gray-600">
            <Link href={"/#about"}>Learn More</Link>
            <RightArrow />
          </button>
        </div>
      </div>
      <div className=" relative hidden md:block">
        {/* Height of pizza depends on the h1 text height */}
        <Image
          fill
          style={{ objectFit: "contain" }}
          src={"/pizza2.png"}
          alt="ok"
          priority={true}
        ></Image>
      </div>
      {/* <Image width={160} height={160} src={"/pizza2.png"} alt="ok"></Image> */}
    </section>
  );
}
