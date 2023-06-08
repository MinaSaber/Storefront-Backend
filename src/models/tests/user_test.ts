import { User, userStore } from '../user'

const store = new userStore()

describe("user Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      id: 1,
      firstName: 'mina',
      lastName: 'saber',
      password: 'password'
    });
    expect(result).toEqual({
      id: 1,
      firstName: 'mina',
      lastName: 'saber',
      password: 'password'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      firstName: 'mina',
      lastName: 'saber',
      password: 'password'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      firstName: 'mina',
      lastName: 'saber',
      password: 'password'
    });
  });
});