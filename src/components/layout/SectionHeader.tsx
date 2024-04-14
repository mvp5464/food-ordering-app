export default function SectionHeader({
  subHeader,
  mainHeader,
}: {
  subHeader: string;
  mainHeader: string;
}) {
  return (
    <div className=" text-center mb-4">
      <h3 className=" uppercase font-semibold text-gray-500 leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
    </div>
  );
}
