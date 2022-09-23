import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
  return (
    <div className="home">
        <div className="home__container">
            <img className="home__img" src="https://m.media-amazon.com/images/I/61MblfJ+DvL._SX1500_.jpg" alt="Home Image Background" />
            <div className="home__row">
                <Product id="1234567"
                title="Samsung Galaxy 22" price={199.99} rating={5} image="https://images.priceoye.pk/samsung-galaxy-note10-5g-sd855-pakistan-priceoye-5bakh.jpg"/>
                
                <Product id="1234568"
                title="Lava Z3 Pro (3GB RAM, 32GB Storage)- Cyan"
                price={666.66} rating={3}
                image="https://images-eu.ssl-images-amazon.com/images/I/41CCUjuCNeL._SX300_SY300_QL70_FMwebp_.jpg"
                />    
            </div>
            <div className="home__row">
            <Product id="1234569"
                title="Samsung Galaxy 22" price={199.99} rating={5} image="https://images.priceoye.pk/samsung-galaxy-note10-5g-sd855-pakistan-priceoye-5bakh.jpg"/>
                
                <Product id="1234570"
                title="Lava Z3 Pro (3GB RAM, 32GB Storage)- Cyan"
                price={666.66} rating={3}
                image="https://images-eu.ssl-images-amazon.com/images/I/41CCUjuCNeL._SX300_SY300_QL70_FMwebp_.jpg"
                />
                <Product id="1234571"
                title="Samsung Galaxy 22" price={199.99} rating={5} image="https://images.priceoye.pk/samsung-galaxy-note10-5g-sd855-pakistan-priceoye-5bakh.jpg"/>
                
            </div>
            <div className="home__row">
                <Product id="1234572"
                title="LG 80 cm (32 inches) HD Ready Smart LED TV 32LM563BPTC"
                price={2966.66} rating={4}
                image="https://m.media-amazon.com/images/S/aplus-media-library-service-media/9589e869-71dd-462d-bce9-49f591b9b602.__CR0,0,1464,600_PT0_SX1464_V1___.jpg"
                />
            </div>
        </div>

    </div>
  )
}

export default Home