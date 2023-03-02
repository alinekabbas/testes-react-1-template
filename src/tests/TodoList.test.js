import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoList from "../components/TodoList"

describe("TodoList", () => {
    test("deve renderizar o título", () => {
        render(<TodoList />)
        //screen.debug()

        const title = screen.getByText(/todo list/i)
        expect(title).toBeInTheDocument()
    })

    test("deve renderizar com o input vazio", () => {
        render(<TodoList />)
        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toHaveValue("")
    })

    test("deve atualizar o valor do input ao ser digitado", async () => {
        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        //interagir - Passo 3
        await user.type(input, "Revisar React")

        expect(input).toHaveValue("Revisar React")
    })

    test("deve renderizar uma nova tarefa ao digitar o input e pressionar a tecla enter", async () => {
        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        //interagir - Passo 3
        await user.type(input, "Revisar React{enter}")

        const item = screen.getByText("Revisar React")

        //screen.logTestingPlaygroundURL()

        expect(input).toHaveValue("")
        expect(input).toBeInTheDocument()

    })

    test("deve alterar o status da tarefa quando o botão de alterar status for clicado", async () => {
        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

        const toggleBtn = screen.getByRole('button', {name: /toggle/i})

        const item = screen.getByText("Revisar React")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: line-through")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: none")

    })

    test("deve remover a tarefa quando o botão de deletar for clicado", async () => {
        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

        const item = screen.queryByText("Revisar React")

        const deleteBtn = screen.getByRole('button', {name: /delete/i})

        await user.click(deleteBtn)
        
        expect(item).not.toBeInTheDocument()
    })
})