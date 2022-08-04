import SectionHero from "page-components/SectionHero/SectionHero";
import BgGlassmorphism from "page-components/BgGlassmorphism/BgGlassmorphism";
import { Helmet } from "react-helmet";
import Main from "page-components/Main";

function PageHome() {
  return (
    <Main>
      <div className="nc-PageHome relative overflow-hidden">
        <Helmet>
          <title>Caritempat</title>
        </Helmet>
        <BgGlassmorphism />
        <div className="container relative space-y-24 mb-24 lg:space-y-32 lg:mb-32">
          <SectionHero className="pt-10 lg:pt-20 pb-16"/>
        </div>
      </div>
    </Main>
  );
}

export default PageHome;
