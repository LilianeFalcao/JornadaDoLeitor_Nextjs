import { makeReadingUseCases } from "../../factories/makeReadingUseCases";

describe ("make Reading UseCases", ()=> {
    it("should create and return all reading use cases", ()=> {
        const useCases = makeReadingUseCases();

        expect(useCases.addReading).toBeDefined();
        expect(useCases.deleteReading).toBeDefined();
    })
})