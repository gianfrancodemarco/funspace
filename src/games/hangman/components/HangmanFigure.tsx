type HangmanFigureProps = {
  wrongCount: number;
  maxWrongGuesses: number;
};

const BODY_PARTS = [
  "head",
  "body",
  "leftArm",
  "rightArm",
  "leftLeg",
  "rightLeg",
] as const;

function partVisible(wrongCount: number, partIndex: number, maxWrongGuesses: number) {
  const threshold = Math.ceil(
    ((partIndex + 1) * maxWrongGuesses) / BODY_PARTS.length,
  );
  return wrongCount >= threshold;
}

export function HangmanFigure({ wrongCount, maxWrongGuesses }: HangmanFigureProps) {
  const showHead = partVisible(wrongCount, 0, maxWrongGuesses);
  const showBody = partVisible(wrongCount, 1, maxWrongGuesses);
  const showLeftArm = partVisible(wrongCount, 2, maxWrongGuesses);
  const showRightArm = partVisible(wrongCount, 3, maxWrongGuesses);
  const showLeftLeg = partVisible(wrongCount, 4, maxWrongGuesses);
  const showRightLeg = partVisible(wrongCount, 5, maxWrongGuesses);

  return (
    <svg
      viewBox="0 0 200 240"
      className="text-foreground mx-auto h-48 w-full max-w-xs"
      aria-hidden
    >
      <line x1="40" y1="220" x2="120" y2="220" stroke="currentColor" strokeWidth="4" />
      <line x1="80" y1="220" x2="80" y2="20" stroke="currentColor" strokeWidth="4" />
      <line x1="80" y1="20" x2="140" y2="20" stroke="currentColor" strokeWidth="4" />
      <line x1="140" y1="20" x2="140" y2="45" stroke="currentColor" strokeWidth="4" />

      {showHead && (
        <circle cx="140" cy="65" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
      )}
      {showBody && (
        <line x1="140" y1="85" x2="140" y2="150" stroke="currentColor" strokeWidth="4" />
      )}
      {showLeftArm && (
        <line x1="140" y1="105" x2="110" y2="130" stroke="currentColor" strokeWidth="4" />
      )}
      {showRightArm && (
        <line x1="140" y1="105" x2="170" y2="130" stroke="currentColor" strokeWidth="4" />
      )}
      {showLeftLeg && (
        <line x1="140" y1="150" x2="115" y2="190" stroke="currentColor" strokeWidth="4" />
      )}
      {showRightLeg && (
        <line x1="140" y1="150" x2="165" y2="190" stroke="currentColor" strokeWidth="4" />
      )}
    </svg>
  );
}
