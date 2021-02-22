import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import xIcon from "../assets/x.svg";

// this.props.user = {login, name, id, followers_url, following_url, html_url, avatar_url, followersList, followingList, bio}
class User extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { followersList: [], followingList: [] };
  }

  componentDidMount() {
    this.fetchFollows(this.props.user);
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>
            {this.props.user.login}
            <img
              src={xIcon}
              alt="remove card"
              onClick={() => {
                this.removeUser(this.props.user);
              }}
              style={{ width: "15px" }}
            />
          </Card.Title>
          <Card.Subtitle>{this.props.user.name}</Card.Subtitle>
          <Card.Img
            src={this.props.user.avatar_url}
            alt={`${this.props.user.login} avatar`}
          />
        </Card.Header>
        <Card.Body>
          <Card.Text>{this.props.user.bio}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {this.state.followersList && (
            <DropdownButton
              id={`${this.props.user.login}-followers-dropdown`}
              drop="up"
              title="Followers"
            >
              {this.state.followersList.map((user) => (
                <Dropdown.Item
                  active={
                    this.state.followersList.find(
                      (follower) => follower.login === user.login
                    ).selected
                  }
                  key={user.login}
                  onClick={() => {
                    this.handleDropdown(user);
                  }}
                >
                  {user.login}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          )}
          {this.state.followingList && (
            <DropdownButton
              id={`${this.props.user.login}-following-dropdown`}
              drop="up"
              title="Following"
            >
              {this.state.followingList.map((user) => (
                <Dropdown.Item
                  active={
                    this.state.followingList.find(
                      (following) => following.login === user.login
                    ).selected
                  }
                  key={user.login}
                  onClick={() => {
                    this.handleDropdown(user);
                  }}
                >
                  {user.login}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          )}
        </Card.Footer>
      </Card>
    );
  }

  fetchFollows = (user) => {
    axios
      .get(user.followers_url)
      .then((res) => {
        this.setState({
          ...this.state,
          followersList: this.scrubFollowData(res.data),
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(user.following_url)
      .then((res) => {
        this.setState({
          ...this.state,
          followingList: this.scrubFollowData(res.data),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeUser = (userToRemove) => {
    this.setState({
      ...this.state,
      followingList: this.state.followingList.map((user) =>
        user.login !== userToRemove.login ? user : { ...user, selected: false }
      ),
      followersList: this.state.followersList.map((user) =>
        user.login !== userToRemove.login ? user : { ...user, selected: false }
      ),
    });
    this.props.removeUser(userToRemove);
  };

  handleDropdown = (user) => {
    if (this.props.userIsInList(user.login)) this.removeUser(user);
    else this.props.fetchUser(user.login);
  };

  scrubFollowData = (data) => {
    return data.map((user) => {
      let { login } = user;
      return { login, selected: this.props.userIsInList(user.login) };
    });
  };
}

export default User;
