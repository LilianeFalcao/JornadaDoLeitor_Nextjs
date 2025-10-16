export enum Reading_Status {
    READING = "reading",
    COMPLETED = "completed"
}
export class Readings{
    private constructor(
        readonly id: string,
        readonly id_user: string,
        readonly id_manga: string,
        readonly start_date: Date,
        private _current_chapter: number,
        private _progress: number,
        private _status: Reading_Status,
        private _notes: string

    ){  }
    static create(
        id: string,
        id_user: string,
        id_manga: string,
        start_date: Date,
        current_chapter: number,
        progress: number,
        status: Reading_Status,
        notes: string

    ): Readings {
        return new Readings(
            id, id_user, id_manga, start_date, 
            current_chapter, progress, status, notes)
    }
    
    get current_chapter() { return this._current_chapter; }
    get progress() { return this._progress; }
    get status() { return this._status; }
    get notes() { return this._notes; }

    updateProgress(current_chapter: number, progress: number, status: Reading_Status) {
        this._current_chapter = current_chapter;
        this._progress = progress;
        this._status = status;
    }

    updateNotes(notes: string) {
        this._notes = notes;
    }
}
