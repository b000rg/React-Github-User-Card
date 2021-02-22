import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import User from "./User";

class Users extends React.Component {
  DEFAULT_USER = "b000rg";

  constructor() {
    super();
    this.state = { userList: [] };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      userList: [this.fetchUser(this.DEFAULT_USER)],
    });
  }

  render() {
    return (
      <Container>
        {this.state.userList.map(
          (user) =>
            user && (
              <User
                user={user}
                fetchUser={this.fetchUser}
                removeUser={this.removeUser}
                userIsInList={this.userIsInList}
                key={user.id}
              />
            )
        )}
      </Container>
    );
  }

  fetchUser = (userToFetch) => {
    if (!this.state.userList.some((user) => userToFetch === user?.login))
      axios
        .get(`https://api.github.com/users/${userToFetch}`)
        .then((res) => {
          this.setState({
            ...this.state,
            userList: [...this.state.userList, this.scrubUserData(res.data)],
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  removeUser = (userToRemove) => {
    this.setState({
      ...this.state,
      userList: this.state.userList.filter(
        (user) => user?.login !== userToRemove.login
      ),
    });
  };

  userIsInList = (userToCheckFor) =>
    this.state.userList.some((user) => userToCheckFor === user?.login);

  scrubUserData = (data) => {
    let {
      login,
      name,
      id,
      followers_url,
      following_url,
      html_url,
      avatar_url,
      bio,
    } = data;
    following_url = new RegExp(/[A-Za-z0-9_/:.]*/).exec(following_url)[0];
    return {
      login,
      name,
      id,
      followers_url,
      following_url,
      html_url,
      avatar_url,
      bio,
    };
  };
}

export default Users;
