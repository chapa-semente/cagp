import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import * as React from "react"
import { NeobrutalistMotionCard } from "@/components/ui/neobrutalist-motion-card"

describe("NeobrutalistMotionCard", () => {
  it("renders correctly with title, description, and badge", () => {
    render(
      <NeobrutalistMotionCard
        title="Gestão Pública"
        badge="UFMG"
        description="Portal Discente & Super App"
      />
    )

    expect(screen.getByText("Gestão Pública")).toBeDefined()
    expect(screen.getByText("UFMG")).toBeDefined()
    expect(screen.getByText("Portal Discente & Super App")).toBeDefined()
  })

  it("applies neobrutalist structural classes", () => {
    const { container } = render(
      <NeobrutalistMotionCard title="Card de Teste" />
    )

    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain("border-3")
    expect(card.className).toContain("rounded-xl")
    expect(card.className).toContain("border-foreground")
    expect(card.className).toContain("bg-card")
  })

  it("handles click and keyboard Enter interaction when onClick is provided", () => {
    const handleClick = vi.fn()
    render(
      <NeobrutalistMotionCard
        title="Cartão Interativo"
        onClick={handleClick}
      />
    )

    const card = screen.getByRole("button")
    expect(card).toBeDefined()
    expect(card.getAttribute("tabindex")).toBe("0")

    // Click trigger
    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)

    // Keyboard Enter trigger
    fireEvent.keyDown(card, { key: "Enter" })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
