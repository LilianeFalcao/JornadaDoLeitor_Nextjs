import { Password } from "../../../domain/value-objects/Password";

describe("Password", () => {
    it('Must create valid password.', () => {
        const value = "'Valid12!'"
        const pass = Password.create(value)
        if (pass) {
            expect(pass.value).toBe(value)
        }
    })
    it("Should throw an error of less than 8 characters", () => {
        expect(() => Password.create('123')).toThrow()
    })
    it("Should throw an error if it doesn't have a capital letter", () => {
        expect(() => Password.create('12345678')).toThrow()
    })
    it("Should throw an error if it doesn't have lowercase letter", () => {
        expect(() => Password.create('1234567A')).toThrow()
    })
    it("Should throw an error if no number is giveno", () => {
        expect(() => Password.create('abcDEFGH')).toThrow()
    })
    it("Should throw an error if it has no special character", () => {
        expect(() => Password.create('abcDEF12')).toThrow()
    })
})