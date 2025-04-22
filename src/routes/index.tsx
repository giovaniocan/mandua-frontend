import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Game } from '../pages/Game'
import { Ranking } from '../pages/Ranking'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jogo" element={<Game />} />
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
  )
}
