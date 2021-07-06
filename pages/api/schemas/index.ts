import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    scalar Date

    type User {
        id: Int!
        username: String
        password: String
        meetings: [Meeting]
        dateRanges: [DateRange]
    }

    type DateRange {
        id: Int!
        start: Date!
        end: Date!
        user: User!
        userId: Int
        meeting: Meeting!
        meetingId: Int
    }

    type Meeting {
        id: Int!
        name: String
        description: String
        dateRanges: [DateRange]
        participants: [User]
    }

    type Query {
        getMeetings: [Meeting]
        getMeeting(id: Int!): Meeting
        getUsers: [User]
        getUser(id: Int!): User
    }

    input MeetingCreateInput {
        name: String
        description: String
    }

    type Mutation {
        createMeeting(data: MeetingCreateInput!): Meeting
    }
`;