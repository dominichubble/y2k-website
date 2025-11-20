import { AnimatePresence, motion } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COLORS } from '../../constants';

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleShowHelp = () => setIsOpen(prev => !prev);
    const handleCloseAll = () => setIsOpen(false);
    
    window.addEventListener('showKeyboardHelp', handleShowHelp);
    window.addEventListener('closeAllModals', handleCloseAll);
    
    return () => {
      window.removeEventListener('showKeyboardHelp', handleShowHelp);
      window.removeEventListener('closeAllModals', handleCloseAll);
    };
  }, []);

  // Listen for ESC key when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape, true); // Use capture phase
    return () => window.removeEventListener('keydown', handleEscape, true);
  }, [isOpen]);

  const shortcuts = [
    { keys: ['1', '2', '3', '4', '5', '6'], description: 'Navigate to sections (Home, About, Projects, etc.)' },
    { keys: ['←', '→'], description: 'Navigate between sections sequentially' },
    { keys: ['ESC'], description: 'Close open windows or dialogs' },
    { keys: ['?'], description: 'Show/hide this help menu' }
  ];

  return (
    <>
      {/* Keyboard icon hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 border-2 bg-black/90 backdrop-blur-sm transition-all hover:scale-110 z-[9997] hidden md:flex items-center gap-2"
        style={{
          borderColor: COLORS.secondary,
          color: COLORS.secondary
        }}
        title="Keyboard Shortcuts (Press ?)"
      >
        <Keyboard size={20} />
        <span className="text-xs font-mono">?</span>
      </motion.button>

      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-lg mx-4"
            >
              <div
                className="bg-black/95 border-4 p-8"
                style={{
                  borderColor: COLORS.primary,
                  boxShadow: `0 0 40px ${COLORS.primary}40`
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Keyboard size={28} style={{ color: COLORS.primary }} />
                    <h2
                      className="text-2xl font-black font-mono"
                      style={{ color: COLORS.primary }}
                    >
                      KEYBOARD SHORTCUTS
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 border-2 transition-all hover:scale-110"
                    style={{
                      borderColor: COLORS.accent,
                      color: COLORS.accent
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Shortcuts List */}
                <div className="space-y-4">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-3 bg-black/40 border"
                      style={{ borderColor: `${COLORS.primary}20` }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {shortcut.keys.map((key) => (
                          <kbd
                            key={key}
                            className="px-3 py-1.5 font-mono text-sm font-bold border-2 min-w-[2.5rem] text-center"
                            style={{
                              borderColor: COLORS.secondary,
                              color: COLORS.secondary,
                              backgroundColor: `${COLORS.secondary}10`,
                              boxShadow: `0 0 10px ${COLORS.secondary}20`
                            }}
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm flex-1 pt-1">
                        {shortcut.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t" style={{ borderColor: `${COLORS.primary}20` }}>
                  <p className="text-xs text-gray-500 font-mono text-center">
                    Press <kbd className="px-2 py-1 border" style={{ borderColor: COLORS.secondary }}>ESC</kbd> or click outside to close
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
