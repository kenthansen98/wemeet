import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        username: String
        password: String
        meetings: [Meeting]
    }

    type DateRange {
        start: Date!
        end: Date!
        userId: ID!
    }

    type Meeting {
        id: ID!
        name: String
        description: String
        dateRanges: [DateRange]
    }

    type Query {
        getMeetings: [Meeting]
        getMeeting(id: ID!): Meeting
        getUsers: [User]
        getUser(id: ID!): User
    }
`;