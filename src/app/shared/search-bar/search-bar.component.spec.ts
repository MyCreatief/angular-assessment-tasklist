import { describe, it, expect, beforeEach, vi } from 'vitest';
import { runInInjectionContext, createEnvironmentInjector } from '@angular/core';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent (signal-only unit test)', () => {
  let injector: ReturnType<typeof createEnvironmentInjector>;

  beforeEach(() => {
    injector = createEnvironmentInjector([]);
  });

  function createComponent() {
    return runInInjectionContext(injector, () => new SearchBarComponent());
  }

  it('should create', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('should emit search term onInputChange', () => {
    const component = createComponent();
    const spy = vi.fn();

    component.search.subscribe(spy);

    // simulate typing
    component.query.set('Angular');
    component.onInputChange();

    expect(spy).toHaveBeenCalledWith('Angular');
  });

  it('should trim whitespace before emitting', () => {
    const component = createComponent();
    const spy = vi.fn();

    component.search.subscribe(spy);

    component.query.set('   test   ');
    component.onInputChange();

    expect(spy).toHaveBeenCalledWith('test');
  });
});
