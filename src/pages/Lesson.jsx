import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import modules from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import Quiz from '../components/Quiz';

function MarkdownRenderer({ content }) {
  // Simple markdown-to-HTML renderer for learning content
  const renderMarkdown = (md) => {
    let html = md;

    // Extract code blocks into placeholders to protect them from further processing
    const codeBlocks = [];
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const placeholder = `\x00CODEBLOCK_${codeBlocks.length}\x00`;
      codeBlocks.push(
        `<pre><code class="lang-${lang}">${code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</code></pre>`
      );
      return placeholder;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Tables
    html = html.replace(
      /\n\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g,
      (_, header, body) => {
        const headers = header
          .split('|')
          .map((h) => h.trim())
          .filter(Boolean);
        const rows = body
          .trim()
          .split('\n')
          .map((row) =>
            row
              .split('|')
              .map((c) => c.trim())
              .filter(Boolean)
          );
        return `<div class="table-wrapper"><table>
          <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows
            .map(
              (row) =>
                `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`
            )
            .join('')}</tbody>
        </table></div>`;
      }
    );

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Lists
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ol-item">$2</li>');
    html = html.replace(
      /(<li class="ol-item">.*<\/li>\n?)+/g,
      '<ol>$&</ol>'
    );
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(
      /(<li>(?!<li class).*<\/li>\n?)+/g,
      (match) => {
        if (!match.includes('class="ol-item"')) {
          return `<ul>${match}</ul>`;
        }
        return match;
      }
    );

    // Paragraphs (lines not already wrapped in tags)
    html = html
      .split('\n\n')
      .map((block) => {
        block = block.trim();
        if (
          !block ||
          block.startsWith('<h') ||
          block.startsWith('<pre') ||
          block.startsWith('<ul') ||
          block.startsWith('<ol') ||
          block.startsWith('<div') ||
          block.startsWith('<table') ||
          block.startsWith('\x00CODEBLOCK_')
        ) {
          return block;
        }
        return `<p>${block}</p>`;
      })
      .join('\n');

    // Restore code blocks from placeholders
    codeBlocks.forEach((block, i) => {
      html = html.replace(`\x00CODEBLOCK_${i}\x00`, block);
    });

    return html;
  };

  return (
    <div
      className="lesson-content-rendered"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}

export default function Lesson() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { markLessonComplete, saveQuizScore, isLessonComplete } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);

  const module = modules.find((m) => m.id === moduleId);
  const lessonIndex = module?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = module?.lessons[lessonIndex];

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setShowQuiz(false);
  }, [moduleId, lessonId]);

  if (!module || !lesson) {
    return (
      <div className="not-found">
        <h1>Lesson Not Found</h1>
        <Link to="/modules" className="btn btn-primary">
          Back to Modules
        </Link>
      </div>
    );
  }

  const completed = isLessonComplete(moduleId, lessonId);

  // Find next and previous lessons (across modules)
  const allLessons = modules.flatMap((m) =>
    m.lessons.map((l) => ({ moduleId: m.id, lessonId: l.id, title: l.title, moduleTitle: m.title }))
  );
  const currentGlobalIndex = allLessons.findIndex(
    (l) => l.moduleId === moduleId && l.lessonId === lessonId
  );
  const prevLesson = currentGlobalIndex > 0 ? allLessons[currentGlobalIndex - 1] : null;
  const nextLesson =
    currentGlobalIndex < allLessons.length - 1 ? allLessons[currentGlobalIndex + 1] : null;

  const handleQuizComplete = (score, total) => {
    saveQuizScore(moduleId, lessonId, score, total);
    markLessonComplete(moduleId, lessonId);
  };

  const handleMarkComplete = () => {
    markLessonComplete(moduleId, lessonId);
  };

  return (
    <div className="lesson-page">
      <div className="lesson-sidebar">
        <Link to={`/modules/${moduleId}`} className="back-link">
          {'\u2190'} {module.title}
        </Link>
        <nav className="lesson-nav">
          {module.lessons.map((l, i) => (
            <Link
              key={l.id}
              to={`/lesson/${moduleId}/${l.id}`}
              className={`lesson-nav-item ${l.id === lessonId ? 'active' : ''} ${
                isLessonComplete(moduleId, l.id) ? 'completed' : ''
              }`}
            >
              <span className="lesson-nav-number">
                {isLessonComplete(moduleId, l.id) ? '\u2713' : i + 1}
              </span>
              <span className="lesson-nav-title">{l.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="lesson-main">
        <div className="lesson-breadcrumb">
          <Link to="/modules">Modules</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/modules/${moduleId}`}>{module.title}</Link>
          <span className="breadcrumb-sep">/</span>
          <span>{lesson.title}</span>
        </div>

        <article className="lesson-content">
          <MarkdownRenderer content={lesson.content} />
        </article>

        {lesson.quiz && lesson.quiz.length > 0 && (
          <section className="lesson-quiz-section">
            {!showQuiz ? (
              <div className="quiz-prompt">
                <h3>Test Your Knowledge</h3>
                <p>
                  Take a short quiz to check your understanding of this lesson.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowQuiz(true)}
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              <Quiz questions={lesson.quiz} onComplete={handleQuizComplete} />
            )}
          </section>
        )}

        {!completed && !lesson.quiz && (
          <div className="lesson-complete-section">
            <button className="btn btn-primary" onClick={handleMarkComplete}>
              Mark as Complete
            </button>
          </div>
        )}

        {completed && (
          <div className="lesson-completed-banner">
            <span>{'\u2713'}</span> Lesson completed!
          </div>
        )}

        <nav className="lesson-footer-nav">
          {prevLesson && (
            <Link
              to={`/lesson/${prevLesson.moduleId}/${prevLesson.lessonId}`}
              className="btn btn-secondary"
            >
              {'\u2190'} {prevLesson.title}
            </Link>
          )}
          <div className="lesson-footer-spacer" />
          {nextLesson && (
            <Link
              to={`/lesson/${nextLesson.moduleId}/${nextLesson.lessonId}`}
              className="btn btn-primary"
            >
              {nextLesson.title} {'\u2192'}
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
