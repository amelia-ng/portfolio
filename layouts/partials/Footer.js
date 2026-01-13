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
    <footer className="section relative mt-20 pt-[50px]">
      <ImageFallback
        className="absolute bottom-0 top-10 left-0 z-[-1] w-full"
        width={1905}
        height={215}
        src="/images/footer-bg-shape.svg"
        alt="footer background"
        priority
      />
      <div className="container text-center">
        <div className="pt-[150px] inline-flex">
          <Logo />
        </div>
        {markdownify(footer_content, "p")}

        {/* footer menu */}
        <ul className="mt-10 mb-6 flex-wrap space-x-2 lg:space-x-4">
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
          <Social source={social} className="socials mb-1 justify-center" />
        </div>
        {/* copyright */}
        {markdownify(copyright, "p")}
      </div>
    </footer>
  );
};

export default Footer;
