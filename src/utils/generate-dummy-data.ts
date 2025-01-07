import { faker } from '@faker-js/faker';

type statusCategory = 'image' | 'video' | 'audio';
interface ImageStatus {
  id: string;
  url: string;
  status: 'saved' | 'unsaved';
  type: statusCategory;
}

export const generateImageStatusData = (count: number): ImageStatus[] => {
  const data: ImageStatus[] = [];

  const Videos = [
    'https://videos.pexels.com/video-files/29765109/12791166_1440_2560_60fps.mp4',
    // 'https://videos.pexels.com/video-files/29889428/12831854_1440_2560_30fps.mp4',
    // 'https://videos.pexels.com/video-files/29706156/12773869_640_360_60fps.mp4',
    // 'https://videos.pexels.com/video-files/29828942/12811330_640_360_30fps.mp4',
    // 'https://videos.pexels.com/video-files/29533146/12713561_640_360_60fps.mp4',
  ];

  const Audio = [
    'https://artlist.io/royalty-free-music/song/in-flight/133582',
    // 'https://artlist.io/royalty-free-music/song/night-owl/133581',
    // 'https://artlist.io/royalty-free-music/song/night-owl/133581',
    // 'https://artlist.io/royalty-free-music/song/night-owl/133581',
    // 'https://artlist.io/royalty-free-music/song/night-owl/133581',
  ];

  for (let i = 0; i < count; i++) {
    //get random category
    const category = faker.helpers.arrayElement(['image', 'video', 'audio']);

    const getURI = () => {
      if (category === 'video') {
        return faker.helpers.arrayElement(Videos);
      } else if (category === 'audio') {
        return faker.helpers.arrayElement(Audio);
      } else {
        return faker.image.url();
      }
    };

    data.push({
      id: faker.string.uuid(),
      url: getURI(),
      status: faker.helpers.arrayElement(['saved', 'unsaved']),
      type: category as statusCategory,
    });
  }

  return data;
};
