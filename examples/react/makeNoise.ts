﻿import uuid from 'uuid'
import faker from 'faker'
const makeNoise = (rows: number) => {
  const collection = []
  console.time('makeNoise')
  for (let i = 0; i < rows; i++) {
    const item = {
      id: uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.random.number({ min: 18, max: 100 }),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      gender: faker.random.arrayElement(['Male', 'Female']),
      latitude: +faker.address.latitude(),
      longitude: +faker.address.longitude(),
      paragraph: faker.lorem.paragraph(),
    }
    collection.push(item)
  }
  console.timeEnd('makeNoise')
  return collection
}
