import { faker } from "@faker-js/faker";

const randomId = {
  generate() {
    return Math.floor(Math.random() * 100000 + 1);
  },
};

export const definePostList = (count) =>
  Array(count)
    .fill()
    .map(() => ({
      id: randomId.generate(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      User: {
        id: randomId.generate(),
        nickName: faker.person.firstName(),
        profileImg: faker.image.image(),
      },
    }));

export const definePostDetail = {
  id: randomId.generate(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  Post_img: Array(Math.floor(Math.random() * 3) + 1)
    .fill()
    .map(() => faker.image.url()),
};

export const definePostComment = (count) =>
  Array(count)
    .fill()
    .map(() => {
      return {
        id: randomId.generate(),
        content: faker.lorem.sentence(),
        User: {
          id: randomId.generate(),
          nickName: faker.person.firstName(),
        },
      };
    });
