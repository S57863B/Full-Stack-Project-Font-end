const PATHS = {
  circle: 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0',
  halfcircle: 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 4a8 8 0 0 1 0 16z',
  checkcircle: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M8.5 12l2.5 2.5 4.5-5',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  calendar: 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
  clock: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3.5 2',
  check: 'M20 6 9 17l-5-5',
  plus: 'M12 5v14M5 12h14',
  plussm: 'M12 6v12M6 12h12',
  x: 'M18 6 6 18M6 6l12 12',
  chevd: 'M6 9l6 6 6-6',
  trash: 'M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6',
  edit: 'M4 20h4L19 9a2 2 0 0 0-3-3L5 17v3zM14 7l3 3',
  hash: 'M9 4 7 20M17 4l-2 16M5 9h14M4 15h14',
  zap: 'M13 3 4 14h7l-1 7 9-11h-7z',
  target: 'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 12m-4.5 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0-9 0M12 12h.01',
  book: 'M5 4a1 1 0 0 1 1-1h13v16H6a1 1 0 0 0-1 1V4zM5 20a1 1 0 0 1 1-1h13',
  activity: 'M3 12h4l3-8 4 16 3-8h4',
  star: 'M12 4l2.4 5 5.6.7-4 3.8 1 5.5-5-2.8-5 2.8 1-5.5-4-3.8 5.6-.7z',
};

export default function Icon({ name, size = 16, sw = 1.75, style, ...rest }) {
  const d = PATHS[name] || PATHS.circle;
  return (
    <span
      className="ic"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', ...style }}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  );
}