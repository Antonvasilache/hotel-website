import Link from "next/link";
import Image from "next/image";
import about1 from "@/public/about-1.jpg";
import { getCabins } from "@/helpers/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

async function Page() {
  const cabins = await getCabins();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Campfire Hotel
        </h1>

        <div className="space-y-8">
          <p>
            The beauty of nature and the comfort of home, hidden away in the
            heart of the woods, this is your home away from home. Experience
            reconnecting with nature and enjoying the simple joy of life, from
            the comfort of our rooms.
          </p>
          <p>
            Feel right at home in one of our {cabins.length} luxury rooms, and
            explore the freedom and peace within the surrounding mountains. Walk
            through the forests, breathe in the fresh air and watch the stars
            shine from the warmth of a campfire or a hot tub.
          </p>
          <p>
            Make memorable moments in here, surrounded by nature&apos;s beauty.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={about1}
          alt="Family sitting around a fire in front of a cabin"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="col-span-2 relative aspect-square">
        <Image
          src="/about-2.jpg"
          fill
          alt="Family that manages the Campfire Hotel"
          className="object-cover"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Family owned since 1993
        </h1>

        <div className="space-y-8">
          <p>
            The Campfire Hotel has been a family owned retreat since its
            inception. Nurtured with love and care, it has always been a
            testament of our dedication to create a warm, welcoming
            accomodation.
          </p>
          <p>
            Throughout the years, we have worked to maintain the heart of what
            is The Campfire, as a timeless place where the beauty of nature
            meets the comfort of home. Join us in our little corner of nature,
            where every visit feels like coming home.
          </p>

          <div>
            <Link
              href="/rooms"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
