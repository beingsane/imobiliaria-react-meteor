import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Imoveis} from '../../api/imoveis';
import Contato from '../Contato';
import './imovel-detalhe.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Utils} from '../../utils/Utils';

class ImovelDetalhe extends Component {
    render() { 
        if (!this.props.imovel) return (<div> Sem imóveis cadastrados. </div>);
        let settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            customPaging: (i) => {
                return <a><img className="img-preview" src={this.props.imovel.fotos[i].url}/></a>
            },
        };
        const {codigo, nome, favorito, cidade, bairro, dormitorios, suites, banheiros, garagem, area, tipo, descricao, valor} = this.props.imovel;            

        return (
            <div className="container">
                <h1 className="text-center">{nome}</h1>
                <div className="row">
                    <div className="col-md-7">
                        <Slider 
                            {...settings}
                        >
                            {
                                this.props.imovel.fotos.map((foto, i) => {
                                    return (
                                        <div 
                                            key={i}
                                            style={{
                                                background: `url(${foto.url})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                height: '500px'
                                            }}
                                        >
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>   

                    <div className="col-md-5">
                        <div className="row" style={{marginTop: '30px'}}>
                            <div className="col-md-12">                            
                                <h2 className="text-left text-success">VALOR: R$ {Utils.setMoeda(valor.toString())}</h2></div>
                            <div className="col-md-12"><strong>Código </strong>
                                <p> {codigo}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Cidade </strong>
                                <p> {cidade}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Bairro </strong>
                                <p> {bairro}</p>
                            </div>                                                        
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Dormitórios </strong>
                                <p> {dormitorios}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Suítes </strong>
                                <p> {suites}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Banheiros </strong>
                                <p> {banheiros}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Garagem </strong>
                                <p> {garagem}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Área m2 </strong>
                                <p> {area}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-6"><strong>Tipo </strong>
                                <p> {tipo}</p>
                            </div>
                            <div className="col-md-12"><strong>Descrição </strong>
                                <p> {descricao} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Contato 
                    codigoImovel={codigo}
                />
            </div>
        );
    }
}

export default createContainer(({params}) => {
    Meteor.subscribe('imoveis');
    return {
        imovel: Imoveis.findOne({_id: params.id}),
    };
}, ImovelDetalhe);