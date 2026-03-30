import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addTaskSchema } from '../../schemas/addTaskSchema';
import { useAddTask } from '../../hooks/useAddTask';
import { v4 as uuidv4 } from 'uuid';
import type { columnNameType, ITaskType } from '../../types';
import { PRIORITIES } from '../../consts';
import SaveIcon from '@mui/icons-material/Save';
import {
    FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, CircularProgress
} from '@mui/material';
import { memo } from 'react';

interface FormAddTaskProps {
    onSuccessClose?: () => void;
    currentColumn: columnNameType;
}
const FormAddTask = ({ onSuccessClose, currentColumn }: FormAddTaskProps) => {

    /////////////////////// DATA & STATES /////////////////////////////////
    type TaskFormData = z.infer<typeof addTaskSchema>;
    const { mutate, isPending } = useAddTask();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(addTaskSchema),
    });

    /////////////////////// HANDLERS /////////////////////////////////

    const onSubmit = (data: TaskFormData) => {
        const finalTask: ITaskType = {
            ...data,
            id: uuidv4(),
            column: currentColumn
        };
        mutate(finalTask, {
            onSuccess: () => {
                reset();
                if (onSuccessClose) onSuccessClose();
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  border rounded-lg flex flex-col gap-3  p-5 md:p-7">
            <div className='m-0 '>
                <input
                    {...register("title")}
                    placeholder="Task Title"
                    className={`border p-2 w-full h-[50px]  rounded-md ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
            </div>
            <div className='m-0 '>
                <input
                    {...register("description")}
                    placeholder="Task Description"
                    className="border p-2 w-full rounded-md h-[50px] m-0 "
                />
            </div>
            <FormControl fullWidth error={!!errors.priority}>
                <InputLabel sx={{
                    transform: 'translate(12px, 12px) scale(1)',
                    color: 'rgba(0, 0, 0, 0.6)',
                    '&.Mui-focused': {
                        color: 'rgba(0, 0, 0, 0.6)',
                    },
                    '&.MuiInputLabel-shrink': {
                        transform: 'translate(14px, -6px) scale(0.75)',
                        '&.Mui-focused': {
                            color: 'rgba(0, 0, 0, 0.6)',
                        }
                    },
                }}>Priority</InputLabel>
                <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} label="Priority" sx={{
                            height: '50px',
                            borderRadius: '0.375rem',
                            '& .MuiSelect-select': {
                                display: 'flex',
                                textAlign: 'center',
                            },

                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                borderWidth: '1px',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e5e7eb',
                                borderWidth: '1px',
                            },
                        }}>
                            {PRIORITIES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </Select>
                    )}
                />
                {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                className=" bg-blue-600 w-fit !ml-auto"
                startIcon={<SaveIcon />}
            >
                {isPending ? <CircularProgress size={24} color="inherit" /> : 'Save Task'}
            </Button>

        </form>
    )
}

export default memo(FormAddTask)