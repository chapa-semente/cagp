import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("PWA Manifest, Favicon & Chapa Semente Brand Assets", () => {
  const rootDir = process.cwd();
  const manifestPath = path.join(rootDir, "public/manifest.webmanifest");
  const baseLayoutPath = path.join(rootDir, "src/layouts/BaseLayout.astro");

  it("should have a valid public/manifest.webmanifest with Semente naming and colors", () => {
    expect(fs.existsSync(manifestPath)).toBe(true);
    const content = fs.readFileSync(manifestPath, "utf8");
    const manifest = JSON.parse(content);

    expect(manifest.short_name).toBe("Semente");
    expect(manifest.name).toContain("Semente");
    expect(manifest.theme_color).toBe("#5B2A86");
    expect(manifest.background_color).toBe("#FFFFFF");
  });

  it("should verify all icons declared in manifest.webmanifest exist on disk", () => {
    const content = fs.readFileSync(manifestPath, "utf8");
    const manifest = JSON.parse(content);

    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(4);

    for (const icon of manifest.icons) {
      // Resolve path relative to public/
      const cleanSrc = icon.src.replace(/^\.\//, "");
      const fullPath = path.join(rootDir, "public", cleanSrc);
      expect(fs.existsSync(fullPath), `Icon file missing: ${cleanSrc}`).toBe(true);
    }
  });

  it("should verify white background vector assets and favicons exist", () => {
    const symbolWhiteBg = path.join(rootDir, "public/logos/semente/simbolo_semente_fundo_branco.svg");
    const faviconSvg = path.join(rootDir, "public/favicon.svg");
    const faviconIco = path.join(rootDir, "public/favicon.ico");
    const appleTouchIcon = path.join(rootDir, "public/imagens/pwa/apple-touch-icon.png");

    expect(fs.existsSync(symbolWhiteBg)).toBe(true);
    expect(fs.existsSync(faviconSvg)).toBe(true);
    expect(fs.existsSync(faviconIco)).toBe(true);
    expect(fs.existsSync(appleTouchIcon)).toBe(true);

    const svgContent = fs.readFileSync(symbolWhiteBg, "utf8");
    expect(svgContent).toContain('fill="#FFFFFF"');
    expect(svgContent).toContain("simbolo-semente");
  });

  it("should verify BaseLayout.astro includes Semente mobile titles and favicon links", () => {
    const layout = fs.readFileSync(baseLayoutPath, "utf8");

    expect(layout).toContain('rel="icon" type="image/svg+xml"');
    expect(layout).toContain("simbolo_semente_fundo_branco.svg");
    expect(layout).toContain('rel="alternate icon"');
    expect(layout).toContain("favicon.ico");
    expect(layout).toContain('rel="apple-touch-icon"');
    expect(layout).toContain('name="apple-mobile-web-app-title" content="Semente"');
    expect(layout).toContain('name="application-name" content="Semente"');
  });
});
