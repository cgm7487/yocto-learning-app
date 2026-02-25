import { useParams, Link } from 'react-router-dom';
import modules from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from '../components/ProgressBar';

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const { isLessonComplete, getQuizScore, getModuleProgress } = useProgress();

  const module = modules.find((m) => m.id === moduleId);
  const moduleIndex = modules.findIndex((m) => m.id === moduleId);

  if (!module) {
    return (
      <div className="not-found">
        <h1>Module Not Found</h1>
        <Link to="/modules" className="btn btn-primary">
          Back to Modules
        </Link>
      </div>
    );
  }

  const progress = getModuleProgress(module);
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  return (
    <div className="module-detail">
      <div className="module-detail-header">
        <Link to="/modules" className="back-link">
          {'\u2190'} All Modules
        </Link>
        <div className="module-detail-title-row">
          <span className="module-detail-icon">{module.icon}</span>
          <div>
            <h1>{module.title}</h1>
            <p>{module.description}</p>
          </div>
        </div>
        <ProgressBar
          percentage={progress.percentage}
          size="md"
          label={`${progress.completed} of ${progress.total} lessons completed`}
        />
      </div>

      <div className="lessons-list">
        {module.lessons.map((lesson, index) => {
          const completed = isLessonComplete(module.id, lesson.id);
          const quizScore = getQuizScore(module.id, lesson.id);

          return (
            <Link
              key={lesson.id}
              to={`/lesson/${module.id}/${lesson.id}`}
              className={`lesson-item ${completed ? 'completed' : ''}`}
            >
              <div className="lesson-item-status">
                {completed ? (
                  <span className="lesson-check">{'\u2713'}</span>
                ) : (
                  <span className="lesson-number">{index + 1}</span>
                )}
              </div>
              <div className="lesson-item-content">
                <h3>{lesson.title}</h3>
                <div className="lesson-item-meta">
                  {lesson.quiz && (
                    <span className="lesson-meta-badge">
                      {lesson.quiz.length} quiz questions
                    </span>
                  )}
                  {quizScore && (
                    <span className="lesson-meta-score">
                      Score: {quizScore.score}/{quizScore.total}
                    </span>
                  )}
                </div>
              </div>
              <span className="lesson-item-arrow">{'\u2192'}</span>
            </Link>
          );
        })}
      </div>

      <div className="module-navigation">
        {prevModule && (
          <Link to={`/modules/${prevModule.id}`} className="btn btn-secondary">
            {'\u2190'} {prevModule.title}
          </Link>
        )}
        {nextModule && (
          <Link to={`/modules/${nextModule.id}`} className="btn btn-primary">
            {nextModule.title} {'\u2192'}
          </Link>
        )}
      </div>
    </div>
  );
}
