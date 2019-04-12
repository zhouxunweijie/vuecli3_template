export default [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: 'store',
    name: 'store',
    component: () => import('@/views/store'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: 'forum',
    name: 'forum',
    component: () => import('@/views/forum'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/user'),
    meta: {
      keepAlive: true
    }
  }
]
