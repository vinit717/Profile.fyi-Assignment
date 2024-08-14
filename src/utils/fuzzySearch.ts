interface ScoredItem<T> {
  item: T;
  score: number;
}

export function fuzzySearch<T>(items: T[], keys: (keyof T)[], query: string): ScoredItem<T>[] {
  const lowercaseQuery = query.toLowerCase();
  const queryLetters = lowercaseQuery.split('');

  return items
    .map(item => {
      let maxScore = 0;

      keys.forEach(key => {
        const value = String(item[key]).toLowerCase();
        let score = 0;

        if (value.includes(lowercaseQuery)) {
          score += 100;
          if (value.startsWith(lowercaseQuery)) score += 50;
        }

        const words = value.split(/\s+/);
        const acronym = words.map(word => word[0]).join('');
        if (acronym.includes(lowercaseQuery)) score += 75;


        let lastIndex = -1;
        for (const letter of queryLetters) {
          const index = value.indexOf(letter, lastIndex + 1);
          if (index > -1) {
            score += 1;
            lastIndex = index;
          }
        }

        maxScore = Math.max(maxScore, score);
      });

      return { item, score: maxScore };
    })
    .filter(scoredItem => scoredItem.score > 0)
    .sort((a, b) => b.score - a.score);
}