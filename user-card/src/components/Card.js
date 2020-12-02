import React from 'react';
import styled from 'styled-components';

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
            <CardContainer>
                <Username>{this.username}</Username>
                <Avatar src={this.picture} alt={`${this.username} avatar`} />
                {(this.name) ?
                    <p>{this.name}</p>
                : null}
                {(this.followers) ?
                    <FollowerList followers={this.followers} retrieveUser={this.props.retrieveUser} />
                : null}
            </CardContainer>
        );
    };
};

const CardContainer = styled.div`
    /* display: inline-block; */
    width: 25%;
    margin: 10px;
    padding: 20px;
    border-radius: 15px;
    background-color: beige;
    text-align: center;
`;

const Avatar = styled.img`
    display: block;
    max-width: 90%;
    margin: 10px auto;
`;

const Username = styled.h3`
    margin: 5px;
    margin-bottom: 0;
    font-size: 2em;
`;
