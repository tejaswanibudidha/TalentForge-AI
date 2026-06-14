const POSTS_KEY = 'talentforge_community_posts';

function loadPosts() {
  try {
    return JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function getPosts() {
  return loadPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function savePost({ author, role, title, content, tags }) {
  const posts = loadPosts();
  const newPost = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    author,
    role,
    title,
    content,
    tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
    createdAt: new Date().toISOString()
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
}
