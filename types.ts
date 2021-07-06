export interface Meeting {
    id: number;
    name?: string;
    description?: string;
    dateRanges?: DateRange[]
    participants?: User[]
}

export interface DateRange {
    id: number;
    start: Date;
    end: Date;
    user: User;
    userId?: number;
    meeting: Meeting;
    meetingId?: number;
}

export interface User {
    id: number;
    username?: string;
    password?: string;
    meetings?: Meeting[];
    dateRanges?: DateRange[];
}