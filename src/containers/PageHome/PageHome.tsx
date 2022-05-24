import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { Helmet } from "react-helmet";

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Bali",
    taxonomy: "category",
    count: 225,
    thumbnail:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/fc/79/ec/we-looking-so-beautiful.jpg?w=300&h=300",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Lembang",
    taxonomy: "category",
    count: 152,
    thumbnail:
      "https://asset.kompas.com/crops/Dgq6wRKvCca6RoBzlCV4sbY28PU=/0x175:900x775/750x500/data/photo/2022/01/06/61d6a990c4220.jpg",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Tasikmalaya",
    taxonomy: "category",
    count: 78,
    thumbnail:
      "https://www.gotravelly.com/blog/wp-content/uploads/2018/08/tonjong-canyon-cipajutah.jpg",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Raja Ampat",
    taxonomy: "category",
    count: 55,
    thumbnail:
      "https://phinemo.com/wp-content/uploads/2018/01/wisata-raja-ampat-3.jpg",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Tasikmalaya",
    taxonomy: "category",
    count: 88,
    thumbnail:
      "https://indonesia.tripcanvas.co/id/wp-content/uploads/sites/2/2020/05/6-c-1-Dengdeng-by-tedy_syah23.jpg",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Labuan Bajo",
    taxonomy: "category",
    count: 46,
    thumbnail:
      "https://sgp1.digitaloceanspaces.com/tz-mag-id/wp-content/uploads/2021/09/040409090505/Penginapan-Labuan-Bajo-36.jpg",
  },
];

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "222",
    href: "/listing-stay",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Caritempat</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-32 lg:mb-32">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-20 pb-16" />

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          categories={DEMO_CATS}
          uniqueClassName="PageHome_s1"
        />

        {/* SECTION2 */}
        <SectionOurFeatures />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces />
        </div>

        {/* SECTION */}
        {/* <SectionHowItWork /> */}

        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div>

        {/* SECTION */}
        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
        />

        {/* SECTION */}
        <SectionSubscribe2 />

      </div>
    </div>
  );
}

export default PageHome;
