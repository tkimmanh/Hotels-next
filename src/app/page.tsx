import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spinner from "@/components/spinner";
import Filters from "./_common/filters";
import Slider from "./_common/slider";

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
        <Slider></Slider>
        <Filters searchParams={searchParams}></Filters>
        <RoomsData searchParams={searchParams}></RoomsData>
      </Suspense>
    </main>
  );
}
