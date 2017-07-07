import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Imoveis} from '../../api/imoveis';
import ImovelForm from './ImovelForm';
import ImovelFotos from './ImovelFotos';

class Imovel extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {
                    id: 1,
                    nome: 'Dados do Imóvel',
                    active: true,
                    disabled: false
                },
                {
                    id: 2,
                    nome: 'Fotos do Imóvel',
                    active: false,
                    disabled: true
                }
            ],
            imovelGuid: ''
        }

        this.changeTab = this.changeTab.bind(this);
        this.setImovelGuid = this.setImovelGuid.bind(this);
    }

    componentDidMount() {
        if (this.props.imovel) {
            let tabs = this.state.tabs.map(tab => {
                return {
                    ...tab,
                    disabled: false
                }
            })
            this.setState({tabs});
        }
    }
    changeTab() { 
        let tabs = this.state.tabs.map(tab => {
            return {
                ...tab,
                active: !tab.active,
                disabled: false
            }
        });
        
        this.setState({tabs});
    }
    setImovelGuid(imovelGuid) {
        this.setState({imovelGuid});
    }
    render() {
        let activeTab = this.state.tabs.find(tab => tab.active);
        return (
            <div className="container">
                <ul className="nav nav-tabs">
                    {
                        this.state.tabs.map(tab => {
                            let tabClassName = "";
                            if (tab.active) tabClassName += " active";
                            if (tab.disabled) tabClassName += " disabled";
                            return (
                                <li className={tabClassName} key={tab.id}>
                                    <a href={`#tab-${tab.id}`} role="tab" data-toggle={tab.disabled ? "" : "tab"}>{tab.nome}</a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className={activeTab.id == 1 ? "tab-pane active" : "tab-pane"} id="tab-1">
                        <ImovelForm
                            imovel={this.props.imovel}
                            changeTab={this.changeTab}
                            setImovelGuid={this.setImovelGuid}
                        />
                    </div>
                    <div role="tabpanel" className={activeTab.id == 2 ? "tab-pane active" : "tab-pane"} id="tab-2">
                        <ImovelFotos 
                            imovel={this.props.imovel}
                            imovelGuid={this.state.imovelGuid}
                            changeTab={this.changeTab}
                        />
                    </div>
                </div>
            </div>       
        );
    }
}

export default createContainer(({params}) => {
    Meteor.subscribe('imoveis');
    return {
        imovel: Imoveis.findOne({_id: params.id}),
    };
}, Imovel);