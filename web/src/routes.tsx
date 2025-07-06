import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './pages/home'
import { Redirect } from './pages/redirect'
import { NotFound } from './pages/not-found'
import { AppLayout } from './components/layouts/app-layout'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path=":shortLink" element={<Redirect />} />
          <Route path="404" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
