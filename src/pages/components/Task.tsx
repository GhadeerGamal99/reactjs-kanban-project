import { useDispatch } from "react-redux"
import type { ITaskType } from "../../types"
import type { AppDispatch } from "../../store"
import { useGetTasks } from "../../hooks/useGetTasks"
import { useEffect, useRef } from "react"
import { useDrag } from "react-dnd"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"

interface IDragItem {
    index: number;
    id: string;
    type: string
}
const Task = ({ id, title, description, status }: ITaskType) => {

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

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'HIGH': return '!bg-bg-high !text-text-high';
            case 'LOW': return '!bg-bg-low !text-text-low';
            default: return '!bg-bg-medium !text-text-medium';
        }
    };


    return (
        <div
            ref={ref}
            style={{
                opacity: isDragging ? 0 : 1
            }}
            className="  rounded-2xl mb-3"
        >

            <Card sx={{ Width: 295 }}>
                <CardContent>
                    <Typography gutterBottom className="text-text-primary font-regular text-18" >
                        {title}
                    </Typography>

                    <Typography variant="body2" className="text-text-secondary tex-18">
                        {description}
                    </Typography>
                    <Box className="mt-3">
                        <Stack direction="row" spacing={1} >
                            <Chip label={status} className={`!font-semibold [&>.MuiChip-label]:!text-[13px] rounded-md! ${getStatusClass(status)}`}  />

                        </Stack>
                        <div >
                           
                        </div>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default Task