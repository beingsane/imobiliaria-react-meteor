import { Mongo } from 'meteor/mongo';

export const Imoveis = new Mongo.Collection('imoveis');

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

if (Meteor.isServer) {
  Meteor.publish('imoveis', function imoveisPublication(filter) {
    if (filter == 'comprar') {
      return Imoveis.find({comprar: true});
    } else if (filter == 'alugar') {
      return Imoveis.find({alugar: true});
    }
    return Imoveis.find();
  });

  Meteor.methods({
    'imoveis.detele.from.cloudinary'(public_id) {
      const cloudinaryApp = require('cloudinary');
      cloudinaryApp.config({ 
          cloud_name: 'dqzi841ez', 
          api_key: '355397563251371', 
          api_secret: 'W3nrTfbEG0VRAp_kSJVJqMfKbE0' 
      });
      return cloudinaryApp.v2.uploader.destroy(public_id);
    },
    'imoveis.inserir'(data) {
      
      if (Imoveis.find({}).count() === 0) {
        data.seq = 1;
      } else {
        data.seq = Imoveis.findOne({},{sort:{seq:-1}}).seq + 1 || 2;
      }
      data.codigo = `EI${pad(data.seq, 4)}`;
      return Imoveis.insert({
              ...data,
              createdAt: new Date(),
            }); 
    },
    'imoveis.update'(data) {
      return Imoveis.update({_id: data.id}, {$set: {...data}}, {upsert: true});
    },
    'imoveis.remove'(id) {
      return Imoveis.remove(id);
    },
    'imoveis.inserirFoto'(data) {
      const {fotos, imovelGuid} = data;
      return Imoveis.update({_id: imovelGuid}, {$set: {fotos: fotos}}, {upsert: false});
    },
    'imoveis.filtrar'() {
      return Imoveis.find({favorito: true});
    }
  });
}
