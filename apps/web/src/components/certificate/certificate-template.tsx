import React from "react";

interface CertificateTemplateProps {
  fullName: string;
  title: string;
  date: string;
  type: string;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({
  fullName,
  title,
  type,
}) => {
  return (
    <div className="relative mx-auto max-w-7xl rounded-lg border-4 border-rise bg-white p-10 px-48 text-center shadow-2xl">
      {/* Top Decorative Corners */}
      <div className="absolute left-0 top-0 h-16 w-16 bg-[#FFC000]"></div>
      <div className="absolute right-0 top-0 h-16 w-16 bg-[#FFC000]"></div>

      {/* Header */}
      <h1 className="mb-2 text-5xl font-extrabold text-[#0a2f41]">
        CERTIFICATE
      </h1>
      <h2 className="mb-8 text-3xl font-semibold text-[#0a2f41]">
        OF ACHIEVEMENT
      </h2>

      {/* Content */}
      <p className="mb-4 text-xl font-light text-gray-700">
        This certificate is awarded to
      </p>
      <h2 className="mb-6 text-4xl font-bold text-[#0a2f41]">{fullName}</h2>
      <p className="mb-4 text-xl font-light text-gray-700">
        for successfully completing the {type}
      </p>
      <h3 className="mb-6 text-3xl font-semibold italic text-[#FFC000]">
        {title}
      </h3>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-around space-x-9">
        <div className="text-left">
          <p className="text-lg font-semibold text-[#0a2f41]">Satyadeep</p>
          <p className="text-sm text-gray-600">Founder</p>
        </div>
        <div className="flex h-28 w-28 items-center justify-center rounded-full">
          <span className="text-xl font-bold text-[#0a2f41]">
            <img src="/RISELogo.png" className="size-" alt="LOGO" />
          </span>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-[#0a2f41]">Satyadeep</p>
          <p className="text-sm text-gray-600">Manager</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
