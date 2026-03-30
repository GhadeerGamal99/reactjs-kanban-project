import { useEffect } from "react";
import { useGetTasks } from "../../hooks/useGetTasks"
import type { AppDispatch } from "../../store"
import { setTasks } from "../../features/kanban/kanbanSlice";
import { useDispatch } from "react-redux";
import type { columnNameType } from "../../types";
import Column from "./Column";
import { Button } from "@mui/material";





const Board = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { data, isLoading } = useGetTasks();
    useEffect(() => {
        if (data) {
            dispatch(setTasks(data));
        }
    }, [data, dispatch])


    if (isLoading) return <div className="w-[95%] mt-5 mx-5">
        <Button loading variant="text">
        </Button><span className="text-text-secondary ml-[-15px]">Loading…</span>
    </div>
    const columns: columnNameType[] = ['backlog', 'in_progress', 'review', 'done']

    return (
        <div className="flex flex-wrap justify-center min-h-[85vh] gap-4 mx-8 my-4">
            {columns.map(col => (<Column key={col} columnName={col} />))}
        </div>
    )
}

export default Board