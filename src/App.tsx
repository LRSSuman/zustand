import { useState } from 'react';
import { usePostsStore, useUserStore } from './store';

const UpdateUserform = () => {
    const { username, email, setUsername, setEmail } = useUserStore();

    return (
        <div>
            <input type='text' placeholder='name' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
    );
};

const App = () => {
    const { username, email, setUsername, setEmail } = useUserStore();
    const { posts, addPost, removePost } = usePostsStore();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postIdCounter, setPostIdCounter] = useState(0);
    return (
        <>
            <div>{username}</div>
            <div>{email}</div>
            <UpdateUserform />
            <div>
                <b>Create New Post</b>
            </div>
            <input type='text' placeholder='post title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input
                type='text'
                placeholder='post content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                onClick={() => {
                    addPost({ title, content, id: postIdCounter.toString() });
                    setPostIdCounter((prev) => prev + 1);
                    setTitle('');
                    setContent('');
                }}
            >
                Add Post
            </button>
            <div>
                <h1>Posts</h1>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button onClick={() => removePost(post.id)}>remove</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;
