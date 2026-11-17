import fs from 'node:fs';
import path from 'node:path';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.astro') || file.endsWith('.tsx') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getFiles('src');
let totalReplacements = 0;
let filesModified = 0;

const REPLACEMENTS = [
  // 1. Sombras arbitrárias -> classes semânticas
  { regex: /shadow-\[1(?:\.5)?px_1(?:\.5)?px_0_0_#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'shadow-xs' },
  { regex: /shadow-\[2(?:\.5)?px_2(?:\.5)?px_0_0_#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'shadow-sm' },
  { regex: /shadow-\[2px_2px_0px_(?:var\(--shadow-color\)|hsl\(var\(--shadow-color\)\)|#16181[dD])\]/g, replace: 'shadow-sm' },
  { regex: /shadow-\[3px_3px_0_0_#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'shadow' },
  { regex: /shadow-\[3px_3px_0px_(?:var\(--shadow-color\)|hsl\(var\(--shadow-color\)\)|#16181[dD])\]/g, replace: 'shadow' },
  { regex: /shadow-\[4px_4px_0_0_#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'shadow-md' },
  { regex: /shadow-\[4px_4px_0px_(?:var\(--shadow-color\)|hsl\(var\(--shadow-color\)\))\]/g, replace: 'shadow-md' },
  { regex: /shadow-\[6px_6px_0_0_#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'shadow-lg' },
  { regex: /shadow-\[6px_6px_0px_(?:var\(--shadow-color\)|hsl\(var\(--shadow-color\)\))\]/g, replace: 'shadow-lg' },
  { regex: /shadow-\[8px_8px_0px_(?:var\(--shadow-color\)|hsl\(var\(--shadow-color\)\))\]/g, replace: 'shadow-xl' },
  { regex: /shadow-\[10px_10px_0_1px_var\(--shadow-color\)\]/g, replace: 'shadow-xl' },

  // 2. Bordas com colchetes e opacidade
  { regex: /border-2 border-border/g, replace: 'border-3 border-border' },
  { regex: /border-2 border-\[#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'border-3 border-border' },
  { regex: /border-\[#(?:0[aA]0[aA]0[aA]|16181[dD])\]\/(\d+)/g, replace: 'border-border/$1' },
  { regex: /border-\[#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'border-border' },
  { regex: /border-\[#(?:8[bB]1[eE]2[dD]|9[eE]2424)\]/g, replace: 'border-secondary' },
  { regex: /border-\[#5[bB]2[aA]86\]/g, replace: 'border-primary' },
  { regex: /border-\[#(?:[fF]{2}8811)\]/g, replace: 'border-accent' },
  { regex: /border-\[#15803[dD]\]/g, replace: 'border-success' },
  { regex: /border-\[#(?:[dD][cC]2626)\]/g, replace: 'border-destructive' },
  { regex: /border-\[#(?:[bB]45309)\]/g, replace: 'border-warning' },
  { regex: /border-\[#005[aA]9[cC]\]/g, replace: 'border-info' },
  { regex: /border-\[#[dD][fF][dD][bB][dD]2\]/g, replace: 'border-muted' },

  // 3. Texto com colchetes e opacidade
  { regex: /text-\[#(?:0[aA]0[aA]0[aA]|16181[dD])\]\/(\d+)/g, replace: 'text-foreground/$1' },
  { regex: /text-\[#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'text-foreground' },
  { regex: /text-\[#(?:8[bB]1[eE]2[dD]|9[eE]2424)\]/g, replace: 'text-secondary' },
  { regex: /text-\[#5[bB]2[aA]86\]/g, replace: 'text-primary' },
  { regex: /text-\[#(?:[fF]{2}8811)\]/g, replace: 'text-accent' },
  { regex: /text-\[#15803[dD]\]/g, replace: 'text-success' },
  { regex: /text-\[#(?:[dD][cC]2626)\]/g, replace: 'text-destructive' },
  { regex: /text-\[#(?:[bB]45309)\]/g, replace: 'text-warning' },
  { regex: /text-\[#005[aA]9[cC]\]/g, replace: 'text-info' },
  { regex: /text-\[#57534[eE]\]/g, replace: 'text-muted-foreground' },
  { regex: /text-\[#292524\]/g, replace: 'text-muted-foreground' },

  // 4. Background com colchetes
  { regex: /bg-\[#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'bg-foreground text-background' },
  { regex: /bg-\[#(?:8[bB]1[eE]2[dD]|9[eE]2424)\]/g, replace: 'bg-secondary' },
  { regex: /bg-\[#5[bB]2[aA]86\]/g, replace: 'bg-primary' },
  { regex: /bg-\[#(?:[fF]{2}8811)\]/g, replace: 'bg-accent' },
  { regex: /bg-\[#15803[dD]\]/g, replace: 'bg-success' },
  { regex: /bg-\[#(?:[dD][cC]2626)\]/g, replace: 'bg-destructive' },
  { regex: /bg-\[#(?:[bB]45309)\]/g, replace: 'bg-warning' },
  { regex: /bg-\[#005[aA]9[cC]\]/g, replace: 'bg-info' },
  { regex: /bg-\[#266264\]/g, replace: 'bg-teal-700' },
  { regex: /bg-\[#(?:[fF]4[fF]5[fF]7|[fF]4[fF]1[eE][aA]|[fF]7[fF]5[fF]0)\]/g, replace: 'bg-background' },
  { regex: /bg-\[#(?:[fF]{6}|[fF]{3}[dD][fF]9)\]/g, replace: 'bg-card' },
  { regex: /bg-\[#DCFCE7\]/g, replace: 'bg-success/20' },

  // 5. Hover states com colchetes
  { regex: /hover:text-\[#(?:8[bB]1[eE]2[dD]|9[eE]2424)\]/g, replace: 'hover:text-secondary' },
  { regex: /hover:text-\[#5[bB]2[aA]86\]/g, replace: 'hover:text-primary' },
  { regex: /hover:text-\[#(?:[fF]{2}8811)\]/g, replace: 'hover:text-accent' },
  { regex: /hover:bg-\[#(?:8[bB]1[eE]2[dD]|9[eE]2424)\]/g, replace: 'hover:bg-secondary' },
  { regex: /hover:bg-\[#5[bB]2[aA]86\]/g, replace: 'hover:bg-primary' },
  { regex: /hover:bg-\[#(?:[fF]{2}8811)\]/g, replace: 'hover:bg-accent' },
  { regex: /hover:border-\[#(?:0[aA]0[aA]0[aA]|16181[dD])\]/g, replace: 'hover:border-border' }
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  for (const { regex, replace } of REPLACEMENTS) {
    const matches = content.match(regex);
    if (matches) {
      totalReplacements += matches.length;
      content = content.replace(regex, replace);
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
  }
}

console.log(`Substituições concluídas com sucesso:`);
console.log(`- Arquivos modificados: ${filesModified}`);
console.log(`- Total de substituições: ${totalReplacements}`);
