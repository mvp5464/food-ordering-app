import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";

export default function HomeMenu() {
  return (
    <section>
      <div className=" absolute h-fulls left-0 right-0 justify-center overflow-x-hiddens">
        <div className=" absolute -left-0 -stop-[30px] text-left -z-10">
          <Image src={"/leaf2.png"} alt="leaf" height={256} width={248} />
        </div>
        <div className="absolute -right-0 -stop-[50px] -z-10">
          <Image src={"/leaf2.png"} alt="leaf" height={256} width={248} />
        </div>
      </div>
      <SectionHeader subHeader={"Checkout"} mainHeader={"Menu"} />
      <div className=" grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
