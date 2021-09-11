export interface Workout {
  email: string;
  sport: string;
  date: number;//in millisecondi
  dateDatabase: string;//in formato Giorno/Mese/Anno ( da rinominare today)
  time: string;
  distance: number;
  calories: number;
  averageSpeed: number;
}
