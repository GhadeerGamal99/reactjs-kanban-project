import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, CircularProgress
} from '@mui/material';
import { taskSchema } from '../../schemas/taskSchema';
import { useAddTask } from '../../hooks/useAddTask';
import type { ITaskType } from '../../types';

import { v4 as uuidv4 } from 'uuid';


const FormAddTask = () => {

    type TaskFormData = z.infer<typeof taskSchema>;

    const { mutate, isPending } = useAddTask();

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
    });

    const onSubmit = (data: TaskFormData) => {
        const finalTask: ITaskType = {
            ...data,
            id: uuidv4()
        };

        mutate(finalTask, {
            onSuccess: () => {
                reset();
            }
        });
    }
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg">

                <div>
                    <input
                        {...register("title")}
                        placeholder="Task Title"
                        className={`border p-2 w-full ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                </div>

                <input
                    {...register("description")}
                    placeholder="Task Description"
                    className="border p-2 w-full"
                />

                <FormControl fullWidth error={!!errors.priority}>
                    <InputLabel>Priority</InputLabel>
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="Priority">
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth error={!!errors.column}>
                    <InputLabel>Status</InputLabel>
                    <Controller
                        name="column"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="column">
                                <MenuItem value="To Do">To Do</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.column && <FormHelperText>{errors.column.message}</FormHelperText>}
                </FormControl>


                <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    className="w-full bg-blue-600"
                >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Save Task'}
                </Button>

            </form>
        )
    }

export default FormAddTask