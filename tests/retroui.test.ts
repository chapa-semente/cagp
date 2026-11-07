import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";
import { cardVariants } from "@/components/ui/card";
import { statCardVariants } from "@/components/ui/stat-card";
import { stickerVariants } from "@/components/ui/sticker";
import { TriangleShape, DiamondBadge, BurstShape } from "@/components/boldkit/shapes";

describe("Neobrutalism.com (rL9Ap) & BoldKit Unified Design System Tests", () => {
  it("should merge class names correctly with cn()", () => {
    const result = cn("bg-primary text-black", "text-black", { "shadow-md": true });
    expect(result).toContain("bg-primary");
    expect(result).toContain("shadow-md");
  });

  it("should enforce Neobrutalism.com rL9Ap button tokens (3px border, 0.75rem/rounded-xl, hard shadows)", () => {
    const defaultBtn = buttonVariants({ variant: "default" });
    const secondaryBtn = buttonVariants({ variant: "secondary" });
    const accentBtn = buttonVariants({ variant: "accent" });
    const outlineBtn = buttonVariants({ variant: "outline" });

    expect(defaultBtn).toContain("border-3");
    expect(defaultBtn).toContain("border-border");
    expect(defaultBtn).toContain("rounded-xl");
    expect(defaultBtn).toContain("shadow-md");
    expect(defaultBtn).toContain("font-heading");

    expect(secondaryBtn).toContain("bg-secondary");
    expect(accentBtn).toContain("bg-accent");
    expect(outlineBtn).toContain("bg-card");
  });

  it("should generate badge variants with Tri-Layer CAGP / Semente / UFMG styling", () => {
    const defaultBadge = badgeVariants({ variant: "default" });
    const secondaryBadge = badgeVariants({ variant: "secondary" });
    const accentBadge = badgeVariants({ variant: "accent" });
    const ufmgBadge = badgeVariants({ variant: "ufmg" });

    expect(defaultBadge).toContain("border-2");
    expect(defaultBadge).toContain("bg-primary");
    expect(secondaryBadge).toContain("bg-secondary");
    expect(accentBadge).toContain("bg-accent");
    expect(ufmgBadge).toContain("bg-[#C4161C]");
  });

  it("should generate unified Card, StatCard, and Sticker variants", () => {
    const defaultCard = cardVariants({ variant: "default", interactive: true });
    const statCard = statCardVariants({ colorScheme: "secondary" });
    const sticker = stickerVariants({ variant: "primary", rotation: "slight" });

    expect(defaultCard).toContain("border-3");
    expect(defaultCard).toContain("rounded-xl");
    expect(statCard).toContain("bg-secondary");
    expect(sticker).toContain("border-3");
    expect(sticker).toContain("-rotate-2");
  });

  it("should export BoldKit SVG shapes properly", () => {
    expect(TriangleShape).toBeDefined();
    expect(DiamondBadge).toBeDefined();
    expect(BurstShape).toBeDefined();
  });
});
