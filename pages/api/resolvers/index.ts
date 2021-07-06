import { GraphQLScalarType, Kind } from "graphql";
import prisma from "../../../lib/prisma";

type MeetingCreateInput = {
    name?: string;
    description?: string;
};

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value: Date) {
        return value.getTime();
    },
    parseValue(value: string | number | Date) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10));
        }
        return null;
    }
});

export const resolvers = {
    Date: dateScalar,
    Query: {
        getMeetings: async () => {
            return await prisma.meeting.findMany();
        },
        getMeeting: async (parent: any, args: { id: number }) => {
            return await prisma.meeting.findUnique({
                where: { id: args.id }
            });
        },
        getUsers: async () => {
            return await prisma.user.findMany();
        },
        getUser: async (parent: any, args: { id: number }) => {
            return await prisma.user.findUnique({
                where: { id: args.id }
            });
        }
    },
    Mutation: {
        createMeeting: (parent: any, args: { data: MeetingCreateInput }) => {
            return prisma.meeting.create({
                data: {
                    name: args.data.name,
                    description: args.data.description
                }
            });
        }
    },
    Meeting: {
        dateRanges: (parent: any, args: any) => {
            return prisma.meeting.findUnique({
                where: { id: parent?.id }
            }).dateRanges();
        },
        participants: (parent: any, args: any) => {
            return prisma.meeting.findUnique({
                where: { id: parent?.id }
            }).participants();
        }
    },
    User: {
        meetings: (parent: any, args: any) => {
            return prisma.user.findUnique({
                where: { id: parent?.id }
            }).meetings();
        },
        dateRanges: (parent: any, args: any) => {
            return prisma.user.findUnique({
                where: { id: parent?.id }
            }).dateRanges();
        }
    },
    DateRange: {
        meeting: (parent: any, args: any) => {
            return prisma.dateRange.findUnique({
                where: { id: parent?.id }
            }).meeting();
        },
        user: (parent: any, args: any) => {
            return prisma.dateRange.findUnique({
                where: { id: parent?.id }
            }).user();
        }
    } 
}