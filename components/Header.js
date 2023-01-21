import {
  GlobeAltIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 bg-blue-500 shadow-md p-5 md:px-10">
      <div className="flex items-center h-10 my-auto cursor-pointer ">
        <Image
          width={100}
          height={50}
          style={{ objectFit: "contain" }}
          src="/photos/logo/logo.png"
          className="pr-10"
        />
        <div
          onClick={() => router.push("/")}
          className="mx-2 text-gray-200 font-bold hover:text-white cursor-pointer"
        >
          Home
        </div>
        <div
          onClick={() => router.push("/faq")}
          className="mx-2 text-gray-200 font-bold hover:text-white cursor-pointer"
        >
          FAQ
        </div>
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-200">
        <GlobeAltIcon className="h-6 hover:text-white cursor-pointer" />

        <div className="flex space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 hover:text-white cursor-pointer" />
          <UserCircleIcon className="h-6 hover:text-white cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Header;
