"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle,
  Eye,
  Globe,
  HeartHandshake,
  Home,
  Key,
  Layers,
  Lightbulb,
  MapPin,
  Monitor,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";

const fadeStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const STATS = [
  { k: "1000+", l: "Growing community", i: Users },
  { k: "7+", l: "Cities & expanding", i: MapPin },
  { k: "QC", l: "Quality-check focused", i: ShieldCheck },
  { k: "5-in-1", l: "Ecosystem model", i: Layers },
];

const BUILDING_ITEMS = [
  {
    icon: Search,
    title: "Property Discovery",
    desc: "Find residential, commercial, rental, PG/co-living, land, shops, offices and investment opportunities.",
  },
  {
    icon: Eye,
    title: "Developer Visibility",
    desc: "Explore developer profiles, project pages, RERA details where available, location highlights and project enquiries.",
  },
  {
    icon: Users,
    title: "Realty Advisor Network",
    desc: "Connect with real estate professionals based on city, locality and specialisation.",
  },
  {
    icon: Store,
    title: "Vendor Marketplace",
    desc: "Discover service providers such as interior designers, architects, property lawyers, construction contractors, marketing agencies and other real estate vendors.",
  },
  {
    icon: BarChart3,
    title: "Market Insights & Tools",
    desc: "Use property guides, calculators, market reports and checklists to make better decisions.",
  },
];

const PILLARS = [
  {
    icon: Home,
    title: "Properties",
    desc: "A smarter way to discover residential, commercial, rental and investment property opportunities.",
  },
  {
    icon: Building2,
    title: "Developers",
    desc: "A structured space for builders and developers to showcase projects, build trust and generate buyer enquiries.",
  },
  {
    icon: Briefcase,
    title: "Realty Advisors",
    desc: "A professional network for brokers, agents and consultants to build their identity as trusted real estate advisors.",
  },
  {
    icon: Store,
    title: "Vendors",
    desc: "A marketplace for real estate service providers including interiors, legal, architecture, construction, branding and marketing.",
  },
  {
    icon: BarChart3,
    title: "Insights",
    desc: "City-wise and locality-wise guides, investment updates, RERA information and real estate education.",
  },
  {
    icon: Monitor,
    title: "Tools",
    desc: "Calculators and checklists to support financial, legal and practical property decisions.",
  },
];

const SERVE_ITEMS = [
  {
    icon: Home,
    title: "Buyers & Investors",
    desc: "Discover properties, compare options, understand locations and connect with the right professionals.",
  },
  {
    icon: Key,
    title: "Property Owners",
    desc: "List properties and reach relevant buyers or tenants through a structured discovery platform.",
  },
  {
    icon: Building2,
    title: "Developers & Builders",
    desc: "Showcase projects, build digital visibility and receive structured buyer enquiries.",
  },
  {
    icon: Briefcase,
    title: "Realty Advisors",
    desc: "Create a professional profile, showcase expertise, list properties and build trust with potential clients.",
  },
  {
    icon: Store,
    title: "Vendors",
    desc: "List real estate services and get discovered by buyers, developers, advisors and property owners.",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust by Design",
    desc: "We believe trust should be built into every part of the platform — from listing details and profile structures to clear disclaimers and buyer due diligence guidance.",
    featured: true,
  },
  {
    icon: Lightbulb,
    title: "Clarity First",
    desc: "Real estate decisions involve money, time and risk. We focus on clear information, useful filters, simple comparisons and honest communication.",
  },
  {
    icon: Globe,
    title: "Ecosystem Thinking",
    desc: "Buyers, sellers, developers, advisors and vendors are all part of the same property journey. PropertyPointers is designed to connect them in one structured environment.",
  },
  {
    icon: Monitor,
    title: "Technology with Purpose",
    desc: "We use tools, dashboards, calculators and insights to make property decisions easier, not more complicated.",
  },
  {
    icon: HeartHandshake,
    title: "People at the Centre",
    desc: "Behind every property search is a real need — a home, an investment, a business location or a professional opportunity. Our platform is built around those needs.",
    accent: true,
  },
];

const JOURNEY = [
  {
    label: "Foundation",
    text: "We started with a simple idea: property discovery should be clearer, more structured and easier to trust.",
  },
  {
    label: "Ecosystem Expansion",
    text: "PropertyPointers expanded beyond listings by adding developer visibility, realty advisor networks, vendor categories and partner-led discovery.",
  },
  {
    label: "Tools & Insights",
    text: "We are building calculators, guides, market insights and reports to help users make better property decisions.",
  },
  {
    label: "Partner Network",
    text: "Our growing ecosystem supports developers, advisors, brokers, vendors and service providers who want stronger digital visibility.",
  },
  {
    label: "The Road Ahead",
    text: "Our vision is to build one of India\u2019s most useful real estate ecosystems — connecting properties, people, professionals, services and data in one place.",
  },
];

const PARTNER_BENEFITS = [
  {
    icon: Building2,
    title: "For Developers",
    benefits: [
      "Professional developer profile",
      "Project microsites",
      "RERA details where available",
      "Buyer enquiry forms",
      "City visibility",
      "Market report opportunities",
    ],
    href: "/list-project",
    cta: "List Your Project",
  },
  {
    icon: Briefcase,
    title: "For Realty Advisors",
    benefits: [
      "Professional digital identity",
      "Locality expert positioning",
      "Active listing visibility",
      "Buyer enquiries",
      "Reviews and category-based discovery",
    ],
    href: "/join-advisor",
    cta: "Join as Advisor",
  },
  {
    icon: Store,
    title: "For Vendors",
    benefits: [
      "Service profile",
      "Portfolio showcase",
      "City/category visibility",
      "Lead enquiry form",
      "Real estate audience reach",
      "Early partner advantage",
    ],
    href: "/list-service",
    cta: "List Your Service",
  },
];

const CTA_BUTTONS = [
  { label: "Explore Properties", href: "/properties" },
  { label: "List Your Project", href: "/list-project" },
  { label: "Join as Realty Advisor", href: "/join-advisor" },
  { label: "List Your Service", href: "/list-service" },
  { label: "View Open Roles", href: "/careers" },
];

export default function AboutClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ── 1. Hero ── */}
      <section className="relative min-h-[78vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <motion.div
          className="absolute -top-32 -right-24 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full bg-gold-500/20 blur-[100px]"
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-32 w-[min(100vw,600px)] h-[min(100vw,600px)] rounded-full bg-blue-500/10 blur-[110px]"
          animate={reduceMotion ? undefined : { scale: [1.05, 1, 1.05] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0H0z' fill='%23fff'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-32">
          <motion.div variants={fadeStagger} initial="hidden" animate="show" className="max-w-4xl">
            <motion.div
              variants={fadeItem}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <Globe size={16} className="text-gold-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300/90">
                India&apos;s Complete Property Ecosystem
              </span>
            </motion.div>

            <motion.h1
              variants={fadeItem}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08]"
            >
              Real Estate,{" "}
              <span className="text-gradient bg-[length:120%_auto]">Reimagined</span>
              <br />
              for India&apos;s Complete Property Ecosystem
            </motion.h1>

            <motion.p
              variants={fadeItem}
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              PropertyPointers is building a connected real estate ecosystem where buyers, sellers,
              developers, realty advisors and service vendors can discover opportunities, build trust
              and make smarter property decisions.
            </motion.p>

            <motion.p
              variants={fadeItem}
              className="mt-4 text-base text-gray-400 max-w-2xl leading-relaxed"
            >
              From property discovery and developer profiles to advisor networks, vendor services,
              market insights and smart tools — PropertyPointers brings the real estate journey
              together on one platform.
            </motion.p>

            <motion.div variants={fadeItem} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-400 hover:shadow-xl active:scale-[0.98]"
              >
                Explore Properties <ArrowRight size={18} />
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Join Our Ecosystem
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {STATS.map((row) => {
              const Icon = row.i;
              return (
                <div
                  key={row.l}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:border-gold-500/30 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-2xl sm:text-3xl font-bold text-white">{row.k}</p>
                    <span className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="text-gold-400" size={20} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{row.l}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ── 2. Our Story ── */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">Our Story</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Bringing India&apos;s scattered real estate{" "}
              <span className="text-gradient">ecosystem together</span>
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed text-lg">
              India&apos;s real estate market is full of opportunity, but the journey is often
              fragmented. Buyers search on one platform, developers promote on another, brokers work
              through personal networks, and vendors struggle to reach the right property audience.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed text-lg">
              PropertyPointers was created to bring this scattered ecosystem together.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We are building a platform where users can discover properties, compare developers,
              connect with realty advisors, explore real estate vendors, read market insights and use
              smart tools before making important property decisions.
            </p>
            <p className="mt-4 font-semibold text-navy-900">
              Our goal is simple: make real estate discovery more transparent, connected and useful
              for everyone involved in the property journey.
            </p>
          </div>

          <div className="relative">
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-navy-900/5"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-gold-400/30 to-navy-700/20 blur-2xl" />
              <Globe className="text-navy-700" size={36} />
              <h3 className="mt-4 text-xl font-bold text-navy-900">The PropertyPointers Ecosystem</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Connecting every participant in the real estate journey on one platform.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: Home, label: "Buyers" },
                  { icon: Building2, label: "Developers" },
                  { icon: Briefcase, label: "Realty Advisors" },
                  { icon: Store, label: "Vendors" },
                  { icon: BarChart3, label: "Insights" },
                  { icon: Monitor, label: "Tools" },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="flex items-center gap-2 rounded-xl bg-navy-50 border border-navy-100 px-3 py-2.5"
                  >
                    <node.icon size={16} className="text-navy-600 shrink-0" />
                    <span className="text-sm font-medium text-navy-700">{node.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* ── 3. Our Mission ── */}
      <MotionSection className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">Mission</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
                Make Property Decisions{" "}
                <span className="text-gradient">Clearer, Smarter and More Connected</span>
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed text-lg">
                PropertyPointers exists to simplify the way India discovers, compares and connects in
                real estate. We aim to help users move from confusion to clarity by bringing together
                property listings, developer information, realty advisor support, vendor services,
                market insights and decision-making tools in one place.
              </p>
            </div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-navy-900/5"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-gold-400/30 to-navy-700/20 blur-2xl" />
              <Building2 className="text-navy-700" size={36} />
              <h3 className="mt-4 text-xl font-bold text-navy-900">Built for the full journey</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                From search to shortlisting, developer comparison, advisor consultation, site visit,
                documentation and vendor discovery, PropertyPointers is designed to support the full
                real estate journey.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Search", "Compare", "Consult", "Visit", "Verify", "Close", "Services"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-navy-50 border border-navy-100 px-3 py-1 text-xs font-medium text-navy-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* ── 4. What PropertyPointers Is Building ── */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">
            What we&apos;re building
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            More than a listing website
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            PropertyPointers is a real estate ecosystem platform designed to support the full
            property journey.
          </p>
        </div>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUILDING_ITEMS.map((item) => (
            <MotionCard
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="rounded-xl bg-navy-50 border border-navy-100 p-3 w-fit">
                <item.icon size={24} className="text-navy-700" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </MotionCard>
          ))}
        </MotionGrid>
      </MotionSection>

      {/* ── 5. Our Ecosystem Pillars ── */}
      <MotionSection className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">
              Ecosystem Pillars
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
              Six pillars of the PropertyPointers ecosystem
            </h2>
          </div>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((pillar) => (
              <MotionCard
                key={pillar.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm hover:shadow-md hover:border-gold-200 transition-all"
              >
                <div className="rounded-xl bg-white border border-gray-200 p-3 w-fit shadow-sm">
                  <pillar.icon size={24} className="text-gold-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{pillar.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
              </MotionCard>
            ))}
          </MotionGrid>
        </div>
      </MotionSection>

      {/* ── 6. Who We Serve ── */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">
            Who We Serve
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            Built for every participant in the property journey
          </h2>
        </div>
        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVE_ITEMS.map((item) => (
            <MotionCard
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="rounded-full bg-gold-50 border border-gold-200 p-3 w-fit">
                <item.icon size={22} className="text-gold-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy-900">For {item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </MotionCard>
          ))}
        </MotionGrid>
      </MotionSection>

      {/* ── 7. Trust & Transparency ── */}
      <MotionSection className="border-y border-gray-200 bg-gradient-to-b from-white to-navy-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="mx-auto w-fit rounded-2xl bg-navy-900 p-4 mb-6">
            <ShieldCheck size={32} className="text-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Trust & Transparency</h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            PropertyPointers is designed to make property discovery more transparent, but every real
            estate decision requires proper verification.
          </p>
          <div className="mt-8 rounded-2xl border border-gold-200/80 bg-gold-50/50 p-6 sm:p-8 text-left">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle size={22} className="text-gold-600 mt-0.5 shrink-0" />
              <p className="text-gray-700 leading-relaxed">
                We encourage users to review property details carefully, check RERA details directly
                on the official portal, conduct a physical site visit, verify ownership and
                approvals, and consult qualified legal and financial professionals before any
                transaction.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={22} className="text-gold-600 mt-0.5 shrink-0" />
              <p className="text-gray-700 leading-relaxed">
                PropertyPointers helps users discover and compare real estate opportunities. Final
                verification and transaction decisions should always be made after independent due
                diligence.
              </p>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ── 8. Our Values ── */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">
            What guides us
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            Values you can feel in the product
          </h2>
        </div>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[minmax(160px,auto)]">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            if (value.featured) {
              return (
                <MotionCard
                  key={value.title}
                  className="md:row-span-2 rounded-3xl border border-gray-100 bg-gradient-to-b from-navy-900 to-navy-950 p-8 text-white shadow-xl"
                >
                  <Icon className="text-gold-400" size={32} />
                  <h3 className="mt-4 text-2xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-gray-300 leading-relaxed">{value.desc}</p>
                </MotionCard>
              );
            }
            if (value.accent) {
              return (
                <MotionCard
                  key={value.title}
                  className="md:col-span-2 rounded-3xl border border-gold-200/80 bg-gradient-to-r from-gold-50 to-white p-6 sm:p-8 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex-1">
                      <Icon className="text-gold-600" size={32} />
                      <h3 className="mt-3 text-xl font-bold text-navy-900">{value.title}</h3>
                      <p className="mt-2 text-gray-700 leading-relaxed">{value.desc}</p>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-navy-900 px-6 py-5 text-center text-white">
                      <p className="text-3xl font-extrabold text-gold-400">&infin;</p>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                        curiosity
                      </p>
                    </div>
                  </div>
                </MotionCard>
              );
            }
            return (
              <MotionCard
                key={value.title}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <Icon className={index === 1 ? "text-amber-500" : index === 2 ? "text-purple-500" : "text-blue-500"} size={28} />
                <h3 className="mt-3 text-lg font-bold text-navy-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{value.desc}</p>
              </MotionCard>
            );
          })}
        </MotionGrid>
      </MotionSection>

      {/* ── 9. Our Journey ── */}
      <MotionSection className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">
              Our Journey
            </p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900">Milestones along the way</h2>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 via-navy-300 to-navy-100" />
              <div className="grid grid-cols-5 gap-6">
                {JOURNEY.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pt-10"
                  >
                    <span className="absolute top-[0.6rem] left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-gold-500 shadow ring-2 ring-gold-200" />
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-shadow h-full">
                      <p className="text-sm font-bold text-gold-600">{m.label}</p>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / Tablet: vertical timeline */}
          <div className="lg:hidden relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-navy-300 to-navy-100" />
            <div className="space-y-10">
              {JOURNEY.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="absolute -left-[1.85rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-gold-500 shadow ring-2 ring-gold-200" />
                  <p className="text-sm font-bold text-gold-600">{m.label}</p>
                  <p className="mt-2 text-gray-600 leading-relaxed">{m.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ── 10. Why Partners Join ── */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">
            Partner with us
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            Why partners join PropertyPointers
          </h2>
        </div>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PARTNER_BENEFITS.map((partner) => (
            <MotionCard
              key={partner.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="rounded-xl bg-navy-50 border border-navy-100 p-3 w-fit">
                <partner.icon size={24} className="text-navy-700" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy-900">{partner.title}</h3>
              <ul className="mt-3 space-y-2 flex-1">
                {partner.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-gray-600">
                    <Sparkles size={14} className="text-gold-500 mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={partner.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
              >
                {partner.cta} <ArrowRight size={16} />
              </Link>
            </MotionCard>
          ))}
        </MotionGrid>
      </MotionSection>

      {/* ── 11. Final CTA ── */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 px-8 py-14 sm:px-14 sm:py-16 text-center"
          whileHover={reduceMotion ? undefined : { scale: 1.005 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/30 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 blur-[90px] rounded-full" />
          </div>
          <Layers className="relative mx-auto text-gold-400" size={40} />
          <h2 className="relative mt-4 text-2xl sm:text-3xl font-extrabold text-white">
            Help Us Build India&apos;s Real Estate Ecosystem
          </h2>
          <p className="relative mt-3 text-gray-300 max-w-xl mx-auto">
            Whether you are a buyer, developer, realty advisor, vendor, property owner or market
            expert, PropertyPointers is building a platform where every real estate participant can
            discover, connect and grow.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            {CTA_BUTTONS.map((btn, i) => (
              <Link
                key={btn.label}
                href={btn.href}
                className={
                  i === 0
                    ? "inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg transition-all hover:bg-gold-400"
                    : "inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                }
              >
                {btn.label}
                {i === 0 && <ArrowRight size={18} />}
              </Link>
            ))}
          </div>
        </motion.div>
      </MotionSection>
    </main>
  );
}
