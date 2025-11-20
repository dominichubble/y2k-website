import { WindowLayout } from './components/layout';
import CursorTrail from './components/ui/CursorTrail';
import { useNavigation } from './hooks';
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


