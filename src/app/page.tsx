import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />
      <section className=" text-center my-16">
        <SectionHeader subHeader={"Our Story"} mainHeader={"About us"} />
        <div className=" text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
            saepe. Minima vero eligendi obcaecati mollitia veritatis vel ducimus
            praesentium vitae sint?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ab
            saepe at necessitatibus reprehenderit et ex id dolorem ipsam dolor
            est soluta voluptatem, sint quisquam laudantium mollitia tempore non
            aliquid molestiae asperiores?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus, sunt. Tempore, molestias.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeader subHeader={"Don't hesitate"} mainHeader={"Contact Us"} />
        <a
          className=" text-4xl underline text-gray-500"
          href="tel:+912323232323"
        >
          +91 2323232323
        </a>
      </section>
    </>
  );
}
