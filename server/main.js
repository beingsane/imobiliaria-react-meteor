import { Meteor } from 'meteor/meteor';
import '../imports/api/imoveis';
import '../imports/api/email';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'admin',
      password: 'admin',
      profile: {
          tipo: 'adm'
      }
    });
  }
});