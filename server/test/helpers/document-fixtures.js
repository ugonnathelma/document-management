import faker from 'faker';
import moment from 'moment';
import userFixtures from './user-fixtures';


const documentFixtures = {
  privateDocument: {
    id: faker.random.number({ max: 100, min: 1 }),
    title: 'private document',
    content: faker.lorem.sentence(),
    access: 'private',
    user_id: userFixtures.regularUser.id
  },
  publicDocument: {
    id: faker.random.number({ max: 100, min: 1 }),
    title: 'public document',
    content: faker.lorem.sentence(),
    access: 'public',
    user_id: userFixtures.regularUser.id
  },
  secondPublicDocument: {
    id: faker.random.number({ max: 100, min: 1 }),
    title: 'second public document',
    content: faker.lorem.sentence(),
    access: 'public',
    user_id: userFixtures.secondRegularUser.id
  },
  thirdPublicDocument: {
    id: faker.random.number({ max: 100, min: 1 }),
    title: 'third public document',
    content: faker.lorem.sentence(),
    access: 'public',
    user_id: userFixtures.secondRegularUser.id
  },
  roleDocument: {
    id: faker.random.number({ max: 100, min: 1 }),
    title: 'role document',
    content: faker.lorem.sentence(),
    access: 'role',
    user_id: userFixtures.secondRegularUser.id
  },
  incompleteDocument: {
    id: faker.random.number({ max: 100, min: 1 }),
    title: 'incomplete document',
    access: 'public',
    user_id: userFixtures.regularUser.id
  },
  createDocuments: (numberOfDocuments, users) => {
    const docs = [];
    while (numberOfDocuments > 0) {
      const doc = {
        id: faker.random.number({ max: 100, min: 1 }),
        title: faker.name.title(),
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: moment().subtract(numberOfDocuments, 'days').toDate()
      };
      docs.push(doc);
      numberOfDocuments -= 1;
    }
    return docs;
  },
  createDifferentDateDocuments: (users) => {
    return [
      {
        title: 'document1',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: moment().subtract(4, 'days').toDate()
      },
      {
        title: 'document2',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: moment().subtract(3, 'days').toDate()
      },
      {
        title: 'document3',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: moment().subtract(2, 'days').toDate()
      },
      {
        title: 'document4',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: moment().subtract(1, 'days').toDate()
      },
      {
        title: 'document5',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: moment().toDate()
      }
    ];
  },
  createNonRandomDocuments: (users) => {
    return [
      {
        title: 'document1',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: new Date()
      },
      {
        title: 'document2',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: new Date()
      },
      {
        title: 'document3',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: faker.date.past()
      },
      {
        title: 'document4',
        content: faker.lorem.sentence(),
        access: 'public',
        user_id: users[faker.random.number({ min: 0, max: users.length - 1 })].id,
        publish_date: faker.date.past()
      }
    ];
  }
};


export default documentFixtures;
