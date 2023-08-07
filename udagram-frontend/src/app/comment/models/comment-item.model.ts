export interface CommentItem {
    id: number;
    content: string;
    feedId: string;
}

export const commentItemMocks: CommentItem[] = [
    {
        id: 0,
        content: 'con cac',
        feedId: '0'
    },
    {
        id: 1,
        content: 'con cac 1',
        feedId: '0'
    },
    {
        id: 1,
        content: 'con cac 2',
        feedId: '1'
    }
];
