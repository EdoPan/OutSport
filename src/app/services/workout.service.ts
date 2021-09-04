import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Workout } from '../model/workout.model';

const WORKOUT_KEY = 'my_workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private storage: Storage) {
    storage.create();
  }

  //Create
  //Se c'è già un qualsiasi utente aggiungi quello passato per parametro all'array altrimenti
  //crea un array di utenti
  addWorkout( workout: Workout ): Promise<any>{
    return this.storage.get( WORKOUT_KEY ).then((workouts: Workout[]) => {
      if (workouts){
        workouts.push(workout);
        return this.storage.set( WORKOUT_KEY, workouts );
      } else {
        return this.storage.set( WORKOUT_KEY, [workout] );
      }
    });
  }

  //Read
  getWorkouts( email: string ): Promise<Workout[]>{
    return this.storage.get( WORKOUT_KEY ).then((workouts: Workout[]) => {
      if ( !workouts || workouts.length === 0 ){
        return null;
      }
      const toKeep: Workout[] = [];
      for( const i of workouts ){
        if (i.email === email){
          toKeep.push(i);
        }
      }
      return toKeep;
    });
  }

  //Delete
  deleteWorkout( date: number ): Promise<Workout>{
    return this.storage.get( WORKOUT_KEY ).then((workouts: Workout[]) => {
      if ( !workouts || workouts.length === 0 ){
        return null;
      }
      const toKeep: Workout[] = [];
      for( const i of workouts ){
        if (i.date !== date){
          toKeep.push(i);
        }
      }
      return this.storage.set(WORKOUT_KEY, toKeep);
    });
  }
}
