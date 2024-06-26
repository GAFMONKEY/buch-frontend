import colorsData from '../constants/colors.json'

const preGeneratedColors: string[] = colorsData.colors;

export function schlagwortColorMap(bücher: Buch[]) {
  const schlagwortSet = new Set<string>();

  bücher.forEach(buch => {
    if (buch.schlagwoerter) {
      buch.schlagwoerter.forEach(schlagwort => {
        schlagwortSet.add(schlagwort);
      });
    }
  });

  const colorMap = new Map<string, string>();
  let index = 0;

  schlagwortSet.forEach(schlagwort => {
    colorMap.set(schlagwort, preGeneratedColors[index++]);
  });

  return colorMap;
}
