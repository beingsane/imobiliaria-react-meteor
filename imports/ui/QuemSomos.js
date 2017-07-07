import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'black', background: 'transparent',
    height: 40, width: 60, top: -20, left: -30,    
  }}>
    <b>{text}</b>
  </div>
);

 class QuemSomos extends Component { 
    render() {
        return (
            <div className="container">
                <div style={{width: '100%', height: '400px'}}> 
                    <form className="bootstrap-form-with-validation">
                        <h2 className="text-center">Quem Somos</h2>
                        <p> Em construção. </p>                    
                    </form>
                        <GoogleMapReact
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >          
                            <AnyReactComponent
                                lat={this.props.center.lat}
                                lng={this.props.center.lng}
                                text={'Imobiliária'}
                            />                            
                        </GoogleMapReact>                    
                </div>
            </div>                
        );
    }
}

QuemSomos.defaultProps = {
    center: {lat: -26.9218789, lng: -49.0639588},
    zoom: 16
}

export default QuemSomos;  