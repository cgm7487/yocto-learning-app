import { useState } from 'react';
import { Link } from 'react-router-dom';
import exercises from '../data/exercises';
import RecipeEditor from '../components/RecipeEditor';

export default function Sandbox() {
  const [selectedId, setSelectedId] = useState(exercises[0].id);
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('yocto-sandbox-completed') || '[]');
    } catch {
      return [];
    }
  });

  const selectedExercise = exercises.find((e) => e.id === selectedId);

  const handleComplete = (exerciseId) => {
    if (!completed.includes(exerciseId)) {
      const next = [...completed, exerciseId];
      setCompleted(next);
      localStorage.setItem('yocto-sandbox-completed', JSON.stringify(next));
    }
  };

  const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };

  return (
    <div className="sandbox-page">
      <div className="sandbox-sidebar">
        <Link to="/modules" className="back-link">
          {'\u2190'} Back to Modules
        </Link>
        <h2 className="sandbox-sidebar-title">Exercises</h2>
        <nav className="sandbox-nav">
          {exercises
            .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
            .map((ex) => (
              <button
                key={ex.id}
                className={`sandbox-nav-item ${ex.id === selectedId ? 'active' : ''} ${
                  completed.includes(ex.id) ? 'completed' : ''
                }`}
                onClick={() => setSelectedId(ex.id)}
              >
                <span className="sandbox-nav-status">
                  {completed.includes(ex.id) ? '\u2713' : '\u25CB'}
                </span>
                <span className="sandbox-nav-content">
                  <span className="sandbox-nav-title">{ex.title}</span>
                  <span className={`sandbox-nav-difficulty difficulty-${ex.difficulty}`}>
                    {ex.difficulty}
                  </span>
                </span>
              </button>
            ))}
        </nav>
        <div className="sandbox-progress-summary">
          {completed.length}/{exercises.length} completed
        </div>
      </div>
      <div className="sandbox-main">
        {selectedExercise && (
          <RecipeEditor exercise={selectedExercise} onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}
