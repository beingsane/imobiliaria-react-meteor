import React, { Component } from 'react';
import FileInput from 'react-file-input';
import { Meteor } from 'meteor/meteor';
import Button from 'react-bootstrap-button-loader';
import Modal from 'react-bootstrap/lib/Modal';

const initState = {
    file: '',
    ordem: '',
    fotos: [],
    cadastrando: false,
    isEditing: false,
    id: '',
    public_id: '',
    modalIsOpen: false
}

class ImovelFotos extends Component {
    constructor() {
        super();
        this.state = initState;

        this.adicionarFoto = this.adicionarFoto.bind(this);
        this.removerFoto = this.removerFoto.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSalvarClick = this.onSalvarClick.bind(this);
        this.uploadWidget = this.uploadWidget.bind(this);
        this.removerFotoDoCloudnary = this.removerFotoDoCloudnary.bind(this);
        this.handleOnExcluir = this.handleOnExcluir.bind(this);
        this.handleFecharModal = this.handleFecharModal.bind(this);
    }
    componentDidMount() {
        if (this.props.imovel) this.setStateImovel(this.props.imovel);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.imovel) {
            this.setStateImovel(nextProps.imovel);
        } else {
            this.setState(initState);
        }
    }
    setStateImovel(imovel) {
        const {fotos, _id} = imovel;
        this.setState({fotos, id: _id})
    }
    adicionarFoto() {
        let reader = new FileReader();
        reader.readAsDataURL(this.state.file);
        reader.onload = () => {
            let newFoto = {
                file: reader.result,
                ordem: this.state.ordem,
                id: (((1+Math.random())*0x10000)|0).toString(16).substring(1)
            }

            this.setState(prevState => {
                return {
                    fotos: prevState.fotos.concat(newFoto)
                }
            });
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    removerFoto(fotoId) {
        let fotos = this.state.fotos.filter(foto => foto.id != fotoId);
        this.setState({fotos});
    }
    onChangeFile(file) {
        this.setState({file: file.currentTarget.files[0]})
    }
    onSalvarClick() {
        let data = {
            fotos: this.state.fotos,
            imovelGuid: this.props.imovelGuid || this.state.id
        }
        this.setState({cadastrando: true});
        Meteor.call('imoveis.inserirFoto', data);
    }
    uploadWidget() {
        cloudinary.openUploadWidget({ cloud_name: 'dqzi841ez', upload_preset: 'fpt8worz', tags:['imoveis']},
            (error, result) => {
                if (!error) {
                    let newFotos = this.state.fotos.map(foto => {
                        if (!foto.ordem)
                            return {
                                ...foto,
                                ordem: 0
                            }
                        return foto;
                    })
                    let fotos = [
                        ...newFotos,
                        ...result.map(foto => {
                            return {
                                ...foto,
                                ordem: 0
                            }
                        })
                    ]
                    this.setState({fotos}, () => this.onSalvarClick());
                    Bert.alert( 'Foto(s) adicionada(s) com sucesso!', 'success', 'growl-top-right' );      
                }
            });
    }
    removerFotoDoCloudnary(public_id) {
        Meteor.call('imoveis.detele.from.cloudinary', public_id, (error, result) => {
            if (result.result === 'ok') {
                let fotos = this.state.fotos.filter(foto => foto.public_id !== public_id);
                this.setState({fotos}, () => this.onSalvarClick());
                Bert.alert( 'Foto removida com sucesso!', 'success', 'growl-top-right' );      
            }
        })
    }
    handleOnExcluir(public_id) {
        this.removerFotoDoCloudnary(this.state.public_id);
        this.handleFecharModal();
    }
    handleFecharModal() {
        this.setState({public_id: -1, modalIsOpen: false});
    }
    render() {
        let {fotos, ordem, cadastrando, isEditing} = this.state;
        let buttonText = cadastrando ? "Cadastrando" : "Cadastrar";
        if (isEditing) {
            buttonText = cadastrando ? "Alterando" : "Alterar";
        }
        return (
            <div className="container">
                <button onClick={this.uploadWidget} className="btn btn-info">
                    Add Image
                </button>
                {
                        fotos.length > 0 &&
                            <div className="jumbotron col-md-12">
                                <div className="row">
                                {
                                    fotos.sort((a,b) => a.ordem - b.ordem).map(foto => {
                                        return (
                                            <div className="col-md-4" key={foto.public_id}>
                                                <div className="thumbnail">
                                                    <img src={foto.url}/>
                                                    <div className="caption">
                                                        <label>Ordem: 
                                                            <input 
                                                                type="number"
                                                                value={foto.ordem}
                                                                onChange={(e) => {
                                                                    let newFotos = this.state.fotos.map(fotoState => {
                                                                        if (fotoState.public_id === foto.public_id) {
                                                                            return {
                                                                                ...fotoState,
                                                                                ordem: e.currentTarget.value
                                                                            }
                                                                        }
                                                                        return fotoState
                                                                    })
                                                                    this.setState({fotos: newFotos});
                                                                }}
                                                                onBlur={this.onSalvarClick}
                                                            />
                                                        </label>
                                                        <button 
                                                            className="btn btn-danger" 
                                                            type="button"
                                                            onClick={() => this.setState({public_id: foto.public_id, modalIsOpen: true})}
                                                        >
                                                            Remover 
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                    }
                    {
                        this.state.modalIsOpen &&
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>Exclusão de Foto</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    Deseja realmente excluir esta Foto?
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

export default ImovelFotos;