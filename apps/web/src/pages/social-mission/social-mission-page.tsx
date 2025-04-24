import About from "@/components/social-mission/about";
import Blog from "@/components/social-mission/blog";
import Contact from "@/components/social-mission/contact";
import FooterSection from "@/components/social-mission/footer";
import Header from "@/components/social-mission/header";
import Instructor from "@/components/social-mission/instructor";
import Testimonial from "@/components/social-mission/testimonial";

const SocialMissionPage = () => {
  return (
    <div className="space-y-8">
      <Header />
      <About />
      <Instructor />
      <Testimonial />
      <Contact />
      <Blog />
      <FooterSection />
    </div>
  );
};

export default SocialMissionPage;
