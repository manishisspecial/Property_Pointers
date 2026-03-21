import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src="/logo.jpeg" alt="Property Pointers" width={180} height={45} className="h-10 w-auto rounded mb-4" />
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              India&apos;s most trusted real estate platform. Find your dream property with verified listings, virtual tours, and zero brokerage options.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Buy Property", href: "/properties?type=sale" },
                { label: "Rent Property", href: "/properties?type=rent" },
                { label: "Post Property", href: "/post-property" },
                { label: "Commercial", href: "/properties?category=commercial" },
                { label: "Plots/Land", href: "/properties?category=plot" },
                { label: "EMI Calculator", href: "/calculator" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Popular Cities</h3>
            <ul className="space-y-3">
              {["Noida", "Delhi", "Gurgaon", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"].map((city) => (
                <li key={city}>
                  <Link href={`/properties?city=${city}`} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> Properties in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm">Sector 62, Noida, Uttar Pradesh, India - 201301</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold-400 shrink-0" />
                <span className="text-sm">+91-9876543210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-400 shrink-0" />
                <span className="text-sm">info@propertypointers.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-medium text-sm mb-2">Newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-sm text-white placeholder-gray-400 border border-white/10 focus:border-gold-400 outline-none"
                />
                <button className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Property Pointers. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
