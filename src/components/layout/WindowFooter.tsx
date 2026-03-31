import { COLORS } from '../../constants';

export default function WindowFooter() {
  return (
    <div
      className="relative border-t sm:border-t-2 flex-shrink-0 rounded-b-lg font-y2k-mono"
      style={{
        background: `linear-gradient(180deg, #1e1c26 0%, #18161f 100%)`,
        borderColor: COLORS.primary,
        boxShadow: `inset 0 1px 0 rgba(152, 204, 213, 0.07)`,
      }}
    >
      <div className="px-2 sm:px-4 py-1.5 sm:py-2 text-center overflow-hidden">
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-[10px] sm:text-xs leading-tight">
          <p className="text-gray-400 whitespace-nowrap">
            &copy; 2026 Dominic Hubble
          </p>
          <span style={{ color: COLORS.primary }} className="hidden sm:inline">✩</span>
          <p className="text-gray-400 whitespace-nowrap">
            Built with React & TypeScript
          </p>
          <span style={{ color: COLORS.secondary }} className="hidden lg:inline">✩</span>
          <p className="text-gray-400 hidden lg:inline whitespace-nowrap">
            ヾ(＾∇＾)ﾉ thank you for visiting!
          </p>
        </div>
      </div>
    </div>
  );
}
