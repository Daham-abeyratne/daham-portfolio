export default function Loading() {
  const bars = [
    { height: 40, order: [0] },
    { height: 70, order: [1] },
    { height: 50, order: [2] },
    { height: 85, order: [3] },
    { height: 60, order: [4] },
    { height: 75, order: [5] },
    { height: 55, order: [6] }
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative flex items-center gap-2">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded transition-all duration-1000 ease-in-out"
            style={{height: `${bar.height}px`, animation: `move-${i} 2s infinite ease-in-out`}}
          />
        ))}
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes move-0 {
            0%  { order: 0; }
            25% { order: 5; }
            50% { order: 4; }
            75% { order: 2; }
            100%{ order: 0; }
          }
          @keyframes move-1 {
            0%  { order: 1; }
            25% { order: 2; }
            50% { order: 1; }
            100%{ order: 4; }
          }
          @keyframes move-2 {
            0% { order: 2; }
            25% { order: 3; }
            50% { order: 5; }
            100%{ order: 1; }
          }
          @keyframes move-3 {
            0%  { order: 3; }
            25% { order: 0; }
            50% { order: 0; }
            75% { order: 3; }
            100%{ order: 5; }
          }
          @keyframes move-4 {
            0% { order: 4; }
            25% { order: 5; }
            50% { order: 3; }
            75% { order: 4; }
            100%{ order: 3; }
          }
          @keyframes move-5 {
            0% { order: 5; }
            25% { order: 1; }
            50% { order: 5; }
            100%{ order: 4; }
          }
          @keyframes move-6 {
            0%  { order: 6; }
            25% { order: 5; }
            50% { order: 3; }
            100%{ order: 2; }
          }
        `}} />
      </div>
    </div>
  );
}