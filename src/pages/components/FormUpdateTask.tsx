import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { taskSchema } from '../../schemas/editeTaskSchema';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import ConfirmDeleteDialog from '../../components/common/ReusableConfirmDeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import type { ITaskType } from '../../types';
import { COLUMNS, PRIORITIES } from '../../consts';
import {
    FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, CircularProgress
} from '@mui/material';

interface FormUpdateTaskProps {
    onSuccessClose?: () => void;
    updateItem: ITaskType;
}


const FormUpdateTask = ({ onSuccessClose, updateItem }: FormUpdateTaskProps) => {
    /////////////////////// DATA & STATES /////////////////////////////////
    type TaskFormData = z.infer<typeof taskSchema>;
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { mutate, isPending } = useUpdateTask();
    const { mutate: mutateDelete } = useDeleteTask();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: updateItem.title,
            description: updateItem.description,
            priority: updateItem.priority,
            column: updateItem.column
        }
    });

    /////////////////////// HANDLERS /////////////////////////////////
    const onSubmit = (data: TaskFormData) => {
        const finalTask: ITaskType = {
            ...data,
            id: updateItem.id
        };
        mutate(finalTask, {
            onSuccess: () => {
                reset();
                if (onSuccessClose) onSuccessClose();
            }
        });
    }
    const onDelete = () => {
        mutateDelete(updateItem.id, {
            onSuccess: () => {
                reset();
                if (onSuccessClose) onSuccessClose();
                setIsConfirmOpen(false);
            }
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border rounded-lg flex flex-col gap-3 p-7">
            <ConfirmDeleteDialog
                open={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={onDelete}
                title="Delete Task"
                description={`Are you sure you want to delete "${updateItem.title}"?`}
            />
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

            <FormControl fullWidth error={!!errors.column}>
                <InputLabel
                    id="status-label"
                    sx={{
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
                    }}
                >
                    Status
                </InputLabel>
                <Controller
                    name="column"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} label="column" sx={{
                            height: '50px',
                            borderRadius: '0.375rem',
                            '& .MuiSelect-select': {
                                display: 'flex',
                                textAlign: 'center',
                            },

                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e5e7eb',
                                borderWidth: '1px',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                borderWidth: '1px',
                            },
                        }}>
                            {COLUMNS.map(col => <MenuItem key={col} value={col}>{col}</MenuItem>)}

                        </Select>
                    )}
                />
                {errors.column && <FormHelperText>{errors.column.message}</FormHelperText>}
            </FormControl>

            <div className='!ml-auto flex gap-3'>

                <Button
                    type="button"
                    variant="contained"
                    disabled={isPending}
                    className=" w-fit"
                    color="error" startIcon={<DeleteIcon />}
                    onClick={() => setIsConfirmOpen(true)}
                >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    className=" bg-blue-600 w-fit"
                    color="info" startIcon={<EditIcon />}
                >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Edit'}
                </Button>
                <Button
                    type="reset"
                    variant="outlined"
                    disabled={isPending}
                    className=" bg-gray-300 w-fit"
                    color="inherit" startIcon={<CloseIcon />}
                    onClick={() => onSuccessClose && onSuccessClose()}
                >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Cancel'}
                </Button>
            </div>
        </form>
    )
}

export default FormUpdateTask