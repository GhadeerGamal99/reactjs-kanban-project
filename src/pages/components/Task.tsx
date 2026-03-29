import { useDispatch } from "react-redux"
import type { ITaskType } from "../../types"
import type { AppDispatch } from "../../store"
import { useGetTasks } from "../../hooks/useGetTasks"
import { useEffect, useRef } from "react"
import { useDrag } from "react-dnd"

interface IDragItem {
    index: number;
    id: string;
    type: string
}
const Task = ({ id, description }: ITaskType) => {

    const dispatch = useDispatch<AppDispatch>()
    const { data } = useGetTasks();
    useEffect(() => {
    }, [data, dispatch])

        const actualIndex = data?.map(t => t.id === id)
    
    const ref = useRef<HTMLDivElement>(null);

    // const [, drop] = useDrop<IDragItem, void, { isOver: boolean }>({
    //     accept: 'TASK',
    //     hover: (item: IDragItem, monitor: DropTargetMonitor) => {
    //         if (!ref.current) return
    //         const dragIndex = item.index;
    //         const hoverIndex = actualIndex
    //         if (dragIndex === hoverIndex) return;

    //         dispatch(reorderTasks({ dragIndex, hoverIndex }))
    //         item.index = hoverIndex
    //     }

    // })
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id, actualIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    drag(ref)
    // drag(drop(ref))
    return (
        <div

            ref={ref}
            style={{
                opacity: isDragging ? 0 : 1
            }}
            className="bg-blue-400 p-5 rounded-2xl mb-2"
        >

            {description}
            </div>
    )
}

export default Task