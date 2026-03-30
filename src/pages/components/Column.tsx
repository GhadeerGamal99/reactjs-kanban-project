import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import Button from '@mui/material/Button';
import { useDrop } from 'react-dnd';
import { useGetTaskByCol } from '../../hooks/useGetTaskByCol';
import type { columnNameType, taskPeriorityType } from '../../types';
import Task from './Task';
import { useUpdateTaskColumn } from '../../hooks/useUpdateTaskCol';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useDebounce } from 'use-debounce';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import ReusableModal from '../../components/common/ReusableModal';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import FormAddTask from './FormAddTask';

interface IColumnProps {
    columnName: columnNameType;
}
interface DragItem {
    id: string;
    newColumn: columnNameType
}

const Column = ({ columnName }: IColumnProps) => {

    const globalSearchQuery = useSelector((state: RootState) => state.search.query);
    const [debouncedSearch] = useDebounce(globalSearchQuery, 500);
    const { ref, inView } = useInView();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTaskByCol(columnName, debouncedSearch);
    const colLength = data?.pages.map(page => page.items)
    const refDrop = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // ////////drop
    const { mutate: updateTask } = useUpdateTaskColumn();
    const [, drop] = useDrop<DragItem>({
        accept: 'TASK',
        drop: (item) => {
            updateTask({ id: item.id, newColumn: columnName });
        }

    })
    drop(refDrop)
    ////////modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [periority, setPeriority] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPeriority(event.target.value as string);
    };
    const periorityArr: taskPeriorityType[] = ['HIGH', 'LOW', 'MEDIUM']
    const columns: columnNameType[] = ['backlog', 'in_progress', 'review', 'done']
    /////////
    const getBullColumnColor = (columnName: columnNameType) => {
        switch (columnName) {
            case 'review': return '!bg-bg-inReview ';
            case 'backlog': return '!bg-bg-toDo ';
            case 'in_progress': return '!bg-bg-inProgress';
            default: return '!bg-bg-done ';
        }
    };
    return (
        <div ref={refDrop} className='flex-col bg-bg-secondary p-5 min-w-[325px] !min-h-full rounded-md'>
            <div className='flex gap-4 items-center mb-3'>
                <div className={` rounded-full h-3 w-3 ${getBullColumnColor(columnName)}`}></div>
                <h2 className='text-18'>{columnName}</h2>
                <Badge badgeContent={colLength} className='ml-3 !text-base' slotProps={{
                    badge: {
                        className: "!bg-bg-low !rounded-sm !font-medium "
                    }
                }} >

                </Badge>
            </div>


            {data?.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                    {page.data.map((task) => (
                        <div key={task.id}>
                            <Task id={task.id} priority={task.priority} title={task.title} description={task.description} column={task.column} />
                        </div>
                    ))}
                </div>
            ))}

            <div ref={ref}>
                {isFetchingNextPage ?
                    <>
                        <Button loading variant="text">
                        </Button><span className="text-text-secondary ml-[-15px]">Loading…</span></> : hasNextPage ? <>
                            <Button loading variant="text">
                            </Button><span className="text-text-secondary ml-[-15px]">Loading…</span></> : ""
                }
            </div>
            <Stack direction="row" spacing={2}>
                <Button
                    fullWidth
                    sx={{
                        color: 'var(--text-secondary)',
                        border: '1px dashed',
                        borderColor: 'var(--border-primary)',
                        backgroundColor: '#ffffff00',
                        '&:hover': {
                            backgroundColor: 'var(--bg-low)',
                        }
                    }}
                    startIcon={<AddIcon />}
                    variant="outlined"

                    // className='text-text-secondary! !border border-border-primary! !bg-bg-done hover:!bg-bg-primary border-dashed!'
                    className='!m-0'
                    onClick={() => setIsModalOpen(true)}
                >
                    Add task
                </Button>
            </Stack>

            <ReusableModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Task"
                width={500}
            >
                <FormAddTask></FormAddTask>
            </ReusableModal>
        </div>

    )
}

export default Column