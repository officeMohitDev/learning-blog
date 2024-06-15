import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatComments = (comments: any) => {
  // Create a map to store comments by their _id for quick access
  const commentsMap = new Map(comments.map((comment: any) => [comment._id, { ...comment, replies: [] }]));

  // Initialize an array to hold top-level comments (where isNested is false)
  const formattedComments: any[] = [];

  // Iterate through comments to group nested comments
  comments.forEach((comment: any) => {
    if (!comment.isNested) {
      // If it's a top-level comment, add it to formattedComments array
      formattedComments.push(commentsMap.get(comment._id));
    } else {
      // If it's a nested comment, find the parent comment using topCommentId
      const parentComment: any = commentsMap.get(comment.topCommentId);
      if (parentComment) {
        // Add the entire nested comment object to parentComment replies
        parentComment.replies.push(comment);
      }
    }
  });

  return formattedComments;
};