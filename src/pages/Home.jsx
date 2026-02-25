import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import modules from '../data/modules';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const { getOverallProgress, getModuleProgress, isLessonComplete } = useProgress();
  const overall = getOverallProgress(modules);

  // Find the next incomplete lesson
  let nextLesson = null;
  for (const module of modules) {
    for (const lesson of module.lessons) {
      if (!isLessonComplete(module.id, lesson.id)) {
        nextLesson = { module, lesson };
        break;
      }
    }
    if (nextLesson) break;
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn the <span className="highlight">Yocto Project</span>
          </h1>
          <p className="hero-subtitle">
            Master embedded Linux development with interactive lessons, hands-on
            examples, and quizzes. From fundamentals to advanced topics.
          </p>
          <div className="hero-actions">
            {nextLesson ? (
              <Link
                to={`/lesson/${nextLesson.module.id}/${nextLesson.lesson.id}`}
                className="btn btn-primary btn-lg"
              >
                {overall.completed > 0 ? 'Continue Learning' : 'Start Learning'}
              </Link>
            ) : (
              <Link to="/modules" className="btn btn-primary btn-lg">
                Review Modules
              </Link>
            )}
            <Link to="/modules" className="btn btn-secondary btn-lg">
              View All Modules
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-value">{modules.length}</span>
            <span className="stat-label">Modules</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {modules.reduce((sum, m) => sum + m.lessons.length, 0)}
            </span>
            <span className="stat-label">Lessons</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {modules.reduce(
                (sum, m) =>
                  sum + m.lessons.reduce((s, l) => s + (l.quiz?.length || 0), 0),
                0
              )}
            </span>
            <span className="stat-label">Quiz Questions</span>
          </div>
        </div>
      </section>

      {overall.completed > 0 && (
        <section className="progress-section">
          <h2>Your Progress</h2>
          <ProgressBar
            percentage={overall.percentage}
            size="lg"
            label={`${overall.completed} of ${overall.total} lessons completed`}
          />
        </section>
      )}

      <section className="modules-preview">
        <h2>Learning Path</h2>
        <div className="path-list">
          {modules.map((module, index) => {
            const progress = getModuleProgress(module);
            return (
              <Link
                key={module.id}
                to={`/modules/${module.id}`}
                className="path-item"
              >
                <div className="path-item-number">
                  {progress.percentage === 100 ? (
                    <span className="path-check">{'\u2713'}</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="path-item-content">
                  <h3>
                    {module.icon} {module.title}
                  </h3>
                  <p>{module.description}</p>
                </div>
                <div className="path-item-progress">
                  <ProgressBar percentage={progress.percentage} size="sm" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
