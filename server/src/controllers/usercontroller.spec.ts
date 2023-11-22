import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../services/tokenGenerator";
import { registerUser } from "./userController";

jest.mock("../services/passwordHash.ts", () => ({
  hash: jest.fn().mockResolvedValue("hashed password_uagscfbyeicbf"),
}));

jest.mock("../services/dbconnect.ts", () => ({
  execute: jest.fn().mockResolvedValue({ recordset: [] }), // Adjust the mock data
}));

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("unique-id_iufgbeybuickleruicfbylidb"),
}));

describe("user registration", () => {
  test("register user", async () => {
    const request = {
      body: {
        fullName: "caleb kellah",
        password: "@Qwerty123",
        email: "c@kb.com",
      },
    };

    const response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // mock the status function
    };

    await registerUser(request as any, response as any);

    // Assert the behavior you expect
    expect(response.status).toHaveBeenCalledWith(200); // or the appropriate status code
    expect(response.json).toHaveBeenCalledWith({
      message: "User registered succesfully",
    });
  });
});
