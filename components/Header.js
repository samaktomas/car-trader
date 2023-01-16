import {
  GlobeAltIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 bg-sky-200 shadow-md p-5 md:px-10">
      <div className="flex items-center h-10 my-auto cursor-pointer ">
        <p className="inline mr-8">CAR TRADER</p>
        <div
          onClick={() => router.push("/")}
          className="mx-2 text-gray-600 font-bold hover:text-black cursor-pointer "
        >
          Home
        </div>
        <div
          onClick={() => router.push("/faq")}
          className="mx-2 text-gray-600 font-bold hover:text-black cursor-pointer "
        >
          Faq
        </div>
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <GlobeAltIcon className="h-6" />

        <div className="flex space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
    </header>
  );
}

export default Header;
