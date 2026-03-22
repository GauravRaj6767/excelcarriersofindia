import {
  Truck,
  Warehouse,
  BarChart3,
  Globe,
  Zap,
  ShieldCheck,
  Heart,
  Clock,
  IndianRupee,
  Radar,
  type LucideIcon,
} from "lucide-react";

export const COMPANY = {
  name: "Excel Carriers of India",
  shortName: "ECI",
  slogan: "Your Smile - Our Satisfaction",
  founded: 2007,
  proprietor: "Manoj Kumar Singh",
  address:
    "Excel Carriers of India, FLAT NO. 3E 3rd floor, Somu residency, above HDFC BANK, Petbasheerabad, Jeedimetla, Hyderabad, Telangana 500067",
  phone: "+9140-35606840",
  email: "excelcarriersofindia@gmail.com",
} as const;

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: Truck,
    title: "Pan-India Transportation",
    description:
      "Comprehensive freight solutions spanning every state and union territory. Our fleet ensures your cargo reaches any corner of India safely and on schedule.",
    color: "#6C63FF",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Storage",
    description:
      "State-of-the-art storage facilities with climate control, inventory management, and 24/7 security to protect your valuable goods.",
    color: "#FF6B35",
  },
  {
    icon: BarChart3,
    title: "Supply Chain Management",
    description:
      "End-to-end supply chain optimization. From procurement to last-mile delivery, we streamline every link in your logistics chain.",
    color: "#00D4AA",
  },
  {
    icon: Globe,
    title: "Cross-Border Services",
    description:
      "Seamless logistics across Nepal, Bhutan, and Bangladesh. Navigating customs, regulations, and documentation so you don't have to.",
    color: "#F5C842",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    description:
      "Time-critical shipments handled with urgency. Our express network guarantees rapid transit for your most urgent consignments.",
    color: "#6C63FF",
  },
  {
    icon: Radar,
    title: "Advanced Tracking",
    description:
      "Real-time GPS tracking and status updates. Know exactly where your shipment is at every moment, from pickup to delivery.",
    color: "#FF6B35",
  },
];

export interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_US: WhyUsItem[] = [
  {
    icon: ShieldCheck,
    title: "Tailored Solutions",
    description:
      "Every business is unique. We design custom logistics plans that fit your specific operational needs and scale with your growth.",
  },
  {
    icon: Heart,
    title: "Customer-Centric",
    description:
      "Your satisfaction drives everything we do. Our dedicated support team is available around the clock to address your concerns.",
  },
  {
    icon: Clock,
    title: "On-Time Deliveries",
    description:
      "We understand that time is money. Our track record of punctual deliveries ensures your supply chain never skips a beat.",
  },
  {
    icon: IndianRupee,
    title: "Cost-Effective",
    description:
      "Premium logistics services at competitive rates. We optimize routes and consolidate shipments to keep your costs down.",
  },
  {
    icon: Radar,
    title: "Advanced Tracking",
    description:
      "Full visibility into your shipments with our cutting-edge GPS tracking system and real-time status notifications.",
  },
];

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: StatItem[] = [
  { value: new Date().getFullYear() - 2007, suffix: "+", label: "Years of Excellence" },
  { value: 30, suffix: "+", label: "Major Clients" },
  { value: 28, suffix: "", label: "States Covered" },
  { value: 99, suffix: "%", label: "On-Time Rate" },
];

export const CLIENTS: string[] = [
  "Jaiprakash Associates Ltd",
  "ACC Cement",
  "JMC Construction",
  "Nawa Engineer & Consultant",
  "Pragati Pack",
  "Jeevan Polymers",
  "SKM Technologies",
  "Coastal Security Guard",
  "Goa Shipping Yard",
  "Esmario Export Enterprises",
  "BeamGlobal Spirits & Wine",
  "KMV Projects",
  "Apex Equipments",
  "Shrem Sewa Foundation",
  "Bayard Agro Sciences",
  "P.L.Raju Constructions",
  "SG Equipments Machinery",
  "Meva Formwork Systems",
  "Lotus Industries",
  "SRK Technology",
  "Padmaja Polypacks",
  "Diageo Spirits",
  "Bihar Caustic & Chemicals",
  "RVR Projects",
  "Shiv Shakti Timbers",
  "Hindustan Apparel Export",
  "Kumar Equipment India",
  "Serveall Land Developers",
];

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
] as const;
