import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { getTask, deleteTaskById } from '../api/TasksService'; // добавьте deleteTask в API
import Dropdown from 'react-dropdown';
import ErrorFallback from '../components/Error';
import Cookies from "js-cookie";

const TaskChange = ({ handleAction }) => {
    const { id } = useParams();
    const [taskId, setTaskId] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [completeDate, setCompleteDate] = useState('');
    const statusOptions = [
        { value: 'PENDING', label: 'Pending' },
        { value: 'COMPLETED', label: 'Completed' },
    ];
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const { state } = useLocation();
    const { task } = state || {};

    const fetchTask = () => {
        setTitle(task.title);
        setDescription(task.description);
        setSelectedStatus({ label: task.category.name, value: task.category.id });
        setCreateDate(task.createDate);
        setCompleteDate(task.completeDate);
    };

    useEffect(() => {
        if (state) {
            fetchTask();
        }
        if (id) {
            setTaskId(id);
            getTask(id).then(task => {
                setTitle(task.title);
                setDescription(task.description);
                setCreateDate(task.createDate);
                setCompleteDate(task.completeDate);
                setSelectedStatus(statusOptions.find(opt => opt.value === task.status));
            }).catch(err => {
                console.error("Failed to load task:", err);
                setError(err);
            });
        }
    }, [id, state]);

    const navigate = useNavigate();
    console.log("ID:", id);
    console.log("task ID:", taskId);

    const validateForm = () => {
        const newErrors = {};

        if (!title) {
            newErrors.title = 'Task title is required';
            toast.error(newErrors.title);
        } else if (!/^[a-zA-Zа-яА-Я0-9\s]+$/.test(title)) {
            newErrors.title = 'Task title contains invalid characters';
            toast.error(newErrors.title);
        } else if (title.length < 2 || title.length > 20) {
            newErrors.title = 'Task title must be 2-20 characters long';
            toast.error(newErrors.title);
        }

        if (!description) {
            newErrors.description = 'Description is required';
            toast.error(newErrors.description);
        } else if (!/^[a-zA-Zа-яА-Я\d\s-+{}();:?.,/]+$/.test(description)) {
            newErrors.description = 'Description contains invalid characters';
            toast.error(newErrors.description);
        } else if (description.length < 3 || description.length > 255) {
            newErrors.description = 'Description must be 3-255 characters long';
            toast.error(newErrors.description);
        }

        if (!createDate) {
            newErrors.createDate = 'Create date is required';
            toast.error(newErrors.createDate);
        }

        if (!completeDate) {
            newErrors.completeDate = 'Complete date is required';
            toast.error(newErrors.completeDate);
        } else if (createDate && new Date(completeDate) <= new Date(createDate)) {
            newErrors.completeDate = 'Complete date must be later than create date';
            toast.error(newErrors.completeDate);
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onClickAction = async () => {
        if (!validateForm()) {
            console.log('Form not valid');
            return;
        }

        try {
            const storedUser = await JSON.parse(Cookies.get('user'));
            const response = await handleAction({
                id: taskId,
                title: title,
                description: description,
                status: selectedStatus.value,
                createDate: createDate,
                completeDate: completeDate,
                user: {
                    id: storedUser.id,
                    username: storedUser.username,
                    password: storedUser.password
                }
            });
            console.log(response);
            navigate("/tasks");
            toast.success(id? 'Task updated successfully!' : 'Task created successfully!');
        } catch (err) {
            toast.error(id? 'Failed to update the task. Please try again.' : 'Failed to create the task. Please try again.');
            console.log(err.message);
        }
    };

    const onDelete = async () => {
        try {
            await deleteTaskById(taskId);
            navigate("/tasks");
            toast.success('Task deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete the task. Please try again.');
            console.log(err.message);
        }
    };

    if (error) {
        toast.error(error);
        return;
    }

    return (
        <div className='detailsWrapper'>
            <button onClick={() => navigate('/tasks')} className='link back-button'>
                <i className='bi bi-arrow-left'></i> Back to list
            </button>
            <div className='details'>
                <div className='details_info_change'>
                <h1>{id ? "Update Task" : "Create Task"}</h1>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter new title"
                    />
                    <Dropdown
                        className="dropdown"
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={(option) => setSelectedStatus(option)}
                        placeholder="Select status"
                        menuClassName="custom-menu"
                    />

                    <input
                        type="date"
                        value={createDate}
                        onChange={(e) => setCreateDate(e.target.value)}
                        placeholder="Enter create date"
                        className="date-input"
                    />

                    <input
                        type="date"
                        value={completeDate}
                        onChange={(e) => setCompleteDate(e.target.value)}
                        placeholder="Enter complete date"
                        className="date-input"
                    />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter new description"
                        className='details_description'
                    />

                    <button onClick={onClickAction} className='dropdown_wrapper_button saveBtn'>
                        {id ? "Update Task" : "Create Task"}
                    </button>

                    {id && (
                        <button onClick={onDelete} className='dropdown_wrapper_button deleteBtn'>
                            Delete Task
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskChange;
