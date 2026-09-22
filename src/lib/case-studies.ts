import {
  BarChart3,
  Workflow,
  ShieldCheck,
  Smartphone,
  Plug,
  Boxes,
  Code2,
  Zap,
  Lock,
  TrendingUp,
} from "lucide-react";
import type { CaseStudyMeta, } from "@/components/sections/portfolio-details/CaseStudyHero";
import type { CaseStudyStat } from "@/components/sections/portfolio-details/CaseStudyOverview";
import type { IconFeatureItem } from "@/components/sections/shared/IconFeatureGrid";
import type { TechHighlight } from "@/components/sections/portfolio-details/TechStackHighlights";
import type { CaseStudyProcessStep } from "@/components/sections/portfolio-details/CaseStudySolutionProcess";

export type CaseStudyData = {
  slug: string;
  title: string;
  subtitle: string;
  meta: CaseStudyMeta;
  tags: string[];
  heroImage: string;
  overview: string;
  stats: CaseStudyStat[];
  keyFeatures: IconFeatureItem[];
  techStackIntro: string;
  techHighlights: TechHighlight[];
  solutionSummary: string;
  process: CaseStudyProcessStep[];
};

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  "enterprise-crm-system": {
    slug: "enterprise-crm-system",
    title: "Enterprise CRM System",
    subtitle:
      "A comprehensive customer relationship management solution designed for large enterprises with advanced analytics and automation capabilities.",
    meta: { client: "TechCorp Industries", duration: "8 Months", teamSize: "12 Person" },
    tags: ["Python", "Django", "PostgreSQL", "React", "Docker"],
    heroImage: "https://www.figma.com/api/mcp/asset/b8d1ecb7-c7d6-4ae6-9790-f18831977dcf.png",
    overview:
      "The Enterprise CRM System is a cutting-edge customer relationship management solution designed specifically for large-scale enterprises. This comprehensive platform integrates seamlessly with existing business processes while providing powerful analytics and automation capabilities.\n\nOur team developed a scalable, secure, and user-friendly system that handles millions of customer interactions daily. The solution includes advanced features such as predictive analytics, automated workflow management, and real-time reporting dashboards.\n\nThe project was completed using modern technologies and best practices, ensuring optimal performance, security, and maintainability. The system has successfully improved customer satisfaction by 35% and increased sales efficiency by 42%.",
    stats: [
      { label: "Users Supported", value: "50,000+" },
      { label: "Daily Transactions", value: "2.5M" },
      { label: "Response Time", value: "< 200ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    keyFeatures: [
      {
        title: "Advanced Analytics",
        description:
          "Real-time data visualization and predictive analytics to help businesses make informed decisions and forecast trends.",
        icon: BarChart3,
      },
      {
        title: "Workflow Automation",
        description:
          "Automated task management and workflow optimization to streamline business processes and increase productivity.",
        icon: Workflow,
      },
      {
        title: "Enterprise Security",
        description:
          "Multi-layer security architecture with encryption, access control, and audit trails to protect sensitive data.",
        icon: ShieldCheck,
      },
      {
        title: "Mobile Access",
        description:
          "Responsive design with dedicated mobile apps for iOS and Android, enabling access from anywhere.",
        icon: Smartphone,
      },
      {
        title: "API Integration",
        description:
          "RESTful APIs and webhooks for seamless integration with third-party systems and existing infrastructure.",
        icon: Plug,
      },
      {
        title: "Scalable Architecture",
        description:
          "Cloud-native design with microservices architecture supporting horizontal scaling and high availability.",
        icon: Boxes,
      },
    ],
    techStackIntro:
      "We build enterprise applications using a carefully selected technology stack that ensures performance, security, and long-term scalability. From modern frontend frameworks to cloud-native infrastructure, every technology is chosen to deliver reliable, maintainable, and future-ready digital solutions.",
    techHighlights: [
      {
        title: "Clean Architecture",
        description: "Modular, maintainable code structure",
        icon: Code2,
      },
      {
        title: "High Performance",
        description: "Optimized for speed and efficiency",
        icon: Zap,
      },
      {
        title: "Enterprise Security",
        description: "Bank-level security protocols",
        icon: Lock,
      },
      {
        title: "Scalable Design",
        description: "Built to grow with your business",
        icon: TrendingUp,
      },
    ],
    solutionSummary:
      "We developed a scalable Enterprise CRM platform that centralizes customer data, automates daily business operations, and provides real-time insights through an intuitive dashboard. Designed with a modular architecture, the solution streamlines sales, customer support, and workflow management while enabling organizations to scale efficiently as their business grows.",
    process: [
      {
        title: "Centralized Customer Management",
        description:
          "We created a unified customer database where sales, support, and management teams can access customer profiles, communication history, deals, and activities from a single platform. This eliminates data silos and improves collaboration across departments.",
      },
      {
        title: "Sales Pipeline & Workflow Automation",
        description:
          "The CRM automates lead management, follow-ups, task assignments, approval workflows, and sales pipelines. Teams spend less time on repetitive administrative work and more time building customer relationships and closing opportunities.",
      },
      {
        title: "Real-Time Analytics & Reporting",
        description:
          "Interactive dashboards provide live business insights, including sales performance, customer engagement, revenue trends, and team productivity. Custom reports help decision-makers monitor KPIs and make data-driven business decisions quickly.",
      },
      {
        title: "Secure, Scalable & Integrated Platform",
        description:
          "Built with React, Django, PostgreSQL, and Docker, the platform supports enterprise-grade security, role-based access control, API integration, and cloud deployment. Its scalable architecture ensures reliable performance as the organization expands.",
      },
    ],
  },
};
