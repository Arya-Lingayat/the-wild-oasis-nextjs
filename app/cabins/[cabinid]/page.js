import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "@/app/_lib/data-service";

import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

//Dynamic metadata
export async function generateMetadata({ params }) {
  const { cabinid } = await params;
  const { name } = await getCabin(cabinid);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinid: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  const { cabinid } = await params;
  const cabin = await getCabin(cabinid);

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div>
      <div className="max-w-6xl mx-auto mt-8">
        <Cabin cabin={cabin} />
      </div>

      <div>
        <h2 className="text-5xl text-accent-400 mb-10 font-semibold text-center">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
