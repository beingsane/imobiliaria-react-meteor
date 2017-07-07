import { Email } from 'meteor/email';

const name = 'Imobiliária';
const email = '<joaoeffting@gmail.com.br>';
const from = `${name} ${email}`;

if (Meteor.isServer) {
    process.env.MAIL_URL = "smtp.gmail.com" ;
}

Meteor.methods({
    'email.send'(to, from, subject, html) {            
        debugger;
        this.unblock();
        return Email.send({ to, from, subject, html });
  }
});