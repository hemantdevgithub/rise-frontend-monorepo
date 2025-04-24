interface BlogPost {
  category: string;
  date: string;
  title: string;
  image: string;
  link: string;
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <a href={post.link} className="block">
        <div className="relative aspect-[4/3]">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center gap-4">
            <span className="rounded-md bg-pink-50 px-3 py-2 text-sm font-medium text-pink-500">
              {post.category}
            </span>
            <span className="rounded-md bg-pink-50 px-3 py-2 text-sm font-medium text-pink-500">
              {post.date}
            </span>
          </div>
          <h3 className="text-xl font-bold leading-tight transition-colors hover:text-gray-600">
            {post.title}
          </h3>
        </div>
      </a>
    </div>
  );
}

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      category: "Business",
      date: "21 Jan 2024",
      title: "Be educated & Spread Knowledge",
      image:
        "https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg",
      link: "#",
    },
    {
      category: "Investment",
      date: "21 Jan 2024",
      title: "Join our training course & Build your Skill",
      image:
        "https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg",
      link: "#",
    },
    {
      category: "Marketing",
      date: "21 Jan 2024",
      title: "Education & Spread Knowledge",
      image:
        "https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg",
      link: "#",
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-sm text-gray-600">Our Recent Articles</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Latest Blog & News
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
