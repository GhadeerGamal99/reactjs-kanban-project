import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer';
import Button from '@mui/material/Button';
import { useDrop } from 'react-dnd';
import { useGetTaskByCol } from '../../hooks/useGetTaskByCol';
import type { columnNameType } from '../../types';
import Task from './Task';
import { useUpdateTaskColumn } from '../../hooks/useUpdateTaskCol';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useDebounce } from 'use-debounce';

interface IColumnProps{
    columnName:columnNameType;
}
interface DragItem{
    id:string;
    newColumn:columnNameType
}

const Column = ( {columnName}:IColumnProps) => {

    const globalSearchQuery = useSelector((state: RootState) => state.search.query);
    const [debouncedSearch] = useDebounce(globalSearchQuery, 500);
    const { ref, inView } = useInView();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTaskByCol(columnName,debouncedSearch);

    const refDrop=useRef<HTMLDivElement>(null);

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
    return (
        <div ref={refDrop}> 
            <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-800 rounded-full px-8 py-3"
            >
                MUI Button with Tailwind
            </Button>

            {data?.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                    {page.data.map((task) => (
                        <div key={task.id}>
                            <Task id={task.id} title={task.title} description={task.description} column={task.column}/>
                        </div>
                    ))}
                </div>
            ))}

            <div ref={ref}>
                {isFetchingNextPage ?
                    "Loading now....." : hasNextPage ? "loading tasks...." : "It is done "
                }
            </div>

        </div>

    )
}

export default Column