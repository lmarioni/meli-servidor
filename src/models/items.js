const fetch = require('isomorphic-fetch');
const { formatMoney } = require('accounting');

let itemsModel = {};

itemsModel.getItems = async (query,callback) => {
  const urlRequest = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`;

    const res = await fetch(urlRequest);
    const data = await res.json()

    let respuesta = {};

      //recorro las categorias para sacar solo los nombres
    const categories = data.available_filters[0].values.map(categoria => {
        return categoria.name;
      })

      //saco los datos que pide de los resultados
      const items = data.results.map(result => {
        const [amount, decimals] = formatMoney(result.price, '', 2, '.', ',').split(',');

        return {
          id: result.id,
          title: result.title,
          price: {
            currency: result.currency_id,
            amount,
            decimals
          },
          picture: result.thumbnail,
          condition: result.condition,
          free_shipping: result.shipping.free_shipping
        }
      })

      //junto arr re respuestas
      //no me trae nada la api de meli entonces pongo mi nombre y apellido aca
      respuesta = {
        author: {
          name: "Lucas",
          lastname: "Marioni"
        },
        categories,
        items
      }

    callback(null, respuesta);
}



itemsModel.getItem = async (id,callback) => {

    const urlRequestInfo = `https://api.mercadolibre.com/items/${id}`;
    const urlRequestDescription = `https://api.mercadolibre.com/items/${id}/description`;
  
    const [itemInfo, descriptionInfo] = await Promise.all([
      fetch(urlRequestInfo).then(res => res.json()),
      fetch(urlRequestDescription).then(res => res.json())
    ])
    const [amount, decimals] = formatMoney(itemInfo.price, '', 2, '.', ',').split(',');

    //no me trae nada la api de meli entonces pongo mi nombre y apellido en author
     const respuesta = {
      author: { 
        name: "Lucas",
        lastname: "Marioni"
      },
      item: {
        id: itemInfo.id,
        title: itemInfo.title,
        price: {
          currency: itemInfo.currency_id,
         amount,
         decimals
        },
        picture: itemInfo.pictures[0].url,
        condition: itemInfo.condition,
        free_shipping: itemInfo.shipping.free_shipping,
        sold_quantity: itemInfo.sold_quantity,
        description: descriptionInfo.plain_text
      } 
     }
    callback(null, respuesta);
}

module.exports = itemsModel;
