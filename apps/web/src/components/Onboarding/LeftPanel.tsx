const data = [
  {
    role: "USER",
    heading: "Welcome to the Experience",
    description:
      "A person who uses the services or products provided by the company.",
  },
  {
    role: "CANDIDATE",
    heading: "Unlock Your Potential",
    description:
      "An individual applying for a job position or a role within the company.",
  },
  {
    role: "INTERVIEWER",
    heading: "Discover Talent Beyond Words",
    description:
      "A person responsible for conducting interviews to assess candidates.",
  },
  {
    role: "CUSTOMER",
    heading: "Your Satisfaction, Our Priority",
    description:
      "An individual or entity that purchases goods or services from the company.",
  },
  {
    role: "SERVICE_PROVIDER_COMPANY",
    heading: "Empowering Businesses, Enriching Lives",
    description:
      "A company that offers services to other businesses or individuals.",
  },
  {
    role: "INVESTOR",
    heading: "Invest in Tomorrow's Success",
    description:
      "An individual or organization that provides capital to the company in exchange for ownership equity or future financial return.",
  },
  {
    role: "CRM",
    heading: "Building Customer Relationships",
    description:
      "Customer Relationship Management focuses on managing a company's interactions with current and potential customers.",
  },
  {
    role: "SRM",
    heading: "Strengthening Supplier Connections",
    description:
      "Supplier Relationship Management involves managing and analyzing the interactions with organizations that supply goods and services to the company.",
  },
  {
    role: "IRM",
    heading: "Securing Information Assets",
    description:
      "Information Risk Management is responsible for identifying, assessing, and managing risks to the company's information assets.",
  },
];

const LeftPanel = ({
  isInfoSubmitted,
  selectedRole,
}: {
  isInfoSubmitted: boolean;
  selectedRole: string;
}) => {
  return (
    <div className="relative flex h-screen w-[40%] items-center justify-center bg-[url('/Onboarding/portrait.png')] text-center">
      <div className="h-screen w-full bg-tommyBlue opacity-70"></div>
      {isInfoSubmitted ? (
        <>
          {data
            .filter((x) => x.role === selectedRole)
            .map((item) => (
              <div className="absolute space-y-3 p-4 font-poppins text-white">
                <h1 className="font-roboto text-4xl tracking-wide">
                  {item.heading}
                </h1>
                <p className="font-poppins text-lg">{item.description}</p>
              </div>
            ))}
        </>
      ) : (
        <div className="absolute space-y-3 p-4 font-poppins text-white">
          <h1 className="font-roboto text-4xl tracking-wide">
            Let's Start Journey <br /> With{" "}
            <span className="text-5xl font-semibold uppercase text-tommyYellow">
              Empower
            </span>
          </h1>
          <p className="font-semibold">By Knowing you first</p>
          <p className="font-poppins text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            inventore nemo doloribus eveniet est aliquam eius cum excepturi
            expedita cumque.
          </p>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
