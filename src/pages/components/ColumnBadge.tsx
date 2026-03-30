import { memo } from 'react';
import type { columnNameType } from '../../types';
import { getBullColumnColor } from '../../utils/taskHelpers';
import Badge from '@mui/material/Badge';

interface IColBadge {
    colLength: number[];
    columnName: columnNameType
}
const ColumnBadge = ({ columnName, colLength }: IColBadge) => {

    const colorClass = getBullColumnColor(columnName);
    return (
        <div className='flex gap-4 items-center mb-3'>
            <div className={` rounded-full h-3 w-3 !animate-pulse ${colorClass}`}></div>
            <h2 className='text-18 '>{columnName}</h2>
            <Badge badgeContent={colLength} className='ml-3 !text-base' slotProps={{
                badge: {
                    className: "!bg-bg-low !rounded-sm !font-medium"
                }
            }} >
            </Badge>
            
        </div>
    )
}

export default memo(ColumnBadge) 