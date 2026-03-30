import { useRef, type HTMLAttributes } from "react"
import { useDrag } from "react-dnd"
import type { ITaskType } from "../../types"
import { useGetTasks } from "../../hooks/useGetTasks"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import { getStatusClassColor } from "../../utils/taskHelpers"


const Task = ({ id, title, description, priority ,...rest }: ITaskType & HTMLAttributes<HTMLDivElement>) => {

    const ref = useRef<HTMLDivElement>(null);
    const { data } = useGetTasks();
    const actualIndex = data?.map(t => t.id === id)
    const className= getStatusClassColor(priority);
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id, actualIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    drag(ref)

    return (
        <div
            ref={ref}
            {...rest}
            style={{
                opacity: isDragging ? 0 : 1
            }}
            className="rounded-2xl mb-3"
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
                            <Chip label={priority} className={`!font-semibold [&>.MuiChip-label]:!text-[13px] rounded-md! ${className}`}  />
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