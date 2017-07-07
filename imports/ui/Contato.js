import React, { Component } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import Button from 'react-bootstrap-button-loader';
import { Meteor } from 'meteor/meteor';

const initState = {
    nome: '',
    assunto: '',
    email: '',
    telefone: '',
    mensagem: '',
    enviando: false
}

class Contato extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
        this.onEnviarClick = this.onEnviarClick.bind(this);        
        this.telefoneMask = this.telefoneMask.bind(this);
    }        

    onEnviarClick() {
        const {nome, assunto, email, telefone, mensagem} = this.state;
        const data = {
            nome,
            assunto,
            email,
            telefone,
            mensagem
        }
        let mensagemEmail = mensagem;
        if (this.props.codigoImovel) mensagemEmail += ' Código do imóvel: ' + this.props.codigoImovel;
        
        if(  nome.length < 4 )
		{
			Bert.alert( "Preencha o campo NOME corretamente, pelo menos 4 caracteres!", 'danger',  'growl-top-right' );
			document.getElementById('name').focus();
			return false;
		}		 

        if( assunto.length < 4 )
		{
			Bert.alert( "Preencha o campo ASSUNTO corretamente, pelo menos 4 caracteres!", 'danger',  'growl-top-right' );
			document.getElementById('subject').focus();
			return false;
		}		 
		 
		if( email.indexOf('@')==-1 || email.indexOf('.')==-1 )
		{
			Bert.alert( "Preencha o campo E-MAIL corretamente, coloque '@' e '.' !", 'danger',  'growl-top-right' );
			document.getElementById('email').focus();
			return false;
		}
		 
		if ( mensagemEmail.length < 30 )
		{
			Bert.alert( "É necessario preencher o campo MENSAGEM com mais de 30 caracteres!", 'danger',  'growl-top-right' );
			document.getElementById('message').focus();
			return false;
		}

        this.setState({enviando: true});    
        Meteor.call('email.send',
            'Contato <joao.effting@gmail.com>',
            'joao.effting@gmail.com',
            assunto,
            'Nome: ' + nome + '<p>' + 
            'Email: ' + email + '<p>' +
            'Telefone: ' + telefone + '<p>' +
            'Mensagem: ' + mensagemEmail,  
            (error, result) => {
                this.setState({enviando: false});
                if (error) {                    
                    Bert.alert( `E-mail não enviado, ${error.reason}!`, 'danger', 'growl-top-right' );      
                } else {
                    this.setState(initState);
                    document.getElementById('name').focus();
                    Bert.alert( 'E-mail enviado!', 'success', 'growl-top-right' );      
                }                
            }            
        );    
    }    

    telefoneMask(valor){
        valor=valor.replace(/\D/g,"") //Remove tudo o que não é dígito
        valor=valor.replace(/^(\d\d)(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
        valor=valor.replace(/(\d{5})(\d)/,"$1 - $2") //Coloca hífen entre o quinto e o sexto dígitos
        return valor
    }

    render() {
        const {nome, assunto, email, telefone, mensagem, enviando} = this.state;
        return (
            <div className="container">
                <form name="contact-form" id="contact-form">
                    <h2 className="text-center">Contato</h2>
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
                        <label htmlFor="subject" className="control-label">Assunto </label>
                        <input 
                            type="text" 
                            name="subject" 
                            className="form-control" 
                            id="subject"
                            value={assunto} 
                            onChange={(e) => this.setState({assunto: e.currentTarget.value})}                            
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="email" className="control-label">E-mail </label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            id="email"
                            value={email} 
                            onChange={(e) => this.setState({email: e.currentTarget.value})}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="phone" className="control-label">Telefone </label>
                        <input 
                            type="tel" 
                            name="phone" 
                            className="form-control" 
                            id="phone"
                            value={telefone} 
                            onChange={(e) => this.setState({telefone: this.telefoneMask(e.currentTarget.value)})}
                        />
                    </div>              
                    <div className="form-group col-md-12">
                        <label htmlFor="message" className="control-label">Mensagem </label>
                        <textarea 
                            name="message" 
                            className="form-control" 
                            id="message"
                            rows="10"
                            value={mensagem}
                            onChange={(e) => this.setState({mensagem: e.currentTarget.value})}
                        >
                        </textarea>
                    </div>
                    <div className="form-group col-md-12">
                        <Button 
                            bsStyle="primary"
                            type="button" 
                            onClick={this.onEnviarClick}
                            loading={enviando}
                            >
                            {enviando ? 'Enviando' : 'Enviar'} 
                        </Button>                        
                    </div>
                </form>     
            </div>         
        );
    }
}

export default Contato;
