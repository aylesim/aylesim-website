import FeaturedDevice from "@/components/home/featured-device";
import Hero from "@/components/home/hero";
import NavCards from "@/components/home/nav-cards";
import OpenToWorkBanner from "@/components/home/open-to-work-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <NavCards />
      <FeaturedDevice />
      <OpenToWorkBanner />
    </>
  );
}
