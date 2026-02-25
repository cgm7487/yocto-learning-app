import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from './ProgressBar';

export default function ModuleCard({ module, index }) {
  const { getModuleProgress } = useProgress();
  const progress = getModuleProgress(module);

  return (
    <Link to={`/modules/${module.id}`} className="module-card">
      <div className="module-card-header">
        <span className="module-card-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="module-card-icon">{module.icon}</span>
      </div>
      <h3 className="module-card-title">{module.title}</h3>
      <p className="module-card-description">{module.description}</p>
      <div className="module-card-footer">
        <span className="module-card-lessons">
          {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
        </span>
        <ProgressBar percentage={progress.percentage} size="sm" />
      </div>
    </Link>
  );
}
