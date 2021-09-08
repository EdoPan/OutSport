import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '../model/user.model';
import { Storage } from '@ionic/storage';


const USER_KEY = 'app_users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: Storage) {
    storage.create();
  }

  //Da chiamare nella schermata di registrazione
  //Prende per parametro solo una email, gli altri campi rimangono vuoti
  addUser( user: User ): Promise<any>{
    return this.storage.get( USER_KEY ).then((users: User[]) => {
      if (users){
        users.push(user);
        return this.storage.set( USER_KEY, users );
      } else {
        return this.storage.set( USER_KEY, [user] );
      }
    });

  }

  //Leggi i dati, da chiamare nella schermata per calcolare le calorie e per sapere l'email dell'utente (per
  //la chiave di workout)
  getUser( email: string ): Promise<User>{
    return this.storage.get( USER_KEY ).then(( users: User[] ) => {
      if ( !users || users.length === 0 ){
        return null;
      } else {
        for (const i of users) {
          if (i.email === email) {
            return i;
          }
        }
      }
    });
  }

  //Aggiorna i dati, per la schermata del profilo
  uptdateDataUser( user: User ): Promise<any>{
    return this.storage.get( USER_KEY ).then((users: User[]) => {
      if ( !users || users.length === 0 ){
        return null;
      }
      const newUsers: User[] = [];
      for( const i of users ){
        if( i.email === user.email){
          newUsers.push(user);
        } else {
          newUsers.push(i);
        }
      }
      return this.storage.set(USER_KEY, newUsers);
    });
  }

  //Cancella i dati, non serve per ora
  deleteuser( email: string ): Promise<User>{
    return this.storage.get( USER_KEY ).then((users: User[]) => {
      if ( !users || users.length === 0 ){
        return null;
      }
      const toKeep: User[] = [];
      for( const i of users ){
        if (i.email !== email){
          toKeep.push(i);
        }
      }
      return this.storage.set(USER_KEY, toKeep);
    });
  }

  //Metodo che ritorna true se l'utente passato come email è presente nel DB
  //PER ORA NON SERVE
  checkUserByEmail( email: string ): Promise<boolean>{
    return this.storage.get( USER_KEY ).then((users: User[])=>{
      let bool = false;
      if ( users !== null && users.length > 0 ){
        for (const i of users) {
          if (i.email === email) {
            bool = true;
          }
        }
      }
      return bool;
    });
  }

}
