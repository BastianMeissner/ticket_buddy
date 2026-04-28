import { describe, it, expect } from 'vitest'
import router from '@/router'

describe('Router', () => {
  it('should redirect / to /splash', () => {
    const routes = router.options.routes
    const rootRoute = routes.find((r) => r.path === '/')
    expect(rootRoute).toBeDefined()
    expect(rootRoute?.redirect).toBe('/splash')
  })

  it('should have all required routes defined', () => {
    const routeNames = router.getRoutes().map((r) => r.name)
    expect(routeNames).toContain('splash')
    expect(routeNames).toContain('home')
    expect(routeNames).toContain('notes')
    expect(routeNames).toContain('note-detail')
    expect(routeNames).toContain('tickets')
    expect(routeNames).toContain('issues')
  })
})
