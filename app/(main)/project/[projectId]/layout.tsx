import { Suspense } from "react";
import { BarLoader } from "react-spinners";

type ProjectLayoutProps = {
  children: React.ReactNode;
};

export default async function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<BarLoader width={"100%"} color="white" />}>
        {children}
      </Suspense>
    </div>
  );
}