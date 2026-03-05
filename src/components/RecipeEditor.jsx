import { useState, useRef, useEffect } from 'react';

function LineNumbers({ count }) {
  return (
    <div className="editor-line-numbers" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i + 1} className="editor-line-number">
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function ValidationResults({ results }) {
  if (!results) return null;
  const passed = results.filter((r) => r.passed);
  const failed = results.filter((r) => !r.passed);

  return (
    <div className="validation-results">
      <div className="validation-header">
        <span className="validation-title">Validation Results</span>
        <span className="validation-score">
          {passed.length}/{results.length} checks passed
        </span>
      </div>
      <div className="validation-list">
        {results.map((result, i) => (
          <div
            key={i}
            className={`validation-item ${result.passed ? 'passed' : 'failed'}`}
          >
            <span className="validation-icon">
              {result.passed ? '\u2713' : '\u2717'}
            </span>
            <div className="validation-detail">
              <span className="validation-message">{result.message}</span>
              {!result.passed && result.hint && (
                <span className="validation-hint">{result.hint}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {passed.length === results.length && (
        <div className="validation-success">
          All checks passed! Great job!
        </div>
      )}
    </div>
  );
}

export default function RecipeEditor({ exercise, onComplete }) {
  const [code, setCode] = useState(exercise.starterCode);
  const [results, setResults] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    setCode(exercise.starterCode);
    setResults(null);
    setShowSolution(false);
  }, [exercise.id]);

  const lineCount = code.split('\n').length;

  const handleValidate = () => {
    const validationResults = exercise.validations.map((v) => {
      const passed = v.value.test(code);
      return { passed, message: v.message, hint: v.hint };
    });
    setResults(validationResults);

    if (validationResults.every((r) => r.passed) && onComplete) {
      onComplete(exercise.id);
    }
  };

  const handleReset = () => {
    setCode(exercise.starterCode);
    setResults(null);
    setShowSolution(false);
  };

  const handleShowSolution = () => {
    setShowSolution((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newCode =
        code.substring(0, selectionStart) + '    ' + code.substring(selectionEnd);
      setCode(newCode);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 4;
      });
    }
  };

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const difficultyLabel = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <div className="recipe-editor">
      <div className="editor-header">
        <div className="editor-title-row">
          <h2>{exercise.title}</h2>
          <span className={`difficulty-badge difficulty-${exercise.difficulty}`}>
            {difficultyLabel[exercise.difficulty]}
          </span>
        </div>
        <p className="editor-description">{exercise.description}</p>
      </div>

      <div className="editor-instructions">
        <h3>Instructions</h3>
        <ol>
          {exercise.instructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ol>
      </div>

      <div className="editor-workspace">
        <div className="editor-toolbar">
          <span className="editor-filename">recipe.bb</span>
          <div className="editor-toolbar-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        <div className="editor-container">
          <div className="editor-line-numbers" ref={lineNumbersRef}>
            <LineNumbers count={lineCount} />
          </div>
          <textarea
            ref={textareaRef}
            className="editor-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>

      <div className="editor-actions">
        <button className="btn btn-primary" onClick={handleValidate}>
          Validate Recipe
        </button>
        <button className="btn btn-secondary" onClick={handleShowSolution}>
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
      </div>

      <ValidationResults results={results} />

      {showSolution && (
        <div className="editor-solution">
          <h3>Reference Solution</h3>
          <pre>
            <code>{exercise.solutionCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
