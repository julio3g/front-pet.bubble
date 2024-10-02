'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Filter, Search } from 'lucide-react'
import { useState } from 'react'

export function SearchWrapper() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')

  const handleSearch = () => {
    // Lógica de busca
  }

  return (
    <div className="flex items-center gap-2">
      {/* Input de busca */}
      <div className="flex items-center gap-2 flex-grow">
        <Input
          placeholder="Pesquisar algum pet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Button variant="ghost" onClick={handleSearch}>
          <Search size={18} />
        </Button>
      </div>

      {/* Popover para os filtros */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter size={18} />
            Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          {/* Filtros de cidade */}
          <div className="mb-4">
            <Select onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as cidades</SelectItem>
                <SelectItem value="São Paulo">São Paulo</SelectItem>
                <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                {/* Adicione mais opções de cidade */}
              </SelectContent>
            </Select>
          </div>

          {/* Filtros de gênero */}
          <div className="mb-4">
            <Select onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os gêneros</SelectItem>
                <SelectItem value="Macho">Macho</SelectItem>
                <SelectItem value="Fêmea">Fêmea</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botão de aplicar filtros */}
          <Button onClick={handleSearch} className="w-full">
            Aplicar Filtros
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
