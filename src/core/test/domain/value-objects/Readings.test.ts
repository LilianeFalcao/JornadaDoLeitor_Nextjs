import { Readings } from "../../../domain/value-objects/Readings";

describe("Readings", () => {
    it("should create a valid readings", () => {
        const reading = Readings.create(10, 12);
        expect(reading.current_chapter.value).toBe(10);
    });

    it("Give error if current chapter is invalid", () => {
        expect(() => Readings.create(-1, 5)).toThrow("current chapter is invalid.");
    });

    it("Generate error if last update is less than current chapter", () => {
        expect(() => Readings.create(10, 5)).toThrow(
            "last update is less than current chapter"
        );
    });
});