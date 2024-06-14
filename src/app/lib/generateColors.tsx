function generateColors(numColors: any) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = ((i * 360) / numColors) % 360;
    colors.push(`hsl(${hue}, 100%, 75%)`);
  }
  return colors;
}

export function schlagwortColorMap(bücher: Buch[]) {
  const schlagwortSet = new Set<string>();
  bücher.forEach((buch) => {
    buch.schlagwoerter.forEach((schlagwort) => {
      schlagwortSet.add(schlagwort);
    });
  });

  const colors = generateColors(schlagwortSet.size);

  const colorMap = new Map<string, string>();

  let index = 0;
  schlagwortSet.forEach((schlagwort) => {
    colorMap.set(schlagwort, colors[index]);
    index++;
  });
  return colorMap;
}

// schlagwoerter => Map<schlagwort, color>
