// import React, { useContext, useEffect, useState } from 'react';
// import './Home.css';
// import { CoinContext } from '../../context/CoinContext';

// const Home = () => {
//   const { allCoin, currency } = useContext(CoinContext);
//   const [displayCoin, setDisplayCoin] = useState([]);
//   const [input, setInput] = useState('');

//   const inputHandler =(event)=>{
//     setInput(event.target.value);

//   }
//   const searchHandler = async (event)=>{
//        event.preventDefault();
//        const coins = await allCoin.filter((item)=>{
//         return item.name.toLowerCase().includes(input.toLowerCase())
//        })
//        setDisplayCoin(coins)
//   }

//   useEffect(() => {
//     setDisplayCoin(allCoin);
//   }, [allCoin]);

//   return (
//     <div className='home'>
//       <div className='hero'>
//         <h1>Largest <br /> Crypto Marketplace</h1>
//         <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
//         <form onSubmit={searchHandler}>
//           <input onChangetype={inputHandler} value={input} type="text" placeholder="Search crypto.." required/>
//           <button type='submit'>Search</button>
//         </form>
//       </div>
//       <div className="crypto-table">
//         <div className="table-layout">
//           <p>#</p>
//           <p>Coins</p>
//           <p>Price</p>
//           <p style={{ textAlign: "center" }}>24H Change</p>
//           <p className='market-cap'>Market Cap</p>
//         </div>
//         {
//           displayCoin.slice(0, 10).map((item, index) => (
//             <div className="table-layout" key={index}>
//               <p>{item.market_cap_rank}</p>
//               <div>
//                 <img src={item.image} alt={item.name} />
//                 <p>{`${item.name} - ${item.symbol}`}</p>
//               </div>
//               <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
//               <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
//                 {Math.floor(item.price_change_percentage_24h * 100) / 100}%
//               </p>
//               <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  // Handle input changes
  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  // Handle search form submission
  const searchHandler = (event) => {
    event.preventDefault();
    if (input.trim() === '') {
      // Reset displayCoin when input is cleared
      setDisplayCoin(allCoin);
    } else {
      const filteredCoins = allCoin.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setDisplayCoin(filteredCoins);
    }
  };

  // Sync displayCoin with allCoin
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>




          <input
            onChange={inputHandler} list='coinlist'
            value={input}
            type="text"
            placeholder="Search crypto..."
            required
          />
          <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name} />))}

          </datalist>








          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={item.id || item.market_cap_rank}>
            <p>{item.market_cap_rank || 'N/A'}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{`${item.name} - ${item.symbol?.toUpperCase() || 'N/A'}`}</p>
            </div>
            <p>
              {currency.symbol}{' '}
              {item.current_price
                ? item.current_price.toLocaleString()
                : 'N/A'}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}
            >
              {item.price_change_percentage_24h
                ? `${(Math.floor(item.price_change_percentage_24h * 100) / 100).toFixed(2)}%`
                : 'N/A'}
            </p>
            <p className="market-cap">
              {currency.symbol}{' '}
              {item.market_cap ? item.market_cap.toLocaleString() : 'N/A'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

