import { Separator } from "@repo/ui";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-[#004D40] text-white">
      {/* Top Contact Bar */}
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-x-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <span>1234567890</span>
          </div>
          <div className="h-[80px] w-[1px] rotate-180 bg-white" />

          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>Rise@gmail.com</span>
          </div>
        </div>
      </div>

      <Separator className="bg-white" />

      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Information Column */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Information</h2>
            <p className="leading-relaxed text-gray-300">
              Redefine the technologies for multimedia based the in this is
              networks.
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Categories</h2>
            <div className="flex gap-x-4">
              <div>
                <a
                  href="#"
                  className="block text-gray-300 transition-colors hover:text-white"
                >
                  Tierpreneurs
                </a>
                <a
                  href="#"
                  className="block text-gray-300 transition-colors hover:text-white"
                >
                  Startups
                </a>
                <a
                  href="#"
                  className="block text-gray-300 transition-colors hover:text-white"
                >
                  MSME
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="block text-gray-300 transition-colors hover:text-white"
                >
                  Impact
                </a>
                <a
                  href="#"
                  className="block text-gray-300 transition-colors hover:text-white"
                >
                  Supply Chain
                </a>
              </div>
            </div>
          </div>

          {/* Contacts Column */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Contacts</h2>
            <p className="mb-6 leading-relaxed text-gray-300">
              Redefine the technologies for multimedia based the in this is
              networks.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition-colors hover:bg-white hover:text-[#004D40]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition-colors hover:bg-white hover:text-[#004D40]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition-colors hover:bg-white hover:text-[#004D40]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition-colors hover:bg-white hover:text-[#004D40]"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
