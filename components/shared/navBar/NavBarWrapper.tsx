import NavBar from "./NavBar";

const apiUrl = process.env.API_URL;

async function getSiteBranding() {
  try {
    const data = await fetch(`${apiUrl}/settings/page/home`, {
      next: {
        tags: ["navbar-settings", "home-settings"],
      },
    });
    const homeSettings = await data.json();
    const menu = homeSettings.menu;

    const logoImageData = await fetch(`${apiUrl}/images/${menu.logoId}`, {
      next: {
        tags: ["navbar-logo"],
      },
    });
    const logoImageDataJson = await logoImageData.json();

    return {
      siteName: menu.title || "PremiArte",
      logo: {
        url: logoImageDataJson?.url,
        alt: logoImageDataJson?.alt || "Logo PremiArte",
      },
    };
  } catch {
    return {
      siteName: "PremiArte",
      logo: {
        url: "https://res.cloudinary.com/dn7npxeof/image/upload/v1758745993/premiarte/zwk5kvupzxwgna5s8uxx.png",
        alt: "Logo PremiArte",
      },
    };
  }
}

export default async function NavBarWrapper() {
  const branding = await getSiteBranding();

  console.log("branding", branding);
  return (
    <NavBar
      siteName={branding.siteName}
      logoUrl={branding.logo.url}
      logoAlt={branding.logo.alt}
    />
  );
}
