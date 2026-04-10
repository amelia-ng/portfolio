import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, logo_white, logo_width, logo_height, logo_text, title } =
    config.site;
  const logoWidthValue = Number(String(logo_width).replace("px", ""));
  const logoHeightValue = Number(String(logo_height).replace("px", ""));
  const headerLogoScale = 1.12;
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Link href="/" className="navbar-brand">
      {src || logo ? (
        <ImageFallback
          width={logoWidthValue * 2}
          height={logoHeightValue * 2}
          src={
            mounted && (theme === "dark" || resolvedTheme === "dark")
              ? logo_white
              : logo
          }
          alt={title}
          priority
          style={{
            height: `${Math.round(logoHeightValue * headerLogoScale)}px`,
            width: `${Math.round(logoWidthValue * headerLogoScale)}px`,
          }}
          className={"m-auto"}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
