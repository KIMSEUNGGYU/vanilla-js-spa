const { faker } = window;

// state 생성 함수
const createTodo = () => ({
  text: faker.random.words(2),
  completed: faker.random.boolean(),
});

//
const repeat = (createState, number) => {
  const array = [];

  for (let index = 0; index < number; index++) {
    array.push(createState());
  }

  return array;
};

export default () => {
  const howMany = faker.random.number({
    min: 1,
    max: 5,
  });

  return repeat(createTodo, howMany); // [todoItem, todoItem]
};
