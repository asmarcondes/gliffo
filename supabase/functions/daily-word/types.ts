export type ScheduleEntry = {
  date: string;
  word: string;
  difficulty: string;
  difficultyLabel: string;
  puzzle: number;
};

export type ScheduleFile = {
  days: ScheduleEntry[];
};

export type PuzzleScheduleRepository = {
  getByDate: (dateStr: string) => Promise<ScheduleEntry | null>;
};