import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FloatingNavigation } from '@/components/floating-navigation';

const router = vi.hoisted(() => ({ location: { pathname: '/', hash: '' } }));
vi.mock('@tanstack/react-router', () => ({ useRouterState: ({ select }: { select: (state: typeof router) => unknown }) => select(router) }));
const renderNavigation = () => render(<FloatingNavigation onLearn={vi.fn()} onVerify={vi.fn()}><div>Page content</div></FloatingNavigation>);

describe('Navigation state', () => {
  beforeEach(() => { localStorage.clear(); router.location = { pathname: '/', hash: '' }; });
  afterEach(cleanup);
  it('remembers a collapsed navigation across mounts', () => {
    const view = renderNavigation();
    fireEvent.click(screen.getByRole('button', { name: 'Collapse navigation' }));
    expect(localStorage.getItem('zorro-x-navigation-collapsed')).toBe('true');
    view.unmount();
    renderNavigation();
    expect(screen.getByRole('button', { name: 'Expand navigation' })).toHaveAttribute('aria-expanded', 'false');
  });
  it('remembers expanded navigation after toggling back', () => {
    localStorage.setItem('zorro-x-navigation-collapsed', 'true');
    renderNavigation();
    fireEvent.click(screen.getByRole('button', { name: 'Expand navigation' }));
    expect(localStorage.getItem('zorro-x-navigation-collapsed')).toBe('false');
    expect(screen.getByRole('button', { name: 'Collapse navigation' })).toHaveAttribute('aria-expanded', 'true');
  });
  it('follows the current section when the router location changes', () => {
    const view = renderNavigation();
    router.location = { pathname: '/', hash: 'directory' };
    view.rerender(<FloatingNavigation onLearn={vi.fn()} onVerify={vi.fn()}><div>Page content</div></FloatingNavigation>);
    expect(screen.getByRole('link', { name: 'Directory' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });
});