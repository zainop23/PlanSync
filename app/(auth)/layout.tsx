
export type LayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
  return <div className="flex justify-center items-center pt-24">{children}</div>;
};

export default AuthLayout