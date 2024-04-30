import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export default function EditableImage({
  link,
  setLink,
}: {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}) {
  async function handleFileChange(e: any) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (res: Response) => {
        if (res.ok) {
          const link1 = await res.json();
          setLink(link1);
        }
        throw new Error("Something went wrong");
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "upload complete",
        error: "Upload error",
      });
    }
  }
  return (
    <>
      {/* <div className="p-2 rounded-lg relative max-w-[120px]"> */}
      {link && (
        <Image
          className=" rounded-lg w-full h-full mb-1"
          src={link}
          alt={"Avatar"}
          width={250}
          height={250}
        />
      )}
      {!link && (
        <div className=" text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className=" block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
      {/* </div> */}
    </>
  );
}
