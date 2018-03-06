import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API = 'https://api.github.com/users';

class GitApi extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      username: 'varshapwalia',
      name:'',
      avatar:'',
      location:'',
      repos:'',
      followers: '',
      following:'',
      homeUrl:'',
      notFound:''
    }
  }
  fetchProfile(username) { 
    let url = `${API}/${username}`;
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        this.setState({
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message
        })
      })
      .catch((error) => console.log('Oops! . There Is A Problem') )
  }
  componentDidMount() {
    this.fetchProfile(this.state.username);
  }
  render() {
    return (
      <div>
         <section>
           <Profile data={this.state} />
         </section>
      </div>
    )
  }
}


class Profile extends React.Component {
  render() {
    let data = this.props.data;
    let followers = `${data.homeUrl}/followers`;
    let repositories = `${data.homeUrl}?tab=repositories`;
    let following = `${data.homeUrl}/following`;
    if (data.notFound === 'Not Found')
      return (
         <div>
            <h2>Oops !!!</h2>
            <p>The Component Couldn't Find The You Were Looking For . Try Again </p>
         </div>
      );
      else
      return (
        <section>
          <div>
            <a href={data.homeUrl} target="_blank" title={data.name || data.username}><img src={data.avatar} alt={data.username}/></a>
            <h2><a href={data.homeUrl} title={data.username} target="_blank">{data.name || data.username}</a></h2>
            <h3>{data.location || 'I Live In My Mind'}</h3>
          </div>
          <div>
            <ul>
               <li>
                  <a href={followers} target="_blank" title="Number Of Followers"><i>{data.followers}</i><span>Followers</span></a>
               </li>
               <li>
                  <a href={repositories} target="_blank" title="Number Of Repositoriy"><i>{data.repos}</i><span>Repositoriy</span></a>
               </li>
               <li>
                  <a href={following} target="_blank" title="Number Of Following"><i>{data.following}</i><span>Following</span></a>
               </li>
            </ul>
          </div>
        </section>
      );
  }
}

class RenderBody extends React.Component{

  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class RenderBodyInfo extends React.Component{

  render() {

    const product = this.props.product;
    const name = product.stocked ? product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class CustomTabel extends React.Component {
    
  render() {
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <RenderBody
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <RenderBodyInfo
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table className='Table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody >
        {rows}
        </tbody>
      </table>
    );
  }
}

class CustomClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anothercontstant : ''
    };

  }

  render() {
    return (
      <div>
      <p> Just a paragraph to show its working.</p>
      <div className="Custom"> 
      <p>
      Full Name and blah blah.
      <CustomTabel products={this.props.products}/>
      </p> 
      </div></div>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">First React App</h1>
        </header>
        <p className="App-intro">
          Started editing the application.
        <CustomClass products={PRODUCTS}/>
        <GitApi/>
        </p>

      </div>
    );
  }
}

export default App;
