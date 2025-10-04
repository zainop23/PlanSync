import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default async function ProjectLayout({ children }:any) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<BarLoader width={"100%"} color="white" />}>
        {children}
      </Suspense>
    </div>
  );
}