import { faker } from '@faker-js/faker';

interface ImageStatus {
  id: string;
  url: string;
  status: 'saved' | 'unsaved';
}

export const generateImageStatusData = (count: number): ImageStatus[] => {
  const data: ImageStatus[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.string.uuid(),
      url: faker.image.url(),
      status: faker.helpers.arrayElement(['saved', 'unsaved']),
    });
  }

  return data;
};
