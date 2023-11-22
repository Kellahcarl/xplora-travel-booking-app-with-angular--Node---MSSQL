import { v4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("this mocks uuid", () => {
  test("it should return a uuid", () => {
    //   const uuid = v4()
    //   console.log(uuid);
    //   expect(uuid).not.toBeNull();

    const mockedV4 = jest.requireMock("uuid").v4;

    mockedV4.mockImplementation(() => {
      return "unique-id_iufgbeybuickleruicfbylidb";
    });

    console.log(v4());
  });
});
