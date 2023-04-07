import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <header
      className=" sticky top-0 z-50 bg-blue-700/60 backdrop-blur-md shadow-md 
    p-5 md:px-10 items-center"
    >
      <div className="max-w-7xl flex justify-between mx-auto text-xl ">
        <div className="flex items-center h-10 my-auto space-x-10">
          <Image
            width={100}
            height={50}
            style={{ objectFit: "contain" }}
            src="/photos/logo/logo.png"
            className="pr-10"
          />
          <div
            onClick={() => router.push("/")}
            className="mx-2 text-gray-200 hover:text-white cursor-pointer 
            uppercase tracking-[4px] "
          >
            Home
          </div>
          <div
            onClick={() => router.push("/faq")}
            className="mx-2 text-gray-200 hover:text-white cursor-pointer 
            uppercase tracking-[4px] "
          >
            FAQ
          </div>
        </div>

        <div className="flex space-x-2 border-2 p-2 rounded-full text-gray-200">
          <Bars3Icon className="h-6 hover:text-white cursor-pointer" />
          <UserCircleIcon className="h-6 hover:text-white cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Header;
