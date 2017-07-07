import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import AccountsUIWrapper from './AccountUIWrapper';
import './navigation.css';

class Navigation extends Component {
    render() {
        let {currentUser} = this.props;
        return (
            <nav className="navbar navbar-default navigation-clean">
                <div className="container">
                    <div className="navbar-header"><a href="/" className="navbar-brand navbar-link">Imobiliária</a>
                        <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                    </div>                  
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li role="presentation">
                                <IndexLink to="/" activeClassName="active"> Início </IndexLink>
                            </li>
                            <li role="presentation">
                                <Link to="/imoveis/comprar" activeClassName="active">Vendas</Link>                                
                            </li>
                            <li role="presentation">
                                <Link to="/imoveis/alugar" activeClassName="active">Locação</Link>
                            </li>
                            <li role="presentation">
                                <Link to="/quem-somos" activeClassName="active">Quem Somos</Link>
                            </li>
                            <li role="presentation">
                                <Link to="/contato" activeClassName="active">Contato</Link>
                            </li>
                            {
                                currentUser && 
                                    <li role="presentation">
                                        <Link to="/novo-imovel" activeClassName="active">Novo Imóvel</Link>
                                    </li>
                            }
                            {
                                currentUser && 
                                    <li className="align-right"><AccountsUIWrapper /></li>
                            }
                        </ul>
                    </div>
                </div>                
                <div className="nav-custom">
                    <div className="container nav-custom-item"> 47 99999-3333 </div>
                    <div className="container nav-custom-item"> 47  3333-3333 </div>
                    <div className="container nav-custom-item"> joaoeffting@gmail.com </div>
                </div>                 
            </nav>             
        );
    }
}

export default Navigation;