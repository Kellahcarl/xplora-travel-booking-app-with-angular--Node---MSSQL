import { execute } from "../services/dbconnect";
import { comparePass, hashPass } from "../services/passwordHash";
import { loginUser, registerUser } from "./userController";

// Mock the hashPass function
jest.mock("../services/passwordHash.ts", () => ({
  hashPass: jest.fn(),
  comparePass: jest.fn(), // Mock the comparePass function
}));

// Mock the execute function
jest.mock("../services/dbconnect.ts", () => ({
  execute: jest.fn(),
}));

// Mock the generateToken function
jest.mock("../services/tokenGenerator.ts", () => ({
  generateToken: jest.fn().mockReturnValue("mockedToken"),
}));

describe("registerUser controller", () => {
  it("should register a user", async () => {
    // Arrange
    const req: any = {
      body: {
        fullName: "John Doe",
        password: "@Santa2023",
        email: "john@example.com",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    // Mock the hashPass function to return a mock password
    (hashPass as jest.Mock).mockResolvedValue("hashedPassword");

    // Mock the execute function to simulate a successful registration
    (execute as jest.Mock).mockResolvedValue({});

    // Act
    await registerUser(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

  it(" should login a user ", async () => {
    const reqLogin: any = {
      body: {
        email: "john@example.com",
        password: "@Santa2023",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the comparePass function to return true (valid password)
    (comparePass as jest.Mock).mockResolvedValue(true);

    // Mock the execute function to simulate a successful login
    (execute as jest.Mock).mockResolvedValue({
      recordset: [
        { id: "123", email: "john@example.com", password: "hashedPassword" },
      ],
    });

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(200);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Logged in successfully",
      token: "mockedToken",
    });
  });

  it("should handle registration failure - email already exists", async () => {
    // Arrange
    const reqRegister: any = {
      body: {
        fullName: "John Doe",
        password: "@Qwerty123",
        email: "john@example.com",
      },
    };

    const resRegister: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the hashPass function to return a mock password
    (hashPass as jest.Mock).mockResolvedValue("hashedPassword");

    // Mock the execute function to simulate an existing user with the same email
    (execute as jest.Mock).mockResolvedValue({
      recordset: [
        { id: "123", email: "john@example.com", password: "hashedPassword" },
      ],
    });

    // Act
    await registerUser(reqRegister, resRegister);

    // Assert
    expect(resRegister.status).toHaveBeenCalledWith(404);
    expect(resRegister.json).toHaveBeenCalledWith({
      error: "Account exists with the given email",
    });
  });

  it("should handle registration failure - validation error", async () => {
    // Arrange
    const reqRegister: any = {
      body: {
        fullName: "John Doe",
        password: "Short", // Invalid password for validation error
        email: "john@example.com",
      },
    };

    const resRegister: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Act
    await registerUser(reqRegister, resRegister);

    // Assert
    expect(resRegister.status).toHaveBeenCalledWith(400);
    expect(resRegister.json).toHaveBeenCalledWith({
      error:
        "check email or password should be atleast 8 characters long with letters symbols and uppercase",
    });
  });

   it("should handle login failure - invalid password", async () => {
     

     // Arrange for login with invalid password
     const reqLoginInvalidPass: any = {
       body: {
         email: "john@example.com",
         password: "InvalidPassword",
       },
     };

     const resLoginInvalidPass: any = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn(),
     };

     // Mock the comparePass function to return false (invalid password)
     (comparePass as jest.Mock).mockResolvedValue(false);

     // Mock the execute function to simulate a successful login
     (execute as jest.Mock).mockResolvedValue({
       recordset: [
         { id: "123", email: "john@example.com", password: "hashedPassword" },
       ],
     });

     // Act
     await loginUser(reqLoginInvalidPass, resLoginInvalidPass);

     // Assert
     expect(resLoginInvalidPass.status).toHaveBeenCalledWith(404);
     expect(resLoginInvalidPass.json).toHaveBeenCalledWith({
       error: "Invalid password",
     });
   });

   it("should handle login failure - email not in the database", async () => {
     // Arrange for login with email not in the database
     const reqLoginInvalidEmail: any = {
       body: {
         email: "nonexistent@example.com",
         password: "ValidPass123",
       },
     };

     const resLoginInvalidEmail: any = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn(),
     };

     // Mock the execute function to simulate an email not in the database
     (execute as jest.Mock).mockResolvedValue({ recordset: [] });

     // Act
     await loginUser(reqLoginInvalidEmail, resLoginInvalidEmail);

     // Assert
     expect(resLoginInvalidEmail.status).toHaveBeenCalledWith(404);
     expect(resLoginInvalidEmail.json).toHaveBeenCalledWith({
       error: "Account does not exist",
     });
   });

});
