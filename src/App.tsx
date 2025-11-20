import { WindowLayout } from './components/layout';
import CursorTrail from './components/ui/CursorTrail';
import KeyboardShortcutsHelp from './components/ui/KeyboardShortcutsHelp';
import { useNavigation } from './hooks';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import {
  AboutPage,
  BlogPage,
  ExperiencePage,
  HomePage,
  ProjectsPage,
  SkillsPage
} from './pages';

function App() {
  const { currentSection, navigateTo } = useNavigation('home');

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNavigate: navigateTo,
    currentSection: currentSection,
    onEscape: () => {
      // Close any open modals/windows
      const event = new CustomEvent('closeAllModals');
      window.dispatchEvent(event);
    }
  });

  const renderPage = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'skills':
        return <SkillsPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <CursorTrail />
      <KeyboardShortcutsHelp />
      <WindowLayout 
        currentSection={currentSection} 
        onSectionChange={navigateTo}
      >
        {renderPage()}
      </WindowLayout>
    </>
  );
}

export default App;


