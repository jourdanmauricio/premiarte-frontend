import { SocialLink } from "@/app/shared/types";
import Image from "next/image";
import { Link } from "next-view-transitions";

const apiUrl = process.env.API_URL;

/* Settings data */
const data = await fetch(`${apiUrl}/settings/page/home`, {
  next: {
    tags: ["footer-settings"],
  },
});
const homeSettings = await data.json();

const footer = homeSettings.footer;

const socialLinks = await Promise.all(
  footer.socialLinks.map(async (socialLink: SocialLink) => {
    if (socialLink.image) {
      const imageData = await fetch(`${apiUrl}/images/${socialLink.image}`, {
        next: { tags: ["social-links"] },
      });
      const imageDataJson = await imageData.json();
      if (imageDataJson) {
        return {
          ...socialLink,
          imageDet: {
            url: imageDataJson.url,
            alt: imageDataJson.alt,
          },
        };
      }
    }
    return null;
  }),
);

const logoImageData = await fetch(`${apiUrl}/images/${footer.logoId}`, {
  next: { tags: ["footer-logo"] },
});
const logoImageDataJson = await logoImageData.json();
const logoImage = {
  url: logoImageDataJson.url,
  alt: logoImageDataJson.alt,
};

const Footer = () => {
  return (
    <footer className="border-t text-muted-foreground">
      <div className="container px-4 py-8 md:px-6 md:pt-20 mx-auto">
        <div className="flex flex-col gap-8 items-start lg:flex-row">
          <div className="space-y-4 w-full text-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logoImage.url || "/default-logo.png"}
                alt={logoImage.alt || "Premiearte Logo"}
                width={60}
                height={60}
                className="mx-auto"
              />
            </Link>
            <p className="text-sm">{footer.siteName}</p>
            <p className="text-sm">{footer.siteText}</p>
            <div className="flex gap-4 items-center justify-center">
              {socialLinks.map((social: SocialLink) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="hover:text-primary"
                  target="_blank"
                >
                  <Image
                    src={social.imageDet?.url || ""}
                    alt={social.imageDet?.alt || "Premiearte Logo"}
                    width={24}
                    height={24}
                    className="h-8 w-8"
                  />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 w-full">
            <h3 className="text-base font-medium text-muted-foreground text-center">
              {footer.siteAbout}
            </h3>
            <div className="max-w-[600px] text-center text-muted-foreground md:text-sm mx-auto">
              <p>{footer.siteAboutDescription}</p>
            </div>
          </div>

          <div className="space-y-4 w-full">
            <h3 className="text-base font-medium text-muted-foreground text-center">
              Contacto
            </h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="mx-auto">
                <p>{footer.siteAddress}</p>
                <p>{footer.siteCity}</p>
                <p>{footer.sitePhone}</p>
                {/* <!-- <p>{footerWithImages.siteEmail}</p> --> */}
                <a href={`mailto:${footer.siteEmail}`}>{footer.siteEmail}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <div className="flex flex-col gap-4 lg:flex-row items-center lg:justify-between w-full">
            <p className="text-xs text-muted-foreground text-center w-1/3">
              &copy; {new Date().getFullYear()}{" "}
              {/*{footer.textReserved || 'Premiearte'}.*/}© 2025 Premiarte
              derechos reservados.
            </p>
            <div className="flex flex-col border-y lg:border-none lg:flex-row lg:py-4 justify-center gap-4 mx-auto w-1/3">
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Cookies Policy
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mx-auto w-1/3 justify-center">
              Desarrollo
              <a
                href="#"
                target="_blank"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                LumauDev
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
