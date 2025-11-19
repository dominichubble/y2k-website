import { COLORS } from '../../constants';

export default function WindowFooter() {
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t-2 bg-black/90"
      style={{ borderColor: `${COLORS.primary}30` }}
    >
      <div className="px-4 py-2 text-center">
        <div className="flex items-center justify-center gap-3 flex-wrap text-xs">
          <p className="font-mono text-gray-400">&copy; 2025 Dominic Hubble</p>
          <span style={{ color: COLORS.primary }}>✩</span>
          <p className="font-mono text-gray-400">
            Built with React & TypeScript
          </p>
          <span style={{ color: COLORS.secondary }}>✩</span>
          <p className="font-mono text-gray-400 hidden md:inline">
            ヾ(＾∇＾)ﾉ thank you for visiting!
          </p>
        </div>
      </div>
    </div>
  );
}
