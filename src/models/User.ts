import { Model } from 'objection';

export default class User extends Model {

    id      : number;
    username: string;
    password: string;

    static tableName = 'users';


}
