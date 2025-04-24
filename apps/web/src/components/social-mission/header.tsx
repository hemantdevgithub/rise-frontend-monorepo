import { ArrowLeft, Edit, Settings, User2 } from "lucide-react";
import { useNavigate } from "react-router";

const Header = () => {
  const features = [
    {
      title: "Expert Mentor",
      description:
        "Reconceptualize reliable value competitive deliverables. Mbra 24/365 erailers via virtual.",
      icon: <User2 className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "Best In Class Content",
      description:
        "Reconceptualize reliable value competitive deliverables. Mbra 24/365 erailers via virtual.",
      icon: <Edit className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "Growth Potential",
      description:
        "Reconceptualize reliable value competitive deliverables. Mbra 24/365 erailers via virtual.",
      icon: <Settings className="h-6 w-6 text-gray-500" />,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="mx-auto px-4 py-6">
        <div onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-xl font-semibold">Rise</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto px-4">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <span className="mb-4 block text-sm text-gray-600">
            Feed Your Knowledge
          </span>
          <h1 className="relative mb-4 inline-block text-4xl font-bold md:text-5xl">
            Learn New Skills With
            <br />
            Top professionals
            <div className="absolute -bottom-2 left-0 w-full">
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
          <p className="mx-auto mt-6 max-w-2xl text-gray-600">
            Objectively redefine out-box technologies for the multimedia based
            is the course network. Proactively is architect economically
          </p>
        </div>

        {/* Illustration Section */}
        <div className="mx-auto mb-12 max-w-3xl">
          <div className="aspect-video overflow-hidden rounded-xl bg-[#E8F3F0]">
            <img
              src="https://foundr.com/wp-content/uploads/2023/07/Pick-up-new-skills-learning.jpg"
              alt="Learning illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto max-w-6xl pb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                className="rounded-2xl border bg-white p-6 shadow-lg"
                key={index}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  {feature?.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature?.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Header;
