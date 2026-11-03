import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProgressProvider } from "./lib/progress";
import { AppShell } from "./components/AppShell";
import { AssessmentsPage, DashboardPage, EditorPage, ExercisesPage, LessonPage, ProfilePage, ProjectsPage, TrackPage } from "./pages/CoursePages";
import NotFound from "./pages/NotFound";

function Router() {
  return <AppShell><Switch><Route path="/" component={DashboardPage} /><Route path="/trilha" component={TrackPage} /><Route path="/aula/:moduleId/:lessonId" component={LessonPage} /><Route path="/exercicios" component={ExercisesPage} /><Route path="/editor" component={EditorPage} /><Route path="/projetos" component={ProjectsPage} /><Route path="/avaliacoes" component={AssessmentsPage} /><Route path="/perfil" component={ProfilePage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></AppShell>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><ProgressProvider><Router /></ProgressProvider></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
