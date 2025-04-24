import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

interface InstructorProps {
  name: string;
  role: string;
  image: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
  };
}

function InstructorCard({ name, role, image, socialLinks }: InstructorProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div>
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="p-6 text-center">
        <h3 className="mb-1 text-xl font-bold">{name}</h3>
        <p className="mb-4 text-sm text-gray-600">{role}</p>
        <div className="flex justify-center gap-4">
          <a
            href={socialLinks.facebook}
            className="rounded-full border p-3 text-gray-600 hover:text-gray-900"
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </a>
          <a
            href={socialLinks.twitter}
            className="rounded-full border p-3 text-gray-600 hover:text-gray-900"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href={socialLinks.instagram}
            className="rounded-full border p-3 text-gray-600 hover:text-gray-900"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href={socialLinks.youtube}
            className="rounded-full border p-3 text-gray-600 hover:text-gray-900"
          >
            <Youtube className="h-5 w-5" />
            <span className="sr-only">YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const Instructor = () => {
  const instructors = [
    {
      name: "John Doe",
      role: "MSME",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGNlbnRyaWN8ZW58MHx8MHx8fDA%3D",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      name: "John Doe",
      role: "Terpreneur",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGNlbnRyaWN8ZW58MHx8MHx8fDA%3D",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      name: "Shiva Krishna",
      role: "Impact Entity",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMGNlbnRyaWN8ZW58MHx8MHx8fDA%3D",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-sm text-gray-600">Instructor</span>
          <h2 className="mt-2 text-4xl font-bold">
            Our Professional Instructor
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructor;
