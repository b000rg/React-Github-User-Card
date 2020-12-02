import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Card from './Card';

export default class CardList extends React.Component {
    constructor() {
        super();
        this.defaultUser = 'b000rg';
    };
    
    render() {
        return (
            <ListContainer>
                {this.props.users.map(user =>
                    <Card user={user} key={user.id} followerList={this.props.followerList} retrieveUser={this.retrieveUser} />
                )}
            </ListContainer>
        );
    };

    retrieveUser = user => {
        axios
            .get(`https://api.github.com/users/${user}`)
            .then(({data}) => {
                this.props.addUser(data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.retrieveUser(this.defaultUser);
    };
};

const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
