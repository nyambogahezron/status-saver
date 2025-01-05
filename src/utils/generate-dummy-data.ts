import { faker } from '@faker-js/faker';

interface ImageStatus {
  id: string;
  url: string;
  status: 'saved' | 'unsaved';
}

const generateImageStatusData = (count: number): ImageStatus[] => {
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

const imageStatusData = generateImageStatusData(50);
console.log(imageStatusData);
