import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, UsersIcon } from "@heroicons/react/24/solid";

function Room({ room }) {
  const { name, maxCapacity, image, description } = room;
  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative scale-[1.15] -translate-x-3">
        <Image src={image} alt={`Room ${name}`} fill className="object-cover" />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-5-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
          Room {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Room;
