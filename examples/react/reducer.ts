import uuid from 'uuid'
import faker from 'faker'

export type CounterState = {
  value: number
}

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
const initialCounterState = {
  value: 0,
  noise: makeNoise(10000),
}

function reducer(state: CounterState = initialCounterState, action: CounterAction) {
  switch (action.type) {
    case DECREMENT: {
      const { step } = action.payload
      return { ...state, value: state.value - step }
    }
    case INCREMENT:
      const { step } = action.payload
      return { ...state, value: state.value + step }
    default:
      return state
  }
}

export default reducer
