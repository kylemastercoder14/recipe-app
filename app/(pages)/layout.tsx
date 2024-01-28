
import MainNavbar from "@/components/navbar";

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className="h-screen">
        <MainNavbar />
        {children}
      </div>
    );
  }
  
  export default AuthLayout;
  