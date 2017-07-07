import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import jQuery from 'jquery';
import $ from 'jquery';
import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.js';
import ImoveisList from '../imports/ui/imovel/ImoveisList';
import Imovel from '../imports/ui/imovel/';
import ImovelDetalhe from '../imports/ui/imovel/ImovelDetalhe';
import QuemSomos from '../imports/ui/QuemSomos';
import Contato from '../imports/ui/Contato';
import AccountsUIWrapper from '../imports/ui/AccountUIWrapper';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
 
Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ImoveisList} />
            <Route path="/imoveis/:filter" component={ImoveisList} />
            <Route path="/novo-imovel" component={Imovel} />
            <Route path="/quem-somos" component={QuemSomos} />
            <Route path="/contato" component={Contato} />
            <Route path="/imovel/:id" component={ImovelDetalhe} />
            <Route path="/imovel/editar/:id" component={Imovel} />
            <Route path="/login" component={AccountsUIWrapper} />
        </Route>
    </Router>
    , document.getElementById('render-target'));
});