import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spinner from "@/components/spinner";
import Filters from "./_common/filters";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    checkIn: string;
    checkOut: string;
    type: string;
  };
}) {
  return (
    <main>
      <Suspense fallback={<Spinner></Spinner>}>
        <Filters searchParams={searchParams}></Filters>
        <RoomsData searchParams={searchParams}></RoomsData>
      </Suspense>
    </main>
  );
}
