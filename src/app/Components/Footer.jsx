import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Solutions", "Pricing", "Releases"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Contact"]
    },
    {
      title: "Resources",
      links: ["Documentation", "Help Center", "Blog", "Community"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6 md:px-20">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Logo and Tagline */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="./public/Jobfolio.png" alt="Jobfolio" className="h-10 object-contain" />
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-medium">
              Revolutionizing the bridge between world-class talent and global opportunity through the power of AI. Experience the future of recruiting today.
            </p>
          </div>


          {/* Link Columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h4 className="text-gray-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-black transition-colors text-sm font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-300 text-xs font-medium">
            © {currentYear} Jobfolio Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-300 hover:text-black transition-colors">
              <span className="text-xs font-bold tracking-widest uppercase">Twitter</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-black transition-colors">
              <span className="text-xs font-bold tracking-widest uppercase">LinkedIn</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-black transition-colors">
              <span className="text-xs font-bold tracking-widest uppercase">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
