import { render } from "@testing-library/react"
import App from "./App"

test("renders content", () => {
	const { getByTestId } = render(<App />)
	const content = getByTestId("content")
	expect(content).toBeInTheDocument()
})
