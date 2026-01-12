import {
  IoCall,
  IoGlobeOutline,
  IoLocation,
  IoLogoBehance,
  IoLogoBitbucket,
  IoLogoCodepen,
  IoLogoDiscord,
  IoLogoDribbble,
  IoLogoFacebook,
  IoLogoFoursquare,
  IoLogoGithub,
  IoLogoGitlab,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoMedium,
  IoLogoPinterest,
  IoLogoReddit,
  IoLogoRss,
  IoLogoSkype,
  IoLogoSlack,
  IoLogoSnapchat,
  IoLogoSoundcloud,
  IoLogoStackoverflow,
  IoLogoTiktok,
  IoLogoTumblr,
  IoLogoTwitter,
  IoLogoVimeo,
  IoLogoVk,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoMail,
} from "react-icons/io5";

const Social = ({ source, className }) => {
  const socials = [
    { key: "facebook", icon: <IoLogoFacebook /> },
    { key: "twitter", icon: <IoLogoTwitter /> },
    { key: "instagram", icon: <IoLogoInstagram /> },
    { key: "linkedin", icon: <IoLogoLinkedin /> },
    { key: "github", icon: <IoLogoGithub /> },
    { key: "gitlab", icon: <IoLogoGitlab /> },
    { key: "youtube", icon: <IoLogoYoutube /> },
    { key: "medium", icon: <IoLogoMedium /> },
    { key: "stackoverflow", icon: <IoLogoStackoverflow /> },
    { key: "discord", icon: <IoLogoDiscord /> },
    { key: "slack", icon: <IoLogoSlack /> },
    { key: "codepen", icon: <IoLogoCodepen /> },
    { key: "bitbucket", icon: <IoLogoBitbucket /> },
    { key: "dribbble", icon: <IoLogoDribbble /> },
    { key: "behance", icon: <IoLogoBehance /> },
    { key: "pinterest", icon: <IoLogoPinterest /> },
    { key: "soundcloud", icon: <IoLogoSoundcloud /> },
    { key: "tumblr", icon: <IoLogoTumblr /> },
    { key: "reddit", icon: <IoLogoReddit /> },
    { key: "vk", icon: <IoLogoVk /> },
    { key: "whatsapp", icon: <IoLogoWhatsapp /> },
    { key: "snapchat", icon: <IoLogoSnapchat /> },
    { key: "vimeo", icon: <IoLogoVimeo /> },
    { key: "tiktok", icon: <IoLogoTiktok /> },
    { key: "foursquare", icon: <IoLogoFoursquare /> },
    { key: "skype", icon: <IoLogoSkype /> },
    { key: "rss", icon: <IoLogoRss /> },
    { key: "website", icon: <IoGlobeOutline /> },
    { key: "email", icon: <IoMail />, prefix: "mailto:" },
    { key: "phone", icon: <IoCall />, prefix: "tel:" },
    { key: "address", icon: <IoLocation /> },
  ];

  return (
    <ul className={className}>
      {socials.map(({ key, icon, prefix }) => {
        const value = source?.[key];
        if (!value) return null;

        const href = prefix ? `${prefix}${value}` : value;

        return (
          <li key={key} className="inline-block">
            <a
              href={href}
              aria-label={key}
              target={prefix ? undefined : "_blank"}
              rel="noopener noreferrer nofollow"
            >
              {icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Social;
