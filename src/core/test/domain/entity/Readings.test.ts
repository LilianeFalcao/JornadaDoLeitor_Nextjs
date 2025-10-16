import { Reading_Status, Readings } from "../../../domain/entity/Readings";

describe ('Readings', () => {
    it("should create a valid readings", () => {
        const start_date = new Date()

        const reading = Readings.create(
            '1',
            'user-1',
            'manga-24',
            start_date,
            25,
            15,
            Reading_Status.READING,
            'Muito engraçado'
        );

        expect(reading.id).toBe('1');
        expect(reading.id_user).toBe('user-1');
        expect(reading.id_manga).toBe('manga-24');
        expect(reading.start_date).toEqual(start_date);
        expect(reading.current_chapter).toBe(15);
        expect(reading.status).toBe(Reading_Status.READING);
        expect(reading.notes).toBe('Muito engraçado')
    })
})