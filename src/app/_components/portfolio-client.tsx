"use client";

import { UnifiedInterface } from "@/app/_components/unified-interface";

export function PortfolioClient() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Add a subtle highlight effect
      element.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.5)";
      setTimeout(() => {
        if (element.style) {
          element.style.boxShadow = "";
        }
      }, 2000);
    }
  };

  return <UnifiedInterface onNavigateToSection={scrollToSection} />;
}
