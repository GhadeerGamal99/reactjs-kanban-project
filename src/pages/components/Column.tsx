import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { useDrop } from 'react-dnd';
import { useDebounce } from 'use-debounce';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useGetTaskByCol } from '../../hooks/useGetTaskByCol';
import { useUpdateTaskColumn } from '../../hooks/useUpdateTaskCol';
import Task from './Task';
import FormAddTask from './FormAddTask';
import FormUpdateTask from './FormUpdateTask';
import ReusableModal from '../../components/common/ReusableModal';
import type { columnNameType, DragItem, ITaskType } from '../../types';
import Button from '@mui/material/Button';
import ColumnBadge from './ColumnBadge';
import AddTaskButton from './AddTaskButton';

interface IColumnProps {
    columnName: columnNameType;
}

const Column = ({ columnName }: IColumnProps) => {

    /////////////////////// DATA & STATES /////////////////////////////////
    const globalSearchQuery = useSelector((state: RootState) => state.search.query);
    const [debouncedSearch] = useDebounce(globalSearchQuery, 500);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTaskByCol(columnName, debouncedSearch);
    const { ref, inView } = useInView();
    const refDrop = useRef<HTMLDivElement>(null);
    ////////modal states
    const [isModalAddTaskOpen, setIsModalAddTaskOpen] = useState(false);
    const [isModalUpdateTaskOpen, setIsModalUpdateTaskOpen] = useState(false);
    const [updateItem, SetUpdateItem] = useState<ITaskType>()
    const [currentColumn, setCurrentColumn] = useState<columnNameType>()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const colLength = useMemo(() => {
        return data?.pages.flatMap(page => page.items) || [0];
    }, [data?.pages]);


    ////////////////////////// HANDLERS /////////////////////////////////
    const handleTaskClick = useCallback((task: ITaskType) => {
        SetUpdateItem(task)
        setIsModalUpdateTaskOpen(true)
    }, []);

    const handleAddTaskClick = useCallback((col:columnNameType) => {
        setCurrentColumn(col);
        setIsModalAddTaskOpen(true);
    }, []);

    //////////drop
    const { mutate: updateTask } = useUpdateTaskColumn();
    const [, drop] = useDrop<DragItem>({
        accept: 'TASK',
        drop: (item) => {
            updateTask({ id: item.id, newColumn: columnName });
        }

    })
    drop(refDrop)


    return (
        <div ref={refDrop} className='flex-col bg-bg-secondary p-5 min-w-[325px] !min-h-full rounded-md'>
            <ColumnBadge colLength={colLength || [0]} columnName={columnName}></ColumnBadge>

            {data?.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                    {page.data.map((task ,index) => (
                        <Task key={task.id} index={index} {...task} onClick={() => handleTaskClick(task)} />
                    ))}
                </div>
            ))}

            <AddTaskButton
                columnName={columnName}
                onClick={()=>handleAddTaskClick(columnName)}
            />

            {/* ////////////////////////////INDICATOR TO INFINITE SCROLL/////////////////////////// */}
            <div ref={ref}>
                {isFetchingNextPage ?
                    <>
                        <Button loading variant="text">
                        </Button><span className="text-text-secondary ml-[-15px]">Loading…</span></> : hasNextPage ? <>
                            <Button loading variant="text">
                            </Button><span className="text-text-secondary ml-[-15px]">Loading…</span></> : ""
                }
            </div>

            {/* ////////////////////////////CRUD MODALs/////////////////////////// */}
            <ReusableModal
                open={isModalAddTaskOpen}
                onClose={() => setIsModalAddTaskOpen(false)}
                title="Create New Task"
                width={500}
            >
                {currentColumn && <FormAddTask onSuccessClose={() => setIsModalAddTaskOpen(false)} currentColumn={currentColumn}></FormAddTask>}

            </ReusableModal>
            <ReusableModal
                open={isModalUpdateTaskOpen}
                onClose={() => setIsModalUpdateTaskOpen(false)}
                title="Edit Task"
                width={500}
            >
                {updateItem && (
                    <FormUpdateTask
                        onSuccessClose={() => setIsModalUpdateTaskOpen(false)}
                        updateItem={updateItem}
                    />
                )}
            </ReusableModal>

        </div>

    )
}

export default memo(Column) 