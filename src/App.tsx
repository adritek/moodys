import './App.css';
import { PokemonDetails } from './components/PokemonDetails';
import PokemonList from './components/PokemonList';
// import { useState, useEffect } from 'react';

export default function App() {
  return (
    <>
      <PokemonList />
      <PokemonDetails />
    </>
  );
}
