import React from 'react'
import "./blog.css"
const BlogContent = ({ content }: { content: string }) => {
  return (
    <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: content }}>

    </div>
  )
}

export default BlogContent