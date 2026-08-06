'use client';

import { useState, useEffect } from 'react';

/**
 * Hook customizado para aplicar debounce em qualquer valor.
 * @param {any} value - O valor que muda constantemente (ex: texto do input).
 * @param {number} delay - O tempo de espera em milissegundos (padrão: 500ms).
 * @returns {any} O valor atualizado apenas após o tempo de espera.
 */
export default function useDebounce(value : string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Cria o temporizador para atualizar o valor final após o delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o temporizador se o valor mudar antes do tempo acabar
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
