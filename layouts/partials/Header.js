import Logo from "@components/Logo";
import menu from "@config/menu.json";
import socical from "@config/social.json";
import Social from "@layouts/components/Social";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const { main } = menu;
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  // helper to check active menu
  const isActive = (url) =>
    url === "/" ? router.asPath === "/" : router.asPath.startsWith(url);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-darkmode-dark shadow mx-4 my-4 rounded-lg">
      <nav className="navbar container px-3 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="order-0">
          <Logo />
        </div>

        {/* Menu + Social */}
        <div className="flex items-center space-x-6 xl:space-x-10">
          <div className={`collapse-menu ${!showMenu && "translate-x-full"} lg:flex lg:translate-x-0`}>
            {/* Close button for mobile */}
            <button
              className="absolute right-6 top-11 lg:hidden"
              onClick={() => setShowMenu(false)}
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2" transform="rotate(45 10 10)" />
              </svg>
            </button>

            {/* Main Menu */}
            <ul className="navbar-nav w-full md:w-auto md:space-x-6 lg:flex xl:space-x-10">
              {main.map((menuItem, i) => (
                <li key={`menu-${i}`} className="nav-item">
                  {menuItem.hasChildren ? (
                    <div className="nav-dropdown group relative">
                      <span
                        className={`nav-link font-bold inline-flex items-center ${
                          menuItem.children.some((c) => isActive(c.url)) ? "text-primary" : "text-dark"
                        }`}
                      >
                        {menuItem.name}
                        <svg className="h-5 w-5 fill-current ml-1" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul className="nav-dropdown-list hidden group-hover:block md:absolute md:top-[60px] md:block md:opacity-0 md:group-hover:opacity-100">
                        {menuItem.children.map((child, idx) => (
                          <li className="nav-dropdown-item" key={`child-${idx}`}>
                            <Link
                              href={child.url}
                              className={`font-bold ${isActive(child.url) ? "text-primary" : "text-dark"}`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={menuItem.url}
                      className={`nav-link block font-bold text-lg md:text-sm lg:text-sm ${
                        isActive(menuItem.url) ? "text-primary" : "text-dark"
                      }`}
                    >
                      {menuItem.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Header social */}
            <Social source={socical} className="socials text-xl ml-6" />
          </div>

          {/* Theme switcher */}
          <ThemeSwitcher />

          {/* Hamburger button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-2xl lg:hidden ml-4"
          >
            {showMenu ? (
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2" transform="rotate(45 10 10)" />
              </svg>
            ) : (
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {showMenu && <div className="header-backdrop absolute top-0 left-0 h-[100vh] w-full bg-black/50 lg:hidden"></div>}
    </header>
  );
};

export default Header;
