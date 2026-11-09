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
    expect(manifest.theme_color).toBe("#5B2A85");
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

  it("should verify official Semente assets, PWA icons and favicons exist", () => {
    const officialAssets = [
      "semente-horizontal", "semente-horizontal-preto", "semente-horizontal-branco",
      "semente-horizontal-badge-laranja", "semente-horizontal-badge-petroleo",
      "semente-vertical", "semente-vertical-badge", "semente-vertical-branco", "semente-vertical-preto",
      "semente-simbolo", "semente-simbolo-preto", "semente-simbolo-branco",
    ];
    for (const name of officialAssets) {
      const file = path.join(rootDir, `public/logos/semente/${name}.webp`);
      expect(fs.existsSync(file), `Official asset missing: ${name}.webp`).toBe(true);
    }

    for (const file of [
      "public/favicon.ico",
      "public/favicon-96x96.png",
      "public/imagens/pwa/apple-touch-icon.png",
      "public/imagens/pwa/badge-96x96.png",
    ]) {
      expect(fs.existsSync(path.join(rootDir, file)), `Missing: ${file}`).toBe(true);
    }
  });

  it("should not reference the retired traced Semente SVGs anywhere in src", () => {
    const retired = /simbolo_semente_|logo_completo_horizontal|icone_(folha|pessoa|semente)/;
    const walk = (dir: string): string[] =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
      );
    const offenders = walk(path.join(rootDir, "src")).filter((f) => retired.test(fs.readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("should verify BaseLayout.astro includes Semente mobile titles and favicon links", () => {
    const layout = fs.readFileSync(baseLayoutPath, "utf8");

    expect(layout).toContain('rel="icon" type="image/png"');
    expect(layout).toContain("favicon-96x96.png");
    expect(layout).toContain("favicon.ico");
    expect(layout).toContain('rel="apple-touch-icon"');
    expect(layout).toContain('name="apple-mobile-web-app-title" content="Semente"');
    expect(layout).toContain('name="application-name" content="Semente"');
  });
});
