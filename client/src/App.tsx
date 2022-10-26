import {Box, List, Table, ThemeIcon} from "@mantine/core";
import {CheckCircleFillIcon} from "@primer/octicons-react";
import useSWR from "swr";
import "./App.css";
import AddTodo from "./components/AddTodo";

export interface Todo {
    id: number;
    title: string;
    body: string;
    done: boolean;
}

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
    fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
    const {data, mutate} = useSWR<Todo[]>("api/todos", fetcher);

    async function markTodoAdDone(id: number) {
        const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
            method: "PATCH",
        }).then((r) => r.json());

        mutate(updated);
    }

    return (
        <div style={{
            backgroundImage: `url("https://funart.pro/uploads/posts/2021-04/thumbs/1618663205_42-funart_pro-p-fon-gorod-krasivie-mesta-foto-43.jpg")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <br/>
            <br/>
            <Box
                sx={(theme) => ({
                    padding: "2rem",
                    width: "100%",
                    maxWidth: "40rem",
                    margin: "0 auto",
                    background: '#BEBEF4',
                    borderRadius: 40
                })}
            >
                <List spacing="xs" size="sm" mb={12} center>
                    {data?.map((todo) => {
                        return (
                            <List.Item
                                onClick={() => markTodoAdDone(todo.id)}
                                key={`todo_list__${todo.id}`}
                                icon={
                                    todo.done ? (
                                        <ThemeIcon color="teal" size={24} radius="xl">
                                            <CheckCircleFillIcon size={20}/>
                                        </ThemeIcon>
                                    ) : (
                                        <ThemeIcon color="gray" size={24} radius="xl">
                                            <CheckCircleFillIcon size={20}/>
                                        </ThemeIcon>
                                    )
                                }
                            >
                                <Table style={{
                                    background: '#32F4DD',
                                    width: 500,
                                    borderRadius: 10,
                                    textAlign: "center"
                                }}>
                                    <tbody>
                                    <h1 style={{color: 'red'}}>TITLE : <b
                                        style={{color: 'blue'}}><b>{todo.title}</b></b>
                                    </h1>
                                    <h3 style={{color: 'red'}}>BODY : <b style={{color: 'blue'}}><i>{todo.body}</i></b>
                                    </h3>
                                    </tbody>
                                </Table>
                            </List.Item>
                        );
                    })}
                </List>

                <AddTodo mutate={mutate}/>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default App;
