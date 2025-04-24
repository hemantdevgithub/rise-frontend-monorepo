import { Quote } from "lucide-react";

interface TestimonialProps {
  image: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-5 w-5 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  image,
  name,
  role,
  quote,
  rating,
}: TestimonialProps) {
  return (
    <div className="relative rounded-2xl border bg-[#E8F3F0] p-8 shadow-lg">
      <div className="absolute left-8 top-3 h-12 w-12 overflow-hidden rounded-full">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="absolute right-8 top-8">
        <Quote className="h-8 w-8 text-emerald-600" />
      </div>
      <div className="pt-8">
        <p className="mb-6 italic leading-relaxed text-gray-600">{quote}</p>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
}

const Testimonial = () => {
  const testimonials = [
    {
      image:
        "https://cdn.prod.website-files.com/66d6b5efabcac22913f8211b/66d6b5efabcac22913f821e0_66b54373eeb8312cd8436f79_e2a9f6cb84af52d8a3e3e08a810be27962a9528a-922x922.jpeg",
      name: "Sunny Williams",
      role: "CEO Manager",
      quote:
        "LAMP Consultancy made my immigration process smooth and hassle-free. Their step-by-step guidance and timely updates were invaluable. I always felt informed and supported throughout the entire journey.",
      rating: 4.5,
    },
    {
      image:
        "https://cdn.prod.website-files.com/66d6b5efabcac22913f8211b/66d6b5efabcac22913f821e0_66b54373eeb8312cd8436f79_e2a9f6cb84af52d8a3e3e08a810be27962a9528a-922x922.jpeg",
      name: "Ranjith Hills",
      role: "CEO Manager",
      quote:
        "LAMP Consultancy made my immigration process smooth and hassle-free. Their step-by-step guidance and timely updates were invaluable. I always felt informed and supported throughout the entire journey.",
      rating: 4.5,
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto mb-12 mt-20 max-w-3xl">
        <div className="aspect-video overflow-hidden rounded-xl bg-[#E8F3F0]">
          <img
            src="https://s3-alpha-sig.figma.com/img/3ccb/f240/44a1b4eeaab8f8612190feca35166fb3?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SrGACCZTD1z5OV2DXxed69JIBbZbuhGe6PVQga0jvKOghBAiE3vasXklf-cKXq85ofBnxoHmjOw6-z6OoS376Es02mrvwd8SE7oeVDomg9UitQKDfQK~-sr6UzWj~gpn9Vb6BFJfSySstLe58KqeC3Q2oqFophg0XkYU5LmcPe9izVRMQ7Sky3jrzA3TgH1qm6OrxSKV-JgeBn7gMqVLx9FiYiTVQyZGRZgWi9ST-ehxSRIBMFrxlNxOQ9Z9F08M3vroahxQES8a1Ysc~MkZMhiBm7ImFZDYIOrlN6CCxHNbqGAtfXwfLEWt606lNMj7j5eJ-sfx8rpbYNHWLfwzgA__"
            alt="Learning illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm text-gray-600">Testimonial</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            What Learners Saying
            <br />
            About our Courses
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
