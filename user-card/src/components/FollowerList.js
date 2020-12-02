import React from 'react';

export default class FollowerList extends React.Component {
    getNewUser = user => {
        this.props.retrieveUser(user);
    };
    
    render() {
        return (
            <div>
                <h4>Followers:</h4>
                {this.props.followers.map(follower => 
                    <p onClick={() => {this.getNewUser(follower.login)}} key={follower.id}>{follower.login}</p>
                )}
            </div>
        );
    };
};
