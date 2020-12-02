import React from 'react';
import styled from 'styled-components';

export default class FollowerList extends React.Component {
    getNewUser = user => {
        this.props.retrieveUser(user);
    };
    
    render() {
        return (
            <div>
                <ListHeading>Followers:</ListHeading>
                <ListContainer>
                    {this.props.followers.map(follower => 
                        <Follower onClick={() => {this.getNewUser(follower.login)}} key={follower.id}>{follower.login}</Follower>
                    )}
                </ListContainer>
            </div>
        );
    };
};

const ListHeading = styled.h4`
    margin-bottom: 0;
`;

const ListContainer = styled.div`
    display: flex;
    margin: 0;
    flex-wrap: wrap;
    justify-content: center;
`;

const Follower = styled.p`
    margin: 3px 8px;
`;
