import { useEffect, useState, type ReactNode } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { BookOpen, ChevronLeft, ChevronRight, Globe2, Home, Menu, Search, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const items = [
  { id: 'home', label: 'Home', icon: Home, href: '#home' },
  { id: 'rules', label: 'Trade rules & schemes', icon: Globe2, href: '#rules' },
  { id: 'directory', label: 'Directory', icon: Search, href: '#directory' },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'profile', label: 'Verified profile', icon: ShieldCheck },
];
export function FloatingNavigation({ children, onLearn, onVerify }: { children: ReactNode; onLearn: () => void; onVerify: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useRouterState({ select: state => state.location });
  const [active, setActive] = useState(location.hash || 'home');
  useEffect(() => {
    try { setCollapsed(localStorage.getItem('zorro-x-navigation-collapsed') === 'true'); } catch { /* Storage may be unavailable. */ }
  }, []);
  useEffect(() => { setActive(location.hash || 'home'); setDrawerOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (media.matches) setDrawerOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);
  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem('zorro-x-navigation-collapsed', String(next)); } catch { /* Keep the control usable without storage. */ }
  }
  function links(compact: boolean) {
    return items.map(item => {
      const select = () => {
        setActive(item.id);
        setDrawerOpen(false);
        if (item.id === 'learn') onLearn();
        if (item.id === 'profile') onVerify();
      };
      const content = <><item.icon aria-hidden="true" /><span className="floating-nav-label">{item.label}</span></>;
      const control = item.href
        ? <Button variant="quiet" asChild className="floating-nav-item"><a href={item.href} aria-label={item.label} aria-current={active === item.id ? 'page' : undefined} onClick={select}>{content}</a></Button>
        : <Button variant="quiet" className="floating-nav-item" aria-label={item.label} aria-current={active === item.id ? 'page' : undefined} onClick={select}>{content}</Button>;
      return <Tooltip key={item.id}><TooltipTrigger asChild>{control}</TooltipTrigger>{compact && <TooltipContent className="floating-nav-tooltip" side="right" sideOffset={12}>{item.label}</TooltipContent>}</Tooltip>;
    });
  }
  return <TooltipProvider delayDuration={150}><div className="navigation-shell" data-nav-collapsed={collapsed}>
    <nav className="floating-nav" aria-label="Main navigation" data-collapsed={collapsed}>
      <Button variant="quiet" className="floating-nav-toggle" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} aria-expanded={!collapsed} aria-controls="desktop-navigation-items" onClick={toggle}>{collapsed ? <ChevronRight /> : <ChevronLeft />}<span className="floating-nav-label">Navigation</span></Button>
      <div className="floating-nav-items" id="desktop-navigation-items">{links(collapsed)}</div>
    </nav>
    <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DialogTrigger asChild><Button variant="paper" size="icon" className="mobile-navigation-trigger" aria-label="Open navigation"><Menu /></Button></DialogTrigger>
      <DialogPortal><DialogOverlay className="navigation-drawer-overlay" /><DialogPrimitive.Content className="navigation-drawer" aria-describedby={undefined}>
        <div className="navigation-drawer-heading"><DialogTitle>Navigation</DialogTitle><DialogClose asChild><Button variant="quiet" size="icon" aria-label="Close navigation"><X /></Button></DialogClose></div>
        <nav aria-label="Mobile main navigation" className="floating-nav-items">{links(false)}</nav>
      </DialogPrimitive.Content></DialogPortal>
    </Dialog>
    <div className="navigation-page">{children}</div>
  </div></TooltipProvider>;
}