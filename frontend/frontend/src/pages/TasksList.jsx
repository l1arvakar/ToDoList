import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getTasksByUser } from '../api/TasksService';
import { useNavigate } from 'react-router-dom';
import ErrorFallback from '../components/Error';

const TaskList = ({ currentPage, isLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();
  
  const handleCreateTask = () => {
    navigate('/tasks/add');
  };

  const getTasks = async () => {
    try {
      const response = await getTasksByUser();
      setTasks(response);
      setFilteredTasks(response);
      toast.success('Tasks loaded successfully!');
    } catch (error) {
      toast.error('Failed to load tasks. Please try again.');
      setError(error);
    }
  };

  const sortTasks = (tasks, sortOrder) => {
    const sortedTasks = [...tasks];

    // Сортировка по дате создания
    if (sortOrder === 'createAsc') {
      return sortedTasks.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
    }
    if (sortOrder === 'createDesc') {
      return sortedTasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    }
  
    // Сортировка по дате завершения
    if (sortOrder === 'completeAsc') {
      return sortedTasks.sort((a, b) => new Date(a.completeDate) - new Date(b.completeDate));
    }
    if (sortOrder === 'completeDesc') {
      return sortedTasks.sort((a, b) => new Date(b.completeDate) - new Date(a.completeDate));
    }
  
    return sortedTasks;
  };

  useEffect(() => {
    let filtered = tasks;

    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (dateFilter) {
      console.log(dateFilter);
      filtered = filtered.filter(task => task.completeDate === dateFilter);
    }

    if (titleFilter) {
      filtered = filtered.filter(task => task.title.toLowerCase().includes(titleFilter.toLowerCase()));
    }

    filtered = sortTasks(filtered, sortOrder);
    setFilteredTasks(filtered);
  }, [statusFilter, dateFilter, titleFilter, sortOrder, tasks]);

  useEffect(() => {
    getTasks();
  }, []); 

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <main className='main'>
        <div className="dropdown_wrapper">
          <button onClick={handleCreateTask} className='dropdown_wrapper_button bigBtn'>
            Add new task
          </button>
        </div>

        <div className="filters">
          <div>Filters</div>
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <input
            type="date"
            onChange={(e) => setDateFilter(e.target.value)}
            value={dateFilter}
          />

          <input
            type="text"
            placeholder="Search by title"
            onChange={(e) => setTitleFilter(e.target.value)}
            value={titleFilter}
          />

          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="">Without sort</option>
            <option value="createAsc">Create Date (Asc)</option>
            <option value="createDesc">Create Date (Desc)</option>
            <option value="completeAsc">Complete Date (Asc)</option>
            <option value="completeDesc">Complete Date (Desc)</option>
          </select>
        </div>

      {filteredTasks?.length === 0 && <div>No Tasks</div>}

      <div className='task_table'>
        <div className='task_table_header'>
          <div className='task_table_cell'>Title</div>
          <div className='task_table_cell'>Description</div>
          <div className='task_table_cell'>Status</div>
          <div className='task_table_cell'>Create Date</div>
          <div className='task_table_cell'>Complete Date</div>
        </div>

        {filteredTasks?.length > 0 && filteredTasks.map((task) => (
          <Link to={`/tasks/${task.id}`} key={task.id} className="task_table_row">
            <div className="task_table_cell">{task.title}</div>
            <div className="task_table_cell task_item_description">{task.description}</div>
            <div className="task_table_cell">{task.status}</div>
            <div className="task_table_cell">{task.createDate}</div>
            <div className="task_table_cell">{task.completeDate}</div>
          </Link>
        ))}
      </div>

      {filteredTasks?.length > 0 && filteredTasks?.totalPages > 1 && (
        <div className='pagination'>
          <a onClick={() => getTasks(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>
            &laquo;
          </a>
          <a>{currentPage}</a>
          <a onClick={() => getTasks(currentPage + 1)} className={filteredTasks.totalPages === currentPage + 1 ? 'disabled' : ''}>
            &raquo;
          </a>
        </div>
      )}
    </main>
  );
};

export default TaskList;
