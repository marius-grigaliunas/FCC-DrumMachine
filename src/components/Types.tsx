export interface Note {
    letter: string;
    sound: string;
    time: number;
    sourceLink: string;
  }

  export interface Recording {
    id: string;
    notes: Note[];
  }