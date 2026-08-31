import React from 'react';

/**
 * DenseDataContainer Component
 * Compact high-density data wrapper for real-time telemetry, KPIs, matrices,
 * and structured tables featuring crisp 1px borders and strict grid alignment.
 */
export const DenseDataContainer = ({
  children,
  title,
  subtitle,
  badge,
  action,
  border = true,
  dense = false,
  className = '',
  style = {},
}) => {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        borderRadius: '16px',
        border: border ? '1px solid var(--border-medium)' : 'none',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        width: '100%',
        ...style,
      }}
      className={`dense-data-container ${className}`}
    >
      {/* Container Header */}
      {(title || subtitle || badge || action) && (
        <div
          style={{
            padding: dense ? '12px 18px' : '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>
              {title && (
                <div
                  style={{
                    fontSize: dense ? '13px' : '14.5px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>{title}</span>
                  {badge && (
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--accent-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              )}
              {subtitle && (
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                  }}
                >
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      {/* Main Dense Grid Content */}
      <div style={{ padding: dense ? '10px' : '16px' }}>{children}</div>
    </div>
  );
};

/**
 * MetricTile - Subcomponent for high-impact metric display in strict grid
 */
export const MetricTile = ({
  label,
  value,
  trend,
  trendDirection = 'up', // 'up' | 'down' | 'neutral'
  change,
  sublabel,
  icon,
  borderRight = true,
  borderBottom = false,
  highlight = false,
}) => {
  const trendColor =
    trendDirection === 'up'
      ? 'var(--accent-emerald)'
      : trendDirection === 'down'
      ? 'var(--accent-rose)'
      : 'var(--text-muted)';

  return (
    <div
      style={{
        padding: '16px 20px',
        borderRight: borderRight ? '1px solid var(--border-subtle)' : 'none',
        borderBottom: borderBottom ? '1px solid var(--border-subtle)' : 'none',
        background: highlight ? 'var(--bg-surface-subtle)' : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxSizing: 'border-box',
      }}
      className="metric-tile"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </span>
        {icon && <span style={{ color: 'var(--accent-primary)', opacity: 0.85 }}>{icon}</span>}
      </div>

      <div>
        <div
          style={{
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
          }}
          className="tabular-nums"
        >
          {value}
        </div>

        {(change || trend || sublabel) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '8px',
              fontSize: '12px',
            }}
          >
            {change && (
              <span
                style={{
                  fontWeight: 700,
                  color: trendColor,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                {trendDirection === 'up' && '▲ '}
                {trendDirection === 'down' && '▼ '}
                {change}
              </span>
            )}
            {sublabel && <span style={{ color: 'var(--text-muted)' }}>{sublabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * DenseTable - Subcomponent for high-density 1px border tabular datasets
 */
export const DenseTable = ({ headers = [], rows = [], compact = false }) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: compact ? '12px' : '13.5px',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-medium)' }}>
            {headers.map((head, idx) => (
              <th
                key={idx}
                style={{
                  padding: compact ? '8px 12px' : '12px 16px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '11px',
                  background: 'var(--bg-surface-subtle)',
                  whiteSpace: 'nowrap',
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-surface-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  style={{
                    padding: compact ? '8px 12px' : '12px 16px',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                  }}
                  className={typeof cell === 'number' || !isNaN(Number(cell)) ? 'tabular-nums' : ''}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DenseDataContainer;
