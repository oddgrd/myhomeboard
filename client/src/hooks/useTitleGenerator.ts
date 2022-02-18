import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  animals
} from 'unique-names-generator';

export const useTitleGenerator = () => {
  const generateTitle = (length: number) => {
    const config: Config = {
      dictionaries: [adjectives, animals],
      separator: ' ',
      style: 'capital',
      length
    };
    return uniqueNamesGenerator(config);
  }
  return generateTitle;
};
