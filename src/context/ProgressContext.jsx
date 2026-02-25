import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const STORAGE_KEY = 'yocto-learning-progress';

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (moduleId, lessonId) => {
    setProgress((prev) => ({
      ...prev,
      [`${moduleId}/${lessonId}`]: {
        completed: true,
        completedAt: new Date().toISOString(),
      },
    }));
  };

  const saveQuizScore = (moduleId, lessonId, score, total) => {
    setProgress((prev) => ({
      ...prev,
      [`${moduleId}/${lessonId}/quiz`]: {
        score,
        total,
        completedAt: new Date().toISOString(),
      },
    }));
  };

  const isLessonComplete = (moduleId, lessonId) => {
    return !!progress[`${moduleId}/${lessonId}`]?.completed;
  };

  const getQuizScore = (moduleId, lessonId) => {
    return progress[`${moduleId}/${lessonId}/quiz`] || null;
  };

  const getModuleProgress = (module) => {
    const total = module.lessons.length;
    const completed = module.lessons.filter((l) =>
      isLessonComplete(module.id, l.id)
    ).length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const getOverallProgress = (modules) => {
    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = modules.reduce(
      (sum, m) =>
        sum + m.lessons.filter((l) => isLessonComplete(m.id, l.id)).length,
      0
    );
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    };
  };

  const resetProgress = () => {
    setProgress({});
  };

  return (
    <ProgressContext.Provider
      value={{
        markLessonComplete,
        saveQuizScore,
        isLessonComplete,
        getQuizScore,
        getModuleProgress,
        getOverallProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
