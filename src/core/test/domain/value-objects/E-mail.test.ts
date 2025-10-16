import { Email } from "../../../domain/value-objects/Email"

describe("Email", () => {
    it('You must create a valid email address.', () => {
        const email = Email.create('test@exemplo.com')
        expect(email.value).toBe("test@exemplo.com")
    })

    it('Generate error for invalid email', () => {
        expect(() => Email.create('invalid email')).toThrow()
    })
})