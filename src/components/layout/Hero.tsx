import Image from "next/image";
import RightArrow from "../Icons/RightArrow";

export default function Hero() {
  return (
    <section className="hero mt-8">
      <div>
        <h1 className=" text-4xl font-semibold">
          Everything <br /> is better <br /> with a&nbsp;
          <span className="text-primary">pizza</span>
        </h1>
        <p className="my-6 py-4 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, simple yet
          delicious joy in life.
        </p>
        <div className="flex gap-4 items-center text-sm">
          <button className=" bg-primary flex gap-2 items-center uppercase text-white font-semibold py-2 px-4 rounded-full">
            Order now
            <RightArrow />
          </button>
          <button className="flex font-semibold gap-2 text-gray-600">
            Learn More
            <RightArrow />
          </button>
        </div>
      </div>
      <div className=" relative">
        {/* Height of pizza depends on the h1 text height */}
        <Image
          layout={"fill"}
          objectFit={"contain"}
          src={"/pizza2.png"}
          alt="ok"
        ></Image>
      </div>
      {/* <Image width={160} height={160} src={"/pizza2.png"} alt="ok"></Image> */}
    </section>
  );
}
