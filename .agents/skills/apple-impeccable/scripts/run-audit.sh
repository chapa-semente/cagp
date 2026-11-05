#!/usr/bin/env bash
# ==============================================================================
# apple-impeccable: run-audit.sh
# 
# Comprehensive audit runner uniting Apple HIG tactile/ergonomic criteria with
# Impeccable's technical DOM and anti-pattern detection engine.
# ==============================================================================
set -euo pipefail

# ANSI Color codes for clean output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACE_ROOT="$(cd "$SKILL_ROOT/../../.." 2>/dev/null && pwd || pwd)"

# Failure and warning counters
FAILURES=0
WARNINGS=0

# Standard directories and file exclusions to avoid scanning build artifacts, caches, and binaries
EXCLUDE_DIRS=(
  --exclude-dir=.git
  --exclude-dir=node_modules
  --exclude-dir=dist
  --exclude-dir=build
  --exclude-dir=.astro
  --exclude-dir=.next
  --exclude-dir=.cache
  --exclude-dir=coverage
  --exclude-dir=.agents
  --exclude-dir=public
  --exclude-dir=vendor
  --exclude-dir=static
)

INCLUDE_FILES=(
  --include="*.astro"
  --include="*.html"
  --include="*.htm"
  --include="*.jsx"
  --include="*.tsx"
  --include="*.vue"
  --include="*.svelte"
  --include="*.css"
  --include="*.scss"
  --include="*.sass"
  --include="*.less"
  --include="*.js"
  --include="*.ts"
  --include="*.mjs"
  --include="*.cjs"
)

# Resolve Impeccable launcher path
IMPECCABLE_BIN=""
CANDIDATE_PATHS=(
  "$SKILL_ROOT/../impeccable/scripts/impeccable"
  "$WORKSPACE_ROOT/.agents/skills/impeccable/scripts/impeccable"
  "$HOME/.gemini/skills/impeccable/scripts/impeccable"
)

for p in "${CANDIDATE_PATHS[@]}"; do
  if [ -f "$p" ]; then
    IMPECCABLE_BIN="$p"
    break
  fi
done

print_header() {
  echo -e "\n${BOLD}${CYAN}=== [apple-impeccable] $1 ===${NC}\n"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}▲ [WARNING] $1${NC}"
  WARNINGS=$((WARNINGS + 1))
}

print_error() {
  echo -e "${RED}✗ [FAIL] $1${NC}"
  FAILURES=$((FAILURES + 1))
}

print_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

# Safe line printer to prevent SIGPIPE under pipefail and cap runaway minified lines
print_matches() {
  local text="$1"
  local max_lines="${2:-5}"
  local count=0
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    if [ "$count" -lt "$max_lines" ]; then
      if [ ${#line} -gt 160 ]; then
        echo -e "    ${line:0:157}${CYAN}...${NC}"
      else
        echo "    $line"
      fi
      count=$((count + 1))
    fi
  done <<< "$text"
  local total
  total=$(echo "$text" | grep -c . || true)
  if [ "$total" -gt "$max_lines" ]; then
    echo -e "    ${YELLOW}... and $((total - max_lines)) more match(es).${NC}"
  fi
}

# Helper to run grep safely across files or directories
run_grep() {
  local pattern="$1"
  local target="$2"
  local case_insensitive="${3:-true}"
  local extra_args=()
  if [ "$case_insensitive" = "true" ]; then
    extra_args+=("-i")
  fi

  if [ -f "$target" ]; then
    grep -HEnI "${extra_args[@]}" -- "$pattern" "$target" 2>/dev/null || true
  elif [ -d "$target" ]; then
    grep -rEnIH "${extra_args[@]}" "${EXCLUDE_DIRS[@]}" "${INCLUDE_FILES[@]}" -- "$pattern" "$target" 2>/dev/null || true
  else
    return 0
  fi
}

show_help() {
  echo -e "${BOLD}Usage:${NC} $0 [command] [target-directory-or-file-or-url]"
  echo ""
  echo -e "${BOLD}Commands:${NC}"
  echo "  all [target]          Run full suite: Tokens, Parity, HIG Ergonomics, Apple Design & Impeccable Engine (Default)"
  echo "  critique [target|url] Run consultative Super App UX critique & live browser dual-viewport inspection"
  echo "  parity [target]       Audit for Chromium & Safari 1:1 feature parity (backdrop-filter, dvh, tap-highlight, etc.)"
  echo "  detect [target]       Run Impeccable's anti-pattern and DOM detection CLI"
  echo "  tokens [target]       Audit for theme neutrality & zero hardcoded Apple colors"
  echo "  hig [target]          Audit for Apple HIG ergonomics (touch targets, safe areas, motion)"
  echo "  appledesign [target]  Audit for Apple Pay guidelines, brand marks and glyphs (from apple-design)"
  echo "  help                  Show this help message"
  echo ""
  echo -e "${BOLD}Examples:${NC}"
  echo "  $0 all src"
  echo "  $0 critique src/pages/index.astro"
  echo "  $0 critique http://localhost:4321"
  echo "  $0 parity src"
  echo "  $0 tokens src/components/Header.astro"
  echo "  $0 hig src/layouts"
  echo "  $0 appledesign src"
}

# --- Check 1: Semantic Tokens & Theme Neutrality ---
check_tokens() {
  local target="$1"
  print_header "Auditing Theme Neutrality & Semantic Tokens ($target)"
  
  local issues_found=0

  # Check for prohibited hardcoded Apple colors
  print_info "Checking for hardcoded Apple colors (SystemBlue, #007aff, etc.)..."
  local forbidden_regex='(\bSystem(Blue|Gray|Green|Red|Orange|Yellow|Purple|Indigo|Teal|Pink|Mint|Cyan)\b|#(007aff|34c759|ff3b30|af52de|5856d6|ff9500|ffcc00|5ac8fa)\b|rgba?\(\s*0\s*,\s*122\s*,\s*255)'
  
  local forbidden_matches
  forbidden_matches=$(run_grep "$forbidden_regex" "$target" "true")

  if [ -n "$forbidden_matches" ]; then
    print_error "Forbidden hardcoded Apple color(s) found in code files:"
    print_matches "$forbidden_matches" 5
    issues_found=$(echo "$forbidden_matches" | grep -c . || true)
  fi

  # Check for usage of semantic tokens or project theme references
  print_info "Verifying presence of semantic token patterns..."
  local semantic_regex='(--app-accent|--app-surface|--app-border|--app-text|--color-accent|cagp-|primary|accent-contrast)'
  local semantic_matches
  semantic_matches=$(run_grep "$semantic_regex" "$target" "true")
  local semantic_count=0
  if [ -n "$semantic_matches" ]; then
    semantic_count=$(echo "$semantic_matches" | grep -c . || true)
  fi

  if [ "$semantic_count" -gt 0 ]; then
    print_success "Semantic tokens or theme references detected ($semantic_count references found)."
  else
    print_warning "No recognized semantic tokens (--app-accent, --app-surface, etc.) detected in target."
  fi

  if [ "$issues_found" -eq 0 ]; then
    print_success "Theme neutrality audit passed: zero hardcoded Apple colors."
  else
    print_error "Theme neutrality audit failed with $issues_found forbidden color match(es)."
  fi
}

# --- Check 2: Apple HIG Ergonomics & Touch Layout ---
check_hig() {
  local target="$1"
  print_header "Auditing Apple HIG Ergonomics & Interaction ($target)"

  # Check touch targets under 44px on interactive elements
  print_info "Scanning for potentially sub-ergonomic touch targets (< 44px) on interactive elements..."
  local sub44_regex='(<button|<a\b|role=["\x27]button["\x27]|type=["\x27]button["\x27]|type=["\x27]submit["\x27]).*(h-[1-9]\b|h-10\b|w-[1-9]\b|w-10\b|height:\s*([1-3][0-9]|4[0-3])px|width:\s*([1-3][0-9]|4[0-3])px)'
  local sub44_matches
  sub44_matches=$(run_grep "$sub44_regex" "$target" "true" | grep -v 'aria-hidden="true"' || true)
  
  if [ -n "$sub44_matches" ]; then
    local count
    count=$(echo "$sub44_matches" | grep -c . || true)
    print_warning "Found $count potential sub-44px interactive controls. Verify if touch targets have expanded area (::after / padding):"
    print_matches "$sub44_matches" 5
  else
    print_success "No sub-44px fixed interactive touch targets flagged without expanded area."
  fi

  # Check for safe-area-inset in fixed or sticky bars
  print_info "Checking safe-area-inset compliance for fixed/sticky layouts..."
  local fixed_elements
  fixed_elements=$(run_grep "(position:\s*(fixed|sticky)|\bfixed\b|\bsticky\b)" "$target" "true")
  if [ -n "$fixed_elements" ]; then
    local safe_area_matches
    safe_area_matches=$(run_grep "safe-area-inset" "$target" "true")
    if [ -z "$safe_area_matches" ]; then
      print_warning "Fixed/sticky elements exist, but 'safe-area-inset' was not found in target."
      print_info "Recommendation: Ensure fixed bars apply 'padding-bottom: max(16px, env(safe-area-inset-bottom))'."
    else
      print_success "Safe area insets properly referenced for fixed/sticky layouts."
    fi
  else
    print_success "No fixed/sticky layouts requiring safe-area-insets."
  fi

  # Check for prefers-reduced-motion
  print_info "Checking motion accessibility (prefers-reduced-motion)..."
  local animations
  animations=$(run_grep "(transition|animation|@keyframes)" "$target" "true")
  if [ -n "$animations" ]; then
    local reduced_motion
    reduced_motion=$(run_grep "prefers-reduced-motion" "$target" "true")
    if [ -z "$reduced_motion" ]; then
      print_warning "Animations/transitions present without 'prefers-reduced-motion' media query."
    else
      print_success "Accessible motion handling ('prefers-reduced-motion') detected."
    fi
  else
    print_success "No motion/animations requiring reduced-motion handling."
  fi
}

# --- Check 3: Apple Design HIG Compliance (from apple-design) ---
check_apple_design() {
  local target="$1"
  print_header "Auditing Apple Design & Branding (from apple-design)"

  print_info "Checking for counterfeit Apple Pay elements or improper Apple glyphs..."
  local fake_pay_regex='(fa-apple-pay|faCcApplePay|siApplepay|\uF8FF|&#xF8FF;|&#63743;)'
  local fake_pay_matches
  fake_pay_matches=$(run_grep "$fake_pay_regex" "$target" "true")

  if [ -n "$fake_pay_matches" ]; then
    print_error "Counterfeit Apple Pay glyph or improper Apple symbol detected (violates App Store Review Guideline 4.9):"
    print_matches "$fake_pay_matches" 5
  else
    print_success "Zero improper Apple Pay marks or counterfeit logo glyphs detected."
  fi
}

# --- Check 4: Chromium & Safari Parity ---
check_parity() {
  local target="$1"
  print_header "Auditing Chromium & Safari Parity ($target)"

  local parity_errors=0

  # 1. Dual Prefix: backdrop-filter and -webkit-backdrop-filter
  print_info "Checking for paired -webkit-backdrop-filter and backdrop-filter..."
  local bf_matches
  bf_matches=$(run_grep "backdrop-filter" "$target" "true")
  
  if [ -n "$bf_matches" ]; then
    local files_with_bf
    files_with_bf=$(echo "$bf_matches" | cut -d: -f1 | sort -u)
    
    for f in $files_with_bf; do
      [ -f "$f" ] || continue
      local total_bf
      total_bf=$(grep -ci "backdrop-filter\s*:" "$f" || true)
      local webkit_bf
      webkit_bf=$(grep -ci -- "-webkit-backdrop-filter\s*:" "$f" || true)
      local standard_bf=$((total_bf - webkit_bf))

      if [ "$webkit_bf" -ne "$standard_bf" ]; then
        print_error "File '$f' has unpaired backdrop-filter declarations ($webkit_bf '-webkit-backdrop-filter' vs $standard_bf standard 'backdrop-filter'). Parity requires exact 1:1 pairing across WebKit and Chromium."
        parity_errors=$((parity_errors + 1))
      fi

      # Check GPU isolation
      local has_gpu_iso
      has_gpu_iso=$(grep -qiE "(isolation:\s*isolate|transform:\s*translateZ|backface-visibility)" "$f" && echo "yes" || echo "no")
      if [ "$has_gpu_iso" = "no" ]; then
        print_warning "File '$f' declares backdrop-filter but lacks GPU isolation ('isolation: isolate' / 'transform: translateZ(0)'). May cause flickering or pixel bleeding in Chromium."
      fi
    done

    if [ "$parity_errors" -eq 0 ]; then
      print_success "All backdrop-filter declarations correctly paired for WebKit and Chromium."
    fi
  else
    print_success "No backdrop-filter surfaces detected in target."
  fi

  # 2. Dynamic Viewport Units (dvh/svh instead of naked 100vh)
  print_info "Checking dynamic viewport units (100dvh / 100svh instead of naked 100vh)..."
  local naked_vh_matches
  naked_vh_matches=$(run_grep "(h-screen|\bheight:\s*100vh\b|\bmin-height:\s*100vh\b)" "$target" "true")
  if [ -n "$naked_vh_matches" ]; then
    print_warning "Found naked '100vh' / 'h-screen' usages. Prefer '100dvh' for full screens or '100svh' for sheets/modals to ensure parity during mobile URL bar retraction:"
    print_matches "$naked_vh_matches" 4
  else
    print_success "No naked 100vh full-screen heights flagged."
  fi

  # 3. Tap highlight elimination (-webkit-tap-highlight-color: transparent)
  print_info "Checking tap highlight color elimination (-webkit-tap-highlight-color: transparent)..."
  local tap_matches
  tap_matches=$(run_grep "-webkit-tap-highlight-color" "$target" "true")
  if [ -z "$tap_matches" ]; then
    print_warning "No '-webkit-tap-highlight-color: transparent' found in target. Chrome Mobile will display blue/grey tap flash, masking Apple spring feedback."
  else
    print_success "Tap highlight elimination present (-webkit-tap-highlight-color: transparent)."
  fi

  # 4. Viewport-fit=cover in templates
  print_info "Checking viewport-fit=cover for safe-area insets..."
  local html_targets
  html_targets=$(run_grep "viewport" "$target" "true" | grep -i "content=" || true)
  if [ -n "$html_targets" ]; then
    local cover_matches
    cover_matches=$(echo "$html_targets" | grep -i "viewport-fit=cover" || true)
    if [ -z "$cover_matches" ]; then
      print_warning "Viewport meta tag found without 'viewport-fit=cover'. Dynamic Island and safe area insets will not expand fully."
    else
      print_success "Viewport-fit=cover detected in viewport meta tag."
    fi
  fi

  # 5. Prohibited Degraded Fallbacks (@supports not (backdrop-filter))
  print_info "Checking for prohibited degraded fallbacks..."
  local fallback_matches
  fallback_matches=$(run_grep "@supports\s+not\s*\(\s*(-webkit-)?backdrop-filter" "$target" "true")
  if [ -n "$fallback_matches" ]; then
    print_error "Found '@supports not (backdrop-filter)' degraded fallback block. Policy strictly forbids degraded fallbacks; 1:1 identical Liquid Glass parity required:"
    print_matches "$fallback_matches" 3
    parity_errors=$((parity_errors + 1))
  else
    print_success "Zero degraded fallback blocks detected."
  fi

  # 6. Font smoothing parity (-webkit-font-smoothing)
  print_info "Checking font smoothing parity (-webkit-font-smoothing)..."
  local font_smoothing_matches
  font_smoothing_matches=$(run_grep "-webkit-font-smoothing" "$target" "true")
  if [ -z "$font_smoothing_matches" ]; then
    print_warning "No '-webkit-font-smoothing: antialiased' detected in target. Font rendering may look heavier/blurred in Chromium/macOS compared to Safari."
  else
    print_success "Font smoothing rule (-webkit-font-smoothing) detected."
  fi

  if [ "$parity_errors" -eq 0 ]; then
    print_success "Chromium & Safari feature parity audit passed."
  else
    print_error "Chromium & Safari feature parity audit failed with $parity_errors fatal error(s)."
  fi
}

# --- Check 5: Impeccable Engine Execution ---
run_impeccable_detect() {
  local target="$1"
  print_header "Invoking Impeccable Engine (Detect & Anti-Patterns)"

  if [ -z "$IMPECCABLE_BIN" ] || [ ! -f "$IMPECCABLE_BIN" ]; then
    print_warning "Impeccable CLI script not found in candidates list. Skipping CLI step."
    return 0
  fi

  print_info "Running: bash $IMPECCABLE_BIN detect $target"
  # Provide automatic yes to avoid hanging on large directory confirmation prompts in non-interactive environments
  if echo "y" | bash "$IMPECCABLE_BIN" detect "$target"; then
    print_success "Impeccable detection completed with zero anti-patterns."
  else
    local code=$?
    print_warning "Impeccable detection completed with findings or advisory notes (exit code $code)."
  fi
}

# --- Check 6: Consultative Super App UX Critique & Multiplatform Inspection ---
run_critique() {
  local target="$1"
  print_header "Super App UX Critique & Consultative Architecture Review ($target)"

  if [[ "$target" =~ ^https?:// ]]; then
    # URL Mode: Live Browser Dual-Viewport Inspection (Mobile 390x844 & Desktop 1440x900)
    print_info "Target identified as Live Web Application: $target"
    print_info "Initiating dual-viewport inspection (Mobile 390x844 & Desktop 1440x900)..."

    if [ -n "$IMPECCABLE_BIN" ] && [ -f "$IMPECCABLE_BIN" ]; then
      print_info "[Live Browser] Auditing Mobile Viewport (390x844 - Android & iOS Super App Ergonomics)..."
      if echo "y" | bash "$IMPECCABLE_BIN" detect --viewport 390x844 "$target"; then
        print_success "Mobile viewport (390x844) passed anti-pattern and contrast scan."
      else
        print_warning "Mobile viewport (390x844) noted anti-patterns or contrast advisories."
      fi

      print_info "[Live Browser] Auditing Desktop Viewport (1440x900 - Linux, macOS & Windows Widescreen)..."
      if echo "y" | bash "$IMPECCABLE_BIN" detect --viewport 1440x900 "$target"; then
        print_success "Desktop viewport (1440x900) passed anti-pattern and contrast scan."
      else
        print_warning "Desktop viewport (1440x900) noted anti-patterns or contrast advisories."
      fi
    else
      print_warning "Impeccable CLI not available for headless browser detection."
    fi

    # Inspect rendered page signals via Node fetch (preferred) or curl
    print_info "Evaluating live DOM signals (Fluid Glass, Safe Areas, Touch Targets & Viewport)..."
    local html_content=""
    if command -v node >/dev/null 2>&1; then
      html_content=$(node -e "fetch(process.argv[1], { signal: AbortSignal.timeout(5000) }).then(r=>r.text()).then(t=>process.stdout.write(t)).catch(()=>{})" "$target" 2>/dev/null || true)
    fi
    if [ -z "$html_content" ] && command -v curl >/dev/null 2>&1; then
      html_content=$(curl -fsSL --connect-timeout 5 "$target" 2>/dev/null || true)
    fi

    if [ -n "$html_content" ]; then
      # Check viewport-fit=cover
      if echo "$html_content" | grep -qi "viewport-fit=cover"; then
        print_success "Viewport tag includes 'viewport-fit=cover' for edge-to-edge hardware notches/islands."
      else
        print_warning "Viewport tag missing 'viewport-fit=cover'. Dynamic Island & safe areas may clip."
      fi

      # Check backdrop-filter / glass
      if echo "$html_content" | grep -qiE "backdrop-blur|backdrop-filter"; then
        print_success "Fluid Glass materials detected in rendered markup."
      else
        print_info "No explicit backdrop-blur utility found in initial HTML markup (may be in external CSS)."
      fi

      # Check bottom dock / navigation
      if echo "$html_content" | grep -qiE "(dock|bottom[-_]?nav|cagp-bottom-nav|fixed bottom-|<nav)"; then
        print_success "Lower Thumb Zone navigation / dock structure detected."
      else
        print_warning "No bottom dock detected in initial HTML. Key mobile actions may require high thumb stretch."
      fi
    else
      print_warning "Could not fetch HTML directly (server might require authentication, be offline, or be slow to respond)."
      print_info "Tip: In the agent environment, you can also use the interactive '/browser' tool to view and inspect the rendered page."
    fi

  else
    # Static Mode: File or Directory Analysis
    print_info "Analyzing file/directory structure for Super App information architecture..."

    # 1. Spatial Distribution & Thumb Zone
    print_info "1. Spatial Distribution & Thumb Zone Analysis:"
    local header_elements
    header_elements=$(run_grep '(<(header|SuperAppHeader\b|TopNav\b)|id=[\"'"'"'][^\"'"'"']*header[^\"'"'"']*|class=[\"'"'"'][^\"'"'"']*header[^\"'"'"']*)' "$target" "true")
    local dock_elements
    dock_elements=$(run_grep '(<(SuperAppDock\b|BottomNav\b|DesktopFloatingDock\b|Dock\b)|id=[\"'"'"'][^\"'"'"']*(dock|bottom[-_]?nav)[^\"'"'"']|class=[\"'"'"'][^\"'"'"']*(fixed|sticky)[^\"'"'"']*bottom|class=[\"'"'"'][^\"'"'"']*bottom[-_]nav)' "$target" "true")

    if [ -n "$dock_elements" ]; then
      print_success "Found bottom dock / floating quick actions for Thumb Zone reachability."
    else
      print_warning "Consultative note: Consider adding a Quick Action Dock at the bottom (Thumb Zone) for primary service shortcuts."
    fi

    # 2. Content Density & Cognitive Grouping
    print_info "2. Content Density & Cognitive Grouping:"
    local section_matches
    section_matches=$(run_grep '<section\b|<article\b|<Card\b' "$target" "true")
    local section_count=0
    if [ -n "$section_matches" ]; then
      section_count=$(echo "$section_matches" | grep -c . || true)
    fi

    if [ -f "$target" ]; then
      if [ "$section_count" -gt 8 ]; then
        print_warning "High density detected ($section_count sections/cards in this view). Consultative suggestion: Use collapsible cards or bottom sheets for secondary modules."
      else
        print_success "Content density is well-balanced ($section_count top-level sections/cards identified)."
      fi
    else
      # Directory target: check per-file density
      local high_density_count=0
      if [ -n "$section_matches" ]; then
        while IFS= read -r line; do
          [ -z "$line" ] && continue
          local cnt file
          cnt=$(echo "$line" | awk '{print $1}')
          file=$(echo "$line" | awk '{$1=""; print $0}' | sed 's/^[ \t]*//')
          if [ "$cnt" -gt 8 ]; then
            print_warning "File '$file' has high section density ($cnt sections/cards). Suggestion: Group modules in collapsible cards or sheets."
            high_density_count=$((high_density_count + 1))
          fi
        done < <(echo "$section_matches" | cut -d: -f1 | sort | uniq -c)
      fi

      if [ "$high_density_count" -eq 0 ]; then
        print_success "Content density is well-balanced across all views (all files have <= 8 primary sections/cards)."
      fi
    fi

    # 3. Dynamic Animations & Springs (Motion Physics)
    print_info "3. Dynamic Animations & Motion Physics:"
    local spring_matches
    spring_matches=$(run_grep 'cubic-bezier|--spring|scale\(0\.9|transition-transform' "$target" "true")
    if [ -n "$spring_matches" ]; then
      print_success "Spring physics or tactile compression patterns detected."
    else
      print_info "Consultative tip: Consider adding Apple-style spring curves (cubic-bezier(0.25, 1, 0.5, 1)) and active tactile compression (scale(0.965))."
    fi

    local reduced_motion_matches
    reduced_motion_matches=$(run_grep 'prefers-reduced-motion' "$target" "true")
    if [ -n "$reduced_motion_matches" ]; then
      print_success "Reduced motion accessibility (@media (prefers-reduced-motion: reduce)) detected."
    else
      print_warning "Consultative tip: Ensure animations respect 'prefers-reduced-motion' for vestibular accessibility."
    fi

    # 4. Fluid Glass & Specular Contrast
    print_info "4. Fluid Glass & Specular Contrast:"
    local glass_matches
    glass_matches=$(run_grep 'backdrop-(blur|filter)|bg-[^"'"'"']*\/(70|80|85|90)' "$target" "true")
    if [ -n "$glass_matches" ]; then
      print_success "Fluid glass & translucency patterns detected."
      local webkit_bf
      webkit_bf=$(run_grep '-webkit-backdrop-filter' "$target" "true")
      if [ -z "$webkit_bf" ]; then
        print_warning "Consultative tip: Pair backdrop-filter with -webkit-backdrop-filter and 'isolation: isolate' for identical blur on Chromium and Safari."
      fi
    else
      print_info "No prominent glass/translucency classes in target."
    fi

    # 5. Universal Theme Architecture (Dark Mode & High Contrast)
    print_info "5. Universal Theme Architecture & Visual Accessibility:"
    local dark_theme_matches
    dark_theme_matches=$(run_grep 'dark:|prefers-color-scheme|data-theme' "$target" "true")
    local high_contrast_matches
    high_contrast_matches=$(run_grep 'data-a11y-contrast|prefers-contrast' "$target" "true")

    if [ -n "$dark_theme_matches" ]; then
      print_success "Adaptive theme / Dark Mode support detected."
    else
      print_info "Consultative tip: Support a semantic Dark Mode for nocturnal use and AMOLED battery savings on Android."
    fi

    if [ -n "$high_contrast_matches" ]; then
      print_success "High Contrast AAA accessibility rules detected."
    else
      print_info "Consultative tip: Consider High Contrast mode (data-a11y-contrast='high') eliminating subtle shadows for low vision."
    fi

    # 6. Onboarding & Progressive Disclosure
    print_info "6. Onboarding & Progressive Disclosure:"
    local auth_gates
    auth_gates=$(run_grep 'requireAuth|isAuthenticated|redirect.*login' "$target" "true")
    if [ -n "$auth_gates" ]; then
      print_info "Consultative tip: Ensure value is delivered before authentication (Value-First principle) so visitors explore services before login."
    else
      print_success "No hard blocking authentication gates found at top-level entry."
    fi

    # 7. Button & Action Touch Targets (Ergonomics)
    print_info "7. Button & Action Touch Targets (44x44px Ergonomics):"
    local undersized_buttons
    undersized_buttons=$(run_grep '(<button|<a\b|role=[\"'"'"']button[\"'"'"']).*(h-[1-9]\b|h-10\b|w-[1-9]\b|w-10\b|height:\s*([1-3][0-9]|4[0-3])px)' "$target" "true" | grep -v 'aria-hidden="true"' || true)
    local undersized_count=0
    if [ -n "$undersized_buttons" ]; then
      undersized_count=$(echo "$undersized_buttons" | grep -c . || true)
      if [ "$undersized_count" -gt 0 ]; then
        print_warning "Detected $undersized_count potentially undersized interactive button/link controls (< 44px). Ensure 44x44px interactive bounds."
        print_matches "$undersized_buttons" 3
      fi
    else
      print_success "No undersized interactive button/link controls detected."
    fi

    # Run Impeccable detect on the target as well
    run_impeccable_detect "$target"
  fi

  echo ""
  echo -e "${BOLD}${CYAN}=== Consultative Yoda / Grill Me Framework: Next Steps ===${NC}"
  echo -e "1. Review recommendations against ${BOLD}.agents/skills/apple-impeccable/references/superapp-ux-critique.md${NC}."
  echo -e "2. ${BOLD}Conduct a /grill-me alignment session${NC}: Formulate 2 to 3 targeted trade-off questions with options before refactoring."
  echo -e "3. ${BOLD}Real-time visual verification${NC}: Use the agent's ${BOLD}/browser${NC} tool to inspect the rendered page across viewports."
  echo -e "4. Remember: The skill never enforces dogmas. The user prompt and AI reasoning determine the final solution."
}

# Main command dispatcher
COMMAND="${1:-all}"
TARGET="${2:-}"

# Handle case when first argument is a URL
if [[ "$COMMAND" =~ ^https?:// ]]; then
  TARGET="$COMMAND"
  COMMAND="critique"
# Handle case when first argument is actually a file/directory
elif [ -e "$COMMAND" ] && [ "$COMMAND" != "help" ] && [ "$COMMAND" != "all" ] && [ "$COMMAND" != "parity" ] && [ "$COMMAND" != "detect" ] && [ "$COMMAND" != "tokens" ] && [ "$COMMAND" != "hig" ] && [ "$COMMAND" != "appledesign" ] && [ "$COMMAND" != "critique" ]; then
  TARGET="$COMMAND"
  COMMAND="all"
fi

# Default TARGET if not specified
if [ -z "$TARGET" ]; then
  if [ -d "src" ]; then
    TARGET="src"
  else
    TARGET="."
  fi
fi

if [[ ! "$TARGET" =~ ^https?:// ]] && [ ! -e "$TARGET" ]; then
  print_warning "Target path '$TARGET' does not exist. Defaulting to current directory."
  TARGET="."
fi

case "$COMMAND" in
  all)
    print_header "Running apple-impeccable Full Verification Suite"
    check_tokens "$TARGET"
    check_parity "$TARGET"
    check_hig "$TARGET"
    check_apple_design "$TARGET"
    run_impeccable_detect "$TARGET"
    ;;
  critique)
    run_critique "$TARGET"
    ;;
  parity)
    check_parity "$TARGET"
    ;;
  detect)
    run_impeccable_detect "$TARGET"
    ;;
  tokens)
    check_tokens "$TARGET"
    ;;
  hig)
    check_hig "$TARGET"
    ;;
  appledesign)
    check_apple_design "$TARGET"
    ;;
  help|--help|-h)
    show_help
    exit 0
    ;;
  *)
    echo -e "${RED}Unknown command: $COMMAND${NC}"
    show_help
    exit 1
    ;;
esac

print_header "Audit Summary"
if [ "$FAILURES" -gt 0 ]; then
  echo -e "${RED}${BOLD}Audit failed with $FAILURES fatal error(s) and $WARNINGS warning(s).${NC}\n"
  exit 1
else
  echo -e "${GREEN}${BOLD}Audit passed with 0 fatal errors and $WARNINGS warning(s).${NC}\n"
  exit 0
fi
