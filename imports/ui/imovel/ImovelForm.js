import React, { Component } from 'react';
import CepApi from 'cep-promise';
import { Meteor } from 'meteor/meteor';
import Button from 'react-bootstrap-button-loader';
import {Utils} from '../../utils/Utils';

const initState = {
    codigo: '',
    nome: '',
    favorito: false,
    descricao: '',
    cep: '',
    cidade: '',
    bairro: '',
    estado: '',
    rua: '',
    numero: '',
    valor: '',
    tipo: 'selecione',
    dormitorios: '',
    suites: '',
    banheiros: '',
    garagem: '',
    area: '',
    alugar: false,
    comprar: true,
    cadastrando: false,
    isEditing: false,
    id: -1
}

class ImovelForm extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
        this.buscarCep = this.buscarCep.bind(this);
        this.onAdicionarClick = this.onAdicionarClick.bind(this);
        this.setStateImovel = this.setStateImovel.bind(this);
        this.handleChange = this.handleChange.bind(this);        
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
        const {
            codigo, nome, favorito, descricao, cep, cidade, bairro, estado, rua, numero, valor,
            tipo, dormitorios, suites, banheiros, garagem, alugar, comprar, area, _id, fotos
        } = imovel;
        this.setState({
            codigo,
            nome, 
            favorito,
            descricao, 
            cep, 
            cidade, 
            bairro, 
            estado, 
            rua, 
            numero,
            valor: valor.toString(),
            tipo,
            dormitorios,
            suites,
            banheiros,
            garagem,
            alugar,
            comprar,
            area,
            id: _id,
            isEditing: true,
            fotos
        })
    }
    buscarCep() {
        let {cep} = this.state;
        if( document.getElementById('cep').value != "" ) 
        {
            CepApi(cep)
                .then(res => {
                    let {city, neighborhood, state, street} = res;
                    this.setState({
                        cidade: city,
                        bairro: neighborhood,
                        estado: state,
                        rua: street
                    });
                })
                .catch(e => {
                    alert(e.message)
                })
        }       
    }
    onAdicionarClick() {
        const {
            nome, favorito, descricao, cep, cidade, bairro, estado, rua, numero, valor,
            tipo, dormitorios, suites, banheiros, garagem, alugar, comprar, area, id, fotos
        } = this.state;
        let valorMoeda = valor.replace(".", "");
        let data = {
            nome, 
            favorito,
            descricao, 
            cep, 
            cidade, 
            bairro, 
            estado, 
            rua, 
            numero,
            valor,
            tipo,
            dormitorios,
            suites,
            banheiros,
            garagem,
            alugar,
            comprar,
            area,
            id,
            fotos: fotos && fotos.length > 0 ? fotos : []
        }        

        this.setState({cadastrando: true});
        let meteorMethod = 'imoveis.inserir';
        if (this.state.isEditing) meteorMethod = 'imoveis.update';
        
        if( nome.length < 4)
		{
			Bert.alert( "Preencha o campo NOME corretamente, pelo menos 4 caracteres!", 'danger',  'growl-top-right' );
			document.getElementById('name').focus();
            this.setState({cadastrando: false});
            return false;			
		}		 
        
        if( document.getElementById('cep').value == "" )
		{
			Bert.alert( "Preencha o campo CEP corretamente!", 'danger',  'growl-top-right' );
			document.getElementById('cep').focus();
			this.setState({cadastrando: false});
            return false;	
		}	

		if ( document.getElementById('street').value == "" )
		{
			Bert.alert( "Preencha o campo RUA!", 'danger',  'growl-top-right' );
			document.getElementById('street').focus();
			this.setState({cadastrando: false});
            return false;	
		}        

		if ( document.getElementById('rating').value == 0 )
		{
			Bert.alert( "Preencha o campo VALOR!", 'danger',  'growl-top-right' );
			document.getElementById('rating').focus();
			this.setState({cadastrando: false});
            return false;	
		}  
        
		if ( document.getElementById('typeHouse').value == "selecione" )
		{
			Bert.alert( "Preencha o campo TIPO!", 'danger',  'growl-top-right' );
			document.getElementById('typeHouse').focus();
			this.setState({cadastrando: false});
            return false;	
		}
        Meteor.call(meteorMethod, data, (error, result) => {
            this.setState({cadastrando: false});
            if (error) {
                Bert.alert( `Erro, ${error.reason}!`, 'danger', 'growl-top-right' );      
            } else {
                this.props.changeTab();
                this.props.setImovelGuid(result);
                this.setState(initState);
                Bert.alert( 'Cadastro realizado com sucesso!', 'success', 'growl-top-right' );      
            }
        });
    }

    handleChange() {
      this.setState({
            favorito: !this.state.favorito      
     })
    }

    render() {
        const {
            codigo, nome, favorito, descricao, cep, cidade, bairro, estado, rua, numero, valor,
            tipo, dormitorios, suites, banheiros, garagem, alugar, comprar, area, cadastrando, isEditing
        } = this.state;
        let buttonText = cadastrando ? "Cadastrando" : "Cadastrar";
        if (isEditing) {
            buttonText = cadastrando ? "Alterando" : "Alterar";
        }
        return (
            <form className="bootstrap-form-with-validation">
                <h2 className="text-center">Cadastro de Imóvel</h2>

                <div className="form-group col-md-12">
                    <label htmlFor="name" className="control-label">Nome </label>
                    <input 
                        type="text" 
                        name="name"                                                 
                        className="form-control" 
                        id="name"
                        value={nome}
                        onChange={(e) => this.setState({nome: e.currentTarget.value})}                        
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="cep" className="control-label">CEP </label>
                    <input 
                        type="number" 
                        name="cep" 
                        className="form-control" 
                        id="cep"
                        value={cep}
                        onChange={(e) => this.setState({cep: e.currentTarget.value})}                        
                        onBlur={this.buscarCep}
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="city" className="control-label">Cidade </label>
                    <input 
                        type="text" 
                        name="city" 
                        disabled className="form-control" 
                        id="city"
                        value={cidade} 
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="district" className="control-label">Bairro </label>
                    <input 
                        type="text" 
                        name="district" 
                        disabled 
                        className="form-control" 
                        id="district"
                        value={bairro} 
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="state" className="control-label">Estado </label>
                    <input 
                        type="text" 
                        name="state" 
                        disabled 
                        className="form-control" 
                        id="state"
                        value={estado} 
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="street" className="control-label">Rua </label>
                    <input 
                        type="text" 
                        name="street" 
                        className="form-control" 
                        id="street"
                        value={rua}
                        onChange={(e) => this.setState({rua: e.currentTarget.value})} 
                    />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="numberHouse" className="control-label">Número </label>
                    <input 
                        type="number" 
                        name="numberHouse" 
                        className="form-control" 
                        id="numberHouse"
                        value={numero}
                        onChange={(e) => this.setState({numero: e.currentTarget.value})} 
                    />
                </div>

                <div className="form-group col-md-2">
                    <label htmlFor="rating" className="control-label">Valor </label>
                    <input 
                        type="text" 
                        name="rating" 
                        className="form-control" 
                        id="rating"
                        value={valor}                        
                        onChange={(e) => this.setState({valor: Utils.setMoeda(e.currentTarget.value)})}
                    />
                </div>

                <div className="form-group col-md-2">
                    <label htmlFor="typeHouse" className="control-label">Tipo </label>
                    <select 
                        name="typeHouse"
                        id="typeHouse"
                        className="form-control"
                        value={tipo}
                        onChange={(e) => this.setState({tipo: e.currentTarget.value})}
                    >
                        <option value="selecione">Selecione</option>
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="terreno">Terreno</option>
                        <option value="galpao">Galpão</option>
                        <option value="sala-comercial">Sala Comercial</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                <div className="form-group col-md-1">
                    <label htmlFor="bedroom" className="control-label">Dorm. </label>
                    <input 
                        type="number" 
                        name="bedroom" 
                        id="bedroom"
                        className="form-control" 
                        value={dormitorios}
                        onChange={(e) => this.setState({dormitorios: e.currentTarget.value})} 
                    />
                </div>

                <div className="form-group col-md-1">
                    <label htmlFor="suites" className="control-label">Suítes </label>
                    <input 
                        type="number" 
                        name="suites" 
                        id="suites"
                        className="form-control" 
                        value={suites}
                        onChange={(e) => this.setState({suites: e.currentTarget.value})}
                    />
                </div>

                <div className="form-group col-md-2">
                    <label htmlFor="bath" className="control-label">Banheiros </label>
                    <input 
                        type="number" 
                        name="batht" 
                        id="bath"
                        className="form-control" 
                        value={banheiros}
                        onChange={(e) => this.setState({banheiros: e.currentTarget.value})}
                    />
                </div>

                <div className="form-group col-md-2">
                    <label htmlFor="garage" className="control-label">Garagem </label>
                    <input 
                        type="number" 
                        name="garage" 
                        id="garage"
                        className="form-control" 
                        value={garagem}
                        onChange={(e) => this.setState({garagem: e.currentTarget.value})} 
                    />
                </div>

                <div className="form-group col-md-2">
                    <label htmlFor="sizeHouse" className="control-label">M²</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        name="sizeHouse" 
                        id="sizeHouse"
                        value={area}
                        onChange={(e) => this.setState({area: e.currentTarget.value})}
                    />
                </div>

                <div className="form-group col-md-12">
                    <div className="checkbox">
                        <label className="control-label">
                            <input 
                                type="checkbox"
                                name="favorito"
                                checked={this.state.favorito}
                                onChange={this.handleChange}   
                            />
                                Favorito
                        </label>
                    </div>
                </div>             

                <div className="form-group col-md-12">
                    <div className="radio">
                        <label className="control-label">
                            <input 
                                type="radio" 
                                name="radio-group"
                                checked={alugar}
                                onChange={(e) => {
                                    this.setState(prevState => {
                                        return {
                                            alugar: true,
                                            comprar: false
                                        }
                                    })
                                }}
                            /> 
                            Alugar
                        </label>
                    </div>
                    <div className="radio">
                        <label className="control-label">
                            <input 
                                type="radio" 
                                name="radio-group" 
                                checked={comprar}
                                onChange={(e) => {
                                    this.setState(prevState => {
                                        return {
                                            alugar: false,
                                            comprar: true
                                        }
                                    });
                                }}
                            /> 
                            Vender
                        </label>
                    </div>
                </div>                

                <div className="form-group col-md-12">
                    <label htmlFor="description" className="control-label">Descrição </label>
                    <textarea 
                        name="description" 
                        className="form-control" 
                        id="description"
                        value={descricao}
                        onChange={(e) => this.setState({descricao: e.currentTarget.value})}
                        rows="10"
                    >
                    </textarea>
                </div>
                <div className="form-group col-md-12">
                    <Button 
                        bsStyle="primary"
                        type="button" 
                        onClick={this.onAdicionarClick}
                        loading={cadastrando}
                    >
                        {buttonText}
                    </Button>
                </div>
            </form>
        );
    }
}

export default ImovelForm;