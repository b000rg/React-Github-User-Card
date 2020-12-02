import React from 'react';
import axios from 'axios';

import Card from './Card';

export default class CardList extends React.Component {
    constructor() {
        super();
        this.defaultUser = 'b000rg';
    }
    
    render() {
        return (
            <div>
                {this.props.users.map(user =>
                    <Card user={user} key={user.id} followerList={this.props.followerList} retrieveUser={this.retrieveUser} />
                )}
            </div>
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
    }

    componentDidMount() {
        this.retrieveUser(this.defaultUser);
    };
};
