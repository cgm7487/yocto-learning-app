import modules from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import { useProgress } from '../context/ProgressContext';

export default function Modules() {
  const { getOverallProgress } = useProgress();
  const overall = getOverallProgress(modules);

  return (
    <div className="modules-page">
      <div className="modules-header">
        <h1>Learning Modules</h1>
        <p>
          {overall.completed > 0
            ? `You've completed ${overall.completed} of ${overall.total} lessons. Keep going!`
            : 'Start your Yocto learning journey with the modules below.'}
        </p>
      </div>
      <div className="modules-grid">
        {modules.map((module, index) => (
          <ModuleCard key={module.id} module={module} index={index} />
        ))}
      </div>
    </div>
  );
}
