import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { columnNameType } from '../../types';
import { memo } from 'react';


interface AddTaskButtonProps {
    columnName: columnNameType;
    onClick: (name: columnNameType) => void;
}

const AddTaskButton = ({ columnName, onClick }: AddTaskButtonProps) => {
    return (
        <Stack direction="row" spacing={2}>
            <Button
                fullWidth
                sx={{
                    color: 'var(--text-secondary)',
                    border: '1px dashed',
                    borderColor: 'var(--border-primary)',
                    backgroundColor: '#ffffff00',
                    textTransform: 'none',
                    height:'40px',
                    '&:hover': {
                        backgroundColor: 'var(--bg-low)',
                        borderColor: 'var(--border-primary)',
                    }
                }}
                startIcon={<AddIcon />}
                variant="outlined"
                className='!m-0'
                onClick={() => onClick(columnName)}
            >
                Add task
            </Button>
        </Stack>
    );
};

export default memo(AddTaskButton) ;