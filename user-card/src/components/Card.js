import React from 'react';

import FollowerList from './FollowerList';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.username = this.props.user.login;
        this.picture = this.props.user.avatar_url;
        this.name = this.props.user.name;
        this.followers = this.props.followerList[this.username];
    };
    
    render() {
        return (
            <div>
                <h3>{this.username}</h3>
                <img src={this.picture} alt={`${this.username} avatar`} />
                {(this.name) ?
                    <p>{this.name}</p>
                : null}
                {(this.followers) ?
                    <FollowerList followers={this.followers} retrieveUser={this.props.retrieveUser} />
                : null}
            </div>
        );
    };
};