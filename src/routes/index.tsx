import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Dificuldade } from '../pages/Game'
import { Ranking } from '../pages/Ranking'
import Instrucoes from '../pages/Instrucoes'
import { Idioma } from '../pages/Idioma'


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/jogo" element={<Dificuldade />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/instrucoes" element={<Instrucoes />} />
      <Route path="/idioma" element={<Idioma />} />
    </Routes>
  )
}
