import { useState, useEffect } from 'react';

type Variant = 'A' | 'B';

/**
 * Custom hook for A/B testing.
 * Persists the user's variant selection in localStorage to ensure consistency across sessions.
 * 
 * @param testId Unique identifier for the test (e.g., 'wa_button_test_v1')
 * @returns 'A' or 'B'
 */
export const useABTest = (testId: string): Variant => {
  const [variant, setVariant] = useState<Variant>('A');

  useEffect(() => {
    try {
      const storageKey = `fann_ab_${testId}`;
      const storedVariant = localStorage.getItem(storageKey) as Variant;

      if (storedVariant === 'A' || storedVariant === 'B') {
        setVariant(storedVariant);
      } else {
        // 50/50 Split
        const newVariant = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem(storageKey, newVariant);
        setVariant(newVariant);
      }
    } catch (e) {
      // Fallback to A if storage fails (e.g. privacy mode)
      console.warn('A/B Test Storage Error', e);
    }
  }, [testId]);

  return variant;
};
