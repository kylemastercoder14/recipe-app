import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  width: number;
}

const Logo = ({
  width
}: LogoProps) => {
    const { theme } = useTheme();
  return (
    <Link href="/home">
      {theme === "light" ? (
        <Image src="/images/logo/logo-light.png" width={width} height={200} alt="Light Logo" />
      ) : (
        <Image src="/images/logo/logo-dark.png" width={width} height={200} alt="Dark Logo" />
      )}
    </Link>
  );
};

export default Logo;
