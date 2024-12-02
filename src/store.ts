import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// export interface UserSlice {
//     username: string;
//     email: string;
//     setUsername: (username: string) => void;
//     setEmail: (username: string) => void;
// }

// export interface PostSlice {
//     username: string;
// }

// export const createUserSlice: StateCreator<UserSlice> = (set) => ({
//     username: '',
//     email: '',
//     setUsername: (username: string) => set(() => ({ username })),
//     setEmail: (email: string) => set(() => ({ email })),
// });

// export const createPostSlice: StateCreator<PostSlice> = (set) => ({
//     username: '',
// });

// export const useAppStore = create(
//     devtools<UserSlice>((...a) => ({
//         ...createUserSlice(...a),
//         ...createPostSlice(...a),
//     }))
// );

export interface UserStore {
    username: string;
    email: string;
    setUsername: (username: string) => void;
    setEmail: (username: string) => void;
}

export const useUserStore = create(
    devtools<UserStore>(
        (set) => ({
            username: '',
            email: '',
            setUsername: (username: string) => set(() => ({ username })),
            setEmail: (email: string) => set(() => ({ email })),
        }),
        { name: 'user', store: 'user' }
    )
);

export interface Post {
    id: string;
    title: string;
    content: string;
}

export interface PostsStore {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    addPost: (post: Post) => void;
    removePost: (id: string) => void;
}

export const usePostsStore = create(
    devtools(
        immer<PostsStore>((set) => ({
            posts: [],
            setPosts: (posts: Post[]) => set(() => ({ posts })),
            addPost: (post: Post) =>
                set((state) => {
                    state.posts.push(post);
                }),
            removePost: (id: string) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
        })),
        { name: 'posts', store: 'posts' }
    )
);
