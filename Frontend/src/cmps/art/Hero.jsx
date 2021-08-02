import React from 'react';
import Carousel from 'react-material-ui-carousel';

export class Hero extends React.Component {


  render() {
    return (
      <div className="carousel-container">
        <div className="main-hero-content">
        <h1>Discover & Purchase art by top artists</h1>
        </div>
      
          <Carousel className="heros-container">
            <img src="//cdn.shopify.com/s/files/1/0941/7736/collections/cbffcc8c9add2367bcfafdc667fc32ca_720x.jpg?v=1620254082" alt=""/>
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/AlyssaKrause-Banner01_2048x.jpg?v=1627522071" alt="" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/NeilKryszak-Banner04_9eb5db4e-bbf2-4393-9be5-c90a55c524c3_2048x.jpg?v=1627357646" alt="" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/VIPPreview-July-Banner01_2048x.jpg?v=1626915901" alt="" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/files/fn_Banner02_2048x.jpg?v=1622560108" alt="Banner" />
            <img src="//cdn.shopify.com/s/files/1/0941/7736/collections/e9829f42df364e29b86ee2fed5f7f32c_1728x.jpg?v=1620254074" alt="Banner" />
            {/* <img src="//cdn.shopify.com/s/files/1/0941/7736/files/EthanCaflisch-Banner001_2048x.jpg?v=1622560162" alt="EthanCaflisch" /> */}
            {/* <img src="//cdn.shopify.com/s/files/1/0941/7736/files/ErikoTsogo-Banner02_4e4b90b9-1a59-4927-abe7-2f8e48cd1a80_2048x.jpg?v=1621907690" alt="ErikoTsogo" /> */}
            {/* <img src="//cdn.shopify.com/s/files/1/0941/7736/files/MayVIPPreview-Banner01_2048x.jpg?v=1621475373" alt="MayVIP" /> */}
            {/* <img src="//cdn.shopify.com/s/files/1/0941/7736/files/SaraMarloweHall-Banner01_2048x.jpg?v=1621301210" alt="SaraMarloweHall" />  */}
          </Carousel>
        </div>

    );
  }
}
