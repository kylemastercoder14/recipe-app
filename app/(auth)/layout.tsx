const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-screen flex items-center justify-center m-auto">
      {children}
    </div>
  );
}

export default AuthLayout;
