import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from "../components/Counter"

describe("Counter", () => {
    test(
        "deve aumentar em 3 o contador quando o botão de incremento for clicado 3 vezes",
        async () => {

        const user = userEvent.setup()
        
        render(<Counter />)

        const incrementButton = screen.getByText("+")

        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(incrementButton)

        const value = screen.getByText("3")
        
        expect(value).toBeInTheDocument()
    })
})