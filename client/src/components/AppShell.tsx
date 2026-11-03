import { Link, useLocation } from "wouter";
import { BookOpen, Braces, CheckCircle2, ChevronRight, CircleUserRound, Code2, FolderKanban, Home, LayoutDashboard, Menu, PanelLeftClose, Trophy, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabaseModeLabel, isSupabaseConfigured } from "@/lib/supabase";
import { useProgress } from "@/lib/progress";
import { allLessons, totalLessonCount } from "@/data/course";

const links = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/trilha", label: "Learning path", icon: BookOpen },
  { href: "/exercicios", label: "Exercises", icon: CheckCircle2 },
  { href: "/editor", label: "Code lab", icon: Braces },
  { href: "/projetos", label: "Projects", icon: FolderKanban },
  { href: "/avaliacoes", label: "Assessments", icon: Trophy },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { completedLessonIds } = useProgress();
  const progress = Math.round((completedLessonIds.length / totalLessonCount) * 100);
  const nextLesson = allLessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ?? allLessons[allLessons.length - 1];

  return (
    <div className="app-frame">
      <aside className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="sidebar-topline">
          <Link href="/" className="brand" onClick={() => setMobileOpen(false)}>
            <span className="brand-mark">&gt;_</span>
            <span>Código <span>Zero</span></span>
          </Link>
          <button className="icon-button mobile-only" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>

        <div className="student-card">
          <div className="student-avatar">AM</div>
          <div>
            <strong>Welcome, learner</strong>
            <span>Learning path in progress</span>
          </div>
          <Link href="/perfil" aria-label="Open profile" onClick={() => setMobileOpen(false)}><ChevronRight size={16} /></Link>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Learn</p>
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? location === "/" : location.startsWith(href);
            return <Link key={href} href={href} className={`nav-link ${active ? "active" : ""}`} onClick={() => setMobileOpen(false)}><Icon size={17} strokeWidth={active ? 2.4 : 1.8} /><span>{label}</span>{active && <span className="nav-dot" />}</Link>;
          })}
        </nav>

        <div className="sidebar-progress">
          <div className="progress-heading"><span>Your progress</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <p>{completedLessonIds.length} of {totalLessonCount} lessons completed</p>
          <Link href={`/aula/${nextLesson.moduleId}/${nextLesson.id}`} className="sidebar-next" onClick={() => setMobileOpen(false)}>Continue lesson <ChevronRight size={14} /></Link>
        </div>

        <div className="sidebar-footer">
          <div className={`sync-status ${isSupabaseConfigured ? "is-connected" : ""}`}><span className="status-pip" />{supabaseModeLabel()}</div>
          <Link href="/perfil" className="nav-link footer-profile" onClick={() => setMobileOpen(false)}><CircleUserRound size={17} /><span>My profile</span></Link>
        </div>
      </aside>

      <main className="main-canvas">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={19} /></button><span className="breadcrumb"><Code2 size={14} /> códigozero / <strong>{getSectionLabel(location)}</strong></span></div>
          <div className="topbar-actions"><span className="streak"><span className="streak-icon">✦</span> 3-day streak</span><Link href="/perfil" className="top-avatar" aria-label="Profile">AM</Link></div>
        </header>
        <div className="page-content">{children}</div>
      </main>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}

function getSectionLabel(path: string) {
  if (path === "/") return "overview";
  if (path.startsWith("/aula")) return "lesson";
  if (path.startsWith("/trilha")) return "learning path";
  if (path.startsWith("/exercicios")) return "exercises";
  if (path.startsWith("/editor")) return "code lab";
  if (path.startsWith("/projetos")) return "projects";
  if (path.startsWith("/avaliacoes")) return "assessments";
  return "profile";
}
