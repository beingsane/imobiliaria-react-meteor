import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';

const initState = {
    valorDe: ''
}

class Filtro extends Component {
    constructor() {
        super();
        this.state = initState;
    }
    
    render() {
        let {valorDe} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Código </label>
                        <input type="text" name="text-input" id="text-input" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Valor De</label>
                        <input 
                            type="text" 
                            name="text-input"
                            value={valorDe}
                            onChange={(e) => this.setState({valorDe: e.currentTarget.value})}
                            onBlur={this.props.aplicarFiltro}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Valor Até</label>
                        <input type="text" name="text-input" id="text-input" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Bairro </label>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Fortaleza</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Garcia</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Itoupava Seca</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Vila Nova</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Tipo </label>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Casa</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Apartamento</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Galpão</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />Comercial</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Área De</label>
                        <input type="text" name="text-input" id="text-input" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Área Até</label>
                        <input type="text" name="text-input" id="text-input" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Dormitórios </label>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />0</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />1</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />2</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />3</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                     <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Suítes </label>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />0</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />1</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />2</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />3</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label htmlFor="text-input" className="control-label">Vagas </label>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />0</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />1</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />2</label>
                        </div>
                        <div className="checkbox">
                            <label className="control-label">
                                <input type="checkbox" />3</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filtro;