interface IconProps {
  name: string;
  handleClick?: () => void;
  classNames?: string;
  text?: string;
}

const iconMap: Record<string, string> = {
  bars: 'M4 7h16M4 12h16M4 17h16',
  xmark: 'M6 6l12 12M6 18L18 6',
  'house-user': 'M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-4v-5a3 3 0 0 0-6 0v5H4a1 1 0 0 1-1-1v-8.5z M12 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
  user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  book: 'M6 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6V4zm2 2v12m4-12v12',
  list: 'M5 7h2m4 0h8M5 12h2m4 0h8M5 17h2m4 0h8',
  'piggy-bank': 'M17 10a5 5 0 0 0-9.87-1H5v6h1.13A5 5 0 0 0 17 10zm-5 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5-6h3v2h-1.5',
  comments: 'M4 4h16v12H7l-3 3V4zm4 3h8m-8 4h6',
  'dollar-sign': 'M12 4v16m2-14a2 2 0 0 1-2 2H9a2 2 0 0 0 0 4h3a2 2 0 0 1 2 2 2 2 0 0 1-2 2H9',
  'location-dot': 'M12 3a7 7 0 0 0-7 7c0 4.95 7 11 7 11s7-6.05 7-11a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z',
  blog: 'M6 4h12v16H6V4zm4 4h4m-4 4h4m-4 4h4',
  film: 'M4 4h16v16H4V4zm3 3v2m0 6v2m10-8v2m0 6v2m-8-10h8m-8 6h8',
  dog: 'M7 8.5c0-1.38 1.12-2.5 2.5-2.5h5c1.38 0 2.5 1.12 2.5 2.5v5c0 1.38-1.12 2.5-2.5 2.5H9.5c-1.38 0-2.5-1.12-2.5-2.5v-5z',
  cat: 'M6 7l3-3 3 2 3-2 3 3v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7z',
  'person-dress': 'M12 3a3 3 0 0 1 3 3v3h-6V6a3 3 0 0 1 3-3zm-4 10h8l-2 7H10l-2-7z',
};

export default function Icon({ name, classNames = '', text = '', handleClick }: IconProps) {
  const path = iconMap[name];

  if (!path) {
    return (
      <span className={classNames} onClick={handleClick}>
        {text || name}
      </span>
    );
  }

  return (
    <svg
      onClick={handleClick}
      className={classNames}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
