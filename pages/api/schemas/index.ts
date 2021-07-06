import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        username: String
        password: String
        meetings: [Meeting]
        dateRanges: [DateRange]
    }

    type DateRange {
        id: ID!
        start: Date!
        end: Date!
        user: User!
        userId: Int
        meeting: Meeting!
        meetingId: Int
    }

    type Meeting {
        id: ID!
        name: String
        description: String
        dateRanges: [DateRange]
        participants: [User]
    }

    type Query {
        getMeetings: [Meeting]
        getMeeting(id: ID!): Meeting
        getUsers: [User]
        getUser(id: ID!): User
    }

    input MeetingCreateInput {
        name: String
        description: String
    }

    type Mutation {
        createMeeting(data: MeetingCreateInput!): Meeting
    }
`;