
document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('posts');
    const postForm = document.getElementById('postForm');
  
  
    const fetchPosts = async () => {
      const response = await fetch('/posts');
      const posts = await response.json();
      postsContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        postsContainer.appendChild(postElement);
      });
    };
  
  
    fetchPosts();
  

    postForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
  
    
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      fetchPosts();
  
      postForm.reset();
    });
  });
  