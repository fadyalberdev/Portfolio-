import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProject from "@/components/FeaturedProject";
import MoreProjects from "@/components/MoreProjects";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import BeyondCode from "@/components/BeyondCode";
import Contact from "@/components/Contact";
import { getRepos } from "@/lib/github";

export default async function Home() {
  const repos = await getRepos();
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <FeaturedProject />
        <MoreProjects repos={repos} />
        <Skills />
        <Terminal />
        <BeyondCode />
      </main>
      <Contact />
    </>
  );
}
