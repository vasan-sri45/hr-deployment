import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import TaskTable from './Tasktable';
import { ArrowLeft } from 'lucide-react';
import { fetchTableEntries } from '../../../store/slices/table/tableSlice';

const safeDecode = (val) => {
  try { return typeof val === 'string' ? decodeURIComponent(val) : ''; }
  catch { return String(val || ''); }
};
const norm = (s) => (s || '').toString().trim().toLowerCase();

const TaskTablePage = () => {
  const { heading: encodedHeading } = useParams();
  const heading = safeDecode(encodedHeading);

  const dispatch = useDispatch();
  const { entries, status, error } = useSelector((state) => state.table);
  const list = Array.isArray(entries) ? entries : [];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTableEntries());
    }
  }, [status, dispatch]);

  const tasksForHeading = useMemo(() => {
    const target = norm(heading || 'Uncategorized');
    return list.filter(task => norm(task.heading || 'Uncategorized') === target);
  }, [list, heading]);

  if (status === 'loading') {
    return <div className="text-center p-10 font-semibold">Loading tasks...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Link to="/table" className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-6 hover:underline">
        <ArrowLeft size={16} />
        Back to All Groups
      </Link>

      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Tasks for: <span className="text-blue-600">{heading || 'Uncategorized'}</span>
      </h1>

      <TaskTable tasks={tasksForHeading} />
    </div>
  );
};

export default TaskTablePage;
