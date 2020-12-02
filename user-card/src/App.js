import React from 'react';
import axios from 'axios';

import CardList from './components/CardList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {users: [], followerList: {}};
  };
  
  addUser = user => {
    axios
      .get(user.followers_url)
      .then(({data}) => {
        this.setState({users: [...this.state.users, user], followerList: {...this.state.followerList, [user.login]: data}});
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <CardList users={this.state.users} addUser={this.addUser} followerList={this.state.followerList} />
      </div>
    );
  };
};

export default App;
