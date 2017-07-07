import AccountsUI from 'meteor/ian:accounts-ui-bootstrap-3';
import { Accounts } from 'meteor/accounts-base';
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

AccountsUI.accountsUIBootstrap3.setLanguage('pt-BR');

AccountsUI.accountsUIBootstrap3.map('pt-BR', {
  loginButtonsLoggedOutDropdown: {
    signIn: "Entrar",
    up: " "
  }
});