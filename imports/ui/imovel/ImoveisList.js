import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Link} from 'react-router';
import {Imoveis} from '../../api/imoveis';
import { Meteor } from 'meteor/meteor';
import Button from 'react-bootstrap-button-loader';
import Filtro from './Filtro';
import {browserHistory} from 'react-router';
import './imove-list.css';
import Modal from 'react-bootstrap/lib/Modal';

class ImoveisList extends Component {
    constructor() {
        super();
        this.state = {
            removendo: false
        }
        this.onRemoverImovel = this.onRemoverImovel.bind(this);
        this.aplicarFiltro = this.aplicarFiltro.bind(this);
        this.handleOnExcluir = this.handleOnExcluir.bind(this);
        this.handleFecharModal = this.handleFecharModal.bind(this);
    }
    onRemoverImovel(id) {
        this.setState({removendo: true});
        let imovel = this.props.imoveis.find(imovel => imovel._id === id);
        Meteor.call('imoveis.remove', id, (error, result) => {
            this.setState({removendo: false});
            if (error) {
                Bert.alert( `Erro, ${error.reason}!`, 'danger', 'growl-top-right' );      
            } else {
                Bert.alert( 'Imovel removido com sucesso!', 'success', 'growl-top-right' );
                for (let foto of imovel.fotos) {
                    
                    Meteor.call('imoveis.detele.from.cloudinary', foto.public_id);
                }
            }
        })
    }
    aplicarFiltro() {
        browserHistory.push('/?valorDe=1000,00')
    }
    handleOnExcluir() {
        this.onRemoverImovel(this.state.imovelId);
        this.handleFecharModal();
    }
    handleFecharModal() {
        this.setState({imovelId: -1, modalIsOpen: false});
    }
    render() {
        if (this.props.imoveis.length == 0) return (<div> Sem registros </div>);
        let {currentUser} = this.props;
        return (
            <div className="container">
                <div className="col-md-2">
                    {/*<Filtro 
                        aplicarFiltro={this.aplicarFiltro}
                    />*/}
                </div>
                <div className="col-md-10">
                    {
                        this.props.imoveis.map(imovel => {
                            let thumb = "/images/default.png";
                            if (imovel.fotos.length) {
                                thumb = imovel.fotos[0].url;
                            }
                            return (
                                <div className="col-md-4" key={imovel._id}>
                                    <div className="thumbnail">
                                        <div className="tamanhoImagem">
                                            <Link to={`/imovel/${imovel._id}`}> <img src={thumb} className="imageThumb"/></Link>
                                        </div>
                                        <div className="caption">
                                            <h3>{imovel.nome}</h3>
                                            {
                                                currentUser &&
                                                    <div className="imovel-actions">
                                                        <Link to={`/imovel/editar/${imovel._id}`}>Editar</Link>
                                                        <Button 
                                                            bsStyle="danger"
                                                            type="button" 
                                                            onClick={() => {
                                                                this.setState({imovelId: imovel._id, modalIsOpen: true})
                                                            }}
                                                            loading={this.state.removendo}
                                                        >
                                                            {this.state.removendo ? 'Removendo' : 'Remover'}
                                                        </Button>
                                                    </div> 
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    this.state.modalIsOpen &&
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Exclusão de imóvel</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Deseja realmente excluir este imóvel?
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.handleFecharModal}>Cancelar</Button>
                                <Button bsStyle="primary" onClick={this.handleOnExcluir}>Confirmar</Button>
                            </Modal.Footer>
                        </Modal.Dialog> 
                }
            </div>
        );
    }
}

export default createContainer(({params, location}) => {
    if (params.filter) 
        Meteor.subscribe('imoveis', params.filter)
    else Meteor.subscribe('imoveis');
    return {
        imoveis: Imoveis.find({favorito: true}).fetch(),
        currentUser: Meteor.user(),
    };
}, ImoveisList);