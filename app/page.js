import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        alt="Mountains and forests with a cabin"
        className="object-cover object-top"
        quality={80}
      />
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to our hotel
        </h1>
        <Link
          href="/rooms"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Exploure our rooms
        </Link>
      </div>
    </main>
  );
}
