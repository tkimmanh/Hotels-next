import PageTitle from "@/components/page-title";
import React, { Suspense } from "react";
import Spinner from "@/components/spinner";
import ReportsFilters from "./_common/report-filters";
import ReportsData from "./_common/report-data";

function ReportsPage({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <div className="mt-5">
        <PageTitle>Report</PageTitle>
      </div>

      <ReportsFilters searchParams={searchParams} />

      <Suspense key={suspenseKey} fallback={<Spinner fullHeight />}>
        <ReportsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default ReportsPage;
