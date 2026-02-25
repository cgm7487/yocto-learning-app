export default function ProgressBar({ percentage, size = 'md', label }) {
  return (
    <div className={`progress-bar-container progress-bar-${size}`}>
      {label && <span className="progress-bar-label">{label}</span>}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-bar-value">{percentage}%</span>
    </div>
  );
}
