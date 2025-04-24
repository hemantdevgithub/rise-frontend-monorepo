import { Check } from "lucide-react";

interface FeatureItemProps {
  title: string;
  description: string;
}

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
        <Check className="h-5 w-5 text-green-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

const About = () => {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="mx-auto mb-12 max-w-3xl">
            <div className="aspect-video overflow-hidden rounded-xl bg-[#E8F3F0]">
              <img
                src="https://www.mckinsey.com/~/media/mckinsey/mckinsey%20quarterly/the%20five%20fifty/soft-skills-1536x1536.png"
                alt="Student learning"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-xl">
            <span className="mb-4 block text-sm text-gray-600">About us</span>
            <h1 className="relative mb-4 inline-block text-3xl font-bold md:text-5xl">
              Improve Your Skills
              <br />
              Learn With Us From Anywhere
              <div className="absolute bottom-10 left-5 w-full">
                <svg
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3 w-48"
                >
                  <path
                    d="M2 8.5C52.6667 4.5 159.6 -1.5 298 8.5"
                    stroke="#FF6B6B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </h1>
            <p className="mb-8 text-gray-600">
              Revolutionize learner mindset mass services we are world-class
              quality sectors. Collaboratively visualize customer relationships
              via ubiquitous leadership skills.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">
                  Skilled and experienced coaches
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">
                  25K+ review with 5 star rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-xl">
            <span className="mb-4 block text-sm text-gray-600">
              Why Choose US
            </span>
            <h1 className="relative mb-4 inline-block text-3xl font-bold md:text-5xl">
              We Have Best Tutors
              <br />& Feels Like Real Classroom
              <div className="absolute bottom-10 left-5 w-full">
                <svg
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3 w-48"
                >
                  <path
                    d="M2 8.5C52.6667 4.5 159.6 -1.5 298 8.5"
                    stroke="#FF6B6B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <FeatureItem
                title="Best Instructors"
                description="Get hands-on training from industry experts with years of experience"
              />
              <FeatureItem
                title="World-Class Feed Expert"
                description="Learn from professionals who are active in the industry"
              />
              <FeatureItem
                title="Highly Experienced"
                description="Our tutors have proven track records of success"
              />
              <FeatureItem
                title="Best High Quality Teams"
                description="Work with dedicated teams committed to your success"
              />
            </div>
          </div>

          <div className="mx-auto mb-12 max-w-3xl">
            <div className="aspect-video overflow-hidden rounded-xl bg-[#E8F3F0]">
              <img
                src="https://www.mckinsey.com/~/media/mckinsey/mckinsey%20quarterly/the%20five%20fifty/soft-skills-1536x1536.png"
                alt="Student learning"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <div className="mx-auto px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="text-sm text-gray-600">Choose your business</span>
            <h2 className="mt-2 text-4xl font-bold">Discover your gain</h2>
          </div>

          {/* Two Column Grid */}
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {/* Left Column */}
            <div>
              <div className="mx-auto mb-12 max-w-3xl">
                <div className="aspect-video overflow-hidden rounded-xl bg-[#E8F3F0]">
                  <img
                    src="https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg"
                    alt="Online training illustration"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Start From Today</h3>
                <p className="text-xl font-bold">
                  Join our training course & Build your Skill
                </p>
                <button className="rounded-full bg-yellow-400 px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-500">
                  Join now
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mx-auto mb-12 max-w-3xl">
                <div className="aspect-video overflow-hidden rounded-xl bg-[#E8F3F0]">
                  <img
                    src="https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg"
                    alt="Online training illustration"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Build Your Business</h3>
                <p className="text-xl font-bold">Educate & Spread Knowledge</p>
                <button className="rounded-full bg-yellow-400 px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-500">
                  Join now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
