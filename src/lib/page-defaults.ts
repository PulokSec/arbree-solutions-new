import {
  DEFAULT_INTRO as TEAM_AUG_INTRO,
  DEFAULT_STATS as TEAM_AUG_STATS,
  DEFAULT_CARDS as TEAM_AUG_CARDS,
} from "@/components/sections/services/TeamAugmentationHighlight";
import {
  DEFAULT_INTRO as PROCESS_INTRO,
  DEFAULT_STEPS as PROCESS_STEPS,
} from "@/components/sections/services/OurProcessSteps";
import type { ServiceDetailData } from "@/components/sections/services/ServiceDetailSection";

/** Built-in copy for the pages edited through Admin → Page Content. The public pages fall back to
 * these when nothing is stored, and the admin editor starts from them so editors see (and can
 * change) what is live today instead of a blank form. */

const UI_UX_DESIGN: ServiceDetailData = {
  title: "UI/UX Design",
  description:
    "We help businesses design intuitive and innovative interfaces that leave a lasting impression. Whether it's a web application, mobile app, or complex dashboard, our process focuses on combining functionality with aesthetics to meet your business goals.",
  image: "/images/services/ui-ux-design.jpg",
  benefits: [
    "User-centered design approach",
    "Responsive design for all devices",
    "Prototyping and wireframing",
    "Design system development",
  ],
  gallery: [
    "/images/services/ui-ux-design-gallery-1.jpg",
    "/images/services/ui-ux-design-gallery-2.jpg",
    "/images/services/ui-ux-design-gallery-3.jpg",
    "/images/services/ui-ux-design-gallery-4.jpg",
  ],
};

const WEB_DEVELOPMENT: ServiceDetailData = {
  title: "Web Development",
  description:
    "We understand the challenges of creating scalable, user-friendly web platforms that solve real-world problems. At Arbree Solutions, we specialize in crafting web applications that not only look stunning but also simplify complex workflows for your users.",
  image: "/images/services/web-development.jpg",
  benefits: [
    "Custom web applications",
    "E-commerce solutions",
    "CMS development",
    "API integration",
  ],
  gallery: [
    "/images/services/web-development-gallery-1.jpg",
    "/images/services/web-development-gallery-2.jpg",
    "/images/services/web-development-gallery-3.jpg",
    "/images/services/web-development-gallery-4.jpg",
  ],
};

const MOBILE_APP_DEVELOPMENT: ServiceDetailData = {
  title: "Mobile App Development",
  description:
    "We help businesses design intuitive and innovative mobile applications that leave a mark. Whether it's an iOS app, Android application, or cross-platform solution, our process focuses on combining functionality with aesthetics to meet your business goals.",
  image: "/images/services/mobile-app-development.jpg",
  benefits: [
    "iOS & Android development",
    "Cross-platform solutions",
    "App store optimization",
    "Mobile UI/UX design",
  ],
  gallery: [
    "/images/services/mobile-app-development-gallery-1.jpg",
    "/images/services/mobile-app-development-gallery-2.jpg",
    "/images/services/mobile-app-development-gallery-3.jpg",
    "/images/services/mobile-app-development-gallery-4.jpg",
  ],
};

const DIGITAL_CONSULTANCY: ServiceDetailData = {
  title: "Digital Consultancy",
  description:
    "Your digital transformation is more than a technology upgrade; it's the evolution of your business. At Arbree Solutions, we specialize in providing strategic guidance that combines innovative thinking with practical implementation.",
  image: "/images/services/digital-consultancy.jpg",
  benefits: [
    "Digital strategy planning",
    "Technology assessment",
    "Business process optimization",
    "Implementation roadmaps",
  ],
};

export const DEFAULT_SERVICE_DETAILS: ServiceDetailData[] = [
  UI_UX_DESIGN,
  WEB_DEVELOPMENT,
  MOBILE_APP_DEVELOPMENT,
  DIGITAL_CONSULTANCY,
];


const CTA_DEFAULT = {
  title: "Spread the Word, Share the Wealth",
  description:
    "Join our trusted network of partners and earn competitive commissions. Enter your email below to receive your personalized partner tracking link.",
};

export const DEFAULT_HOME = {
  hero: {
    badge: "Technology Solutions That Drive Growth",
    titleLine1: "Scale Your Tech Team",
    titleHighlight: "Dedicated Experts",
    subtitle:
      "<p>We provide Software Development, Resource Augmentation, QA, DevOps and Mobile Solutions that seamlessly integrate with your business and accelerate product delivery.</p>",
    primaryLabel: "Tech Solution",
    primaryHref: "/services#tech-solution",
    secondaryLabel: "Team Augmentation",
    secondaryHref: "/services#team-augmentation",
  },
  intro: {
    eyebrow: "We are",
    name: "Arbree Solutions",
    tagline: "Everyone loves simplicity, so do we.",
    body:
      "<p>We are a <strong>young, dynamic team</strong> coming from a wide variety of backgrounds. We use our digital knowledge to help you achieve your business goals and grow your business.</p><p>Whether you are looking to create a product from scratch or get your branding done, <strong>Arbree Solutions will find a way to help you!</strong></p>",
  },
  services: {
    eyebrow: "Two Ways We Help You Build & Scale",
    intro:
      "<p>Whether you need a complete software solution built from scratch or skilled professionals to extend your team, we've got you covered.</p>",
  },
  ourWork: {
    intro:
      "<p>Great solutions begin with great partnerships. Discover how our collaborative approach has helped businesses overcome challenges and achieve breakthrough results</p>",
  },
  testimonial: { heading: "Testimonial" },
  cta: CTA_DEFAULT,
};

export const DEFAULT_ABOUT = {
  hero: {
    title: "",
    subtitle:
      "<p>At Arbree Solutions, we blend innovation, design, and technology to craft digital products that matter. From strategy to execution, our team is driven by passion and precision committed to turning complex problems into impactful solutions that scale.</p>",
    image: "",
  },
  story: {
    paragraphs: [
      "<p>We are a young, dynamic team coming from a wide variety of backgrounds. Specialising in web development, software development, testing and design and providing you with a whole host of other services.</p>",
      "<p>We use our digital knowledge to help you achieve your business goals and grow your business. Whether you are looking to create a product from scratch or get your branding done, Arbree Solutions will find a way to help you!</p>",
    ],
    stats: [
      { value: "50+", label: "Projects Completed" },
      { value: "25+", label: "Happy Clients" },
      { value: "6+", label: "Years Experience" },
    ],
    image: "",
  },
  mission: {
    intro:
      "Empowering businesses to thrive in the digital age through innovative solutions and strategic excellence",
    rows: [
      {
        title: "Unmatched Service",
        description:
          "Support businesses and entrepreneurs with their growth strategy and digital transformation. Our core expertise lies in the ability to support our clients in understanding, analyzing, and executing digital strategies in specific markets.",
      },
      {
        title: "Experience",
        description:
          "Experience in working with and assisting a wide range of clients from international corporations to small/medium-sized businesses, from large enterprises to innovative startups seeking digital solutions.",
      },
      {
        title: "Technology",
        description:
          "The best combination of cutting-edge technology and skilled people to deliver exceptional digital solutions.",
      },
    ],
  },
  keyFeatures: {
    intro: "Enterprise-grade features designed for scale, security, and reliability",
    items: [
      { title: "Security", description: "Enterprise-grade encryption", iconKey: "shield-check" },
      { title: "Analytics", description: "Real-time insights", iconKey: "bar-chart-3" },
      { title: "Global", description: "Multi-region deployment", iconKey: "globe" },
      { title: "24/7 Support", description: "Dedicated team", iconKey: "headset" },
      { title: "Scalability", description: "250K+ daily transactions", iconKey: "users" },
      { title: "Growth", description: "Built for expansion", iconKey: "trending-up" },
    ],
  },
  commitment: {
    intro:
      "Building lasting partnerships through trust, quality, and unwavering dedication to your success",
    items: [
      {
        title: "Ethics",
        description:
          "Ethics for Arbree Solutions means ensuring our customers the confidentiality and uniqueness of the service they are provided. A client must be reassured that the service provided to them is made-to-measure and will not be recycled for their competitors.",
        iconKey: "shield-check",
      },
      {
        title: "Quality",
        description:
          "Arbree Solutions is committed to ensuring that our advice and recommendations are based on the best combination of methods, information research, creativity and internal quality assurance.",
        iconKey: "award",
      },
      {
        title: "Continuity",
        description:
          "Arbree Solutions considers that the continuity of relations on the long term with its clients is the guarantee of the satisfaction of these and the quality of the services provided.",
        iconKey: "heart-handshake",
      },
    ],
  },
  cta: CTA_DEFAULT,
};

export const DEFAULT_SERVICES = {
  hero: {
    title: "Turning Ideas Into Powerful Digital Solutions",
    subtitle:
      "<p>From custom software and AI solutions to scalable web and mobile applications, we build technology that helps businesses innovate, grow, and stay ahead of the competition.</p>",
  },
  serviceDetails: DEFAULT_SERVICE_DETAILS.map((d) => ({
    ...d,
    description: `<p>${d.description}</p>`,
  })),
  teamAugmentation: { intro: TEAM_AUG_INTRO, stats: TEAM_AUG_STATS, cards: TEAM_AUG_CARDS },
  process: { intro: PROCESS_INTRO, steps: PROCESS_STEPS },
  cta: CTA_DEFAULT,
};
