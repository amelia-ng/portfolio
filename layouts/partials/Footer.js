import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative mt-0 pt-[5px]">
      <div className="border-b border-border dark:border-darkmode-border "></div>
      <div className="container text-center">
        <div className="pt-[50px] inline-flex">
          <Logo />
        </div>
        {markdownify(footer_content, "p")}

        {/* footer menu */}
        <ul className="mt-3 mb-6 flex-wrap space-x-2 lg:space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                href={`${menu.url}`}
                className="p-2 font-bold text-dark hover:text-primary dark:text-darkmode-light lg:p-4"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <div className="inline-flex">
          <Social source={social} className="socials mt-2 justify-center [&_a]:text-4xl" />
        </div>
        {/* copyright */}
        {markdownify(copyright, "p")}
      </div>
    </footer>
  );
};

export default Footer;
