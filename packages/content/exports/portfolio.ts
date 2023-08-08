import portfolio from "../dist/portfolio.json" assert { type: "json" }
import type { PortfolioProject } from "../src/types/types"

export type ProjectKey = keyof typeof portfolio.projects

// sort of like src/types/types.ts > PortfolioData but exported
export default portfolio as {
    // waiting for https://github.com/microsoft/TypeScript/issues/32063
    skills: string[]

    projects: {
        [key in ProjectKey]: PortfolioProject
    }
}
