import React from "react";

interface Comment {
  id: number;
  comment: string;
}

interface UserCommentProps {
  nickname: string;
  comments: Comment[];
}

const UserComments: React.FC<UserCommentProps> = ({ nickname, comments }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{nickname}님이 작성한 댓글</h2>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        <ul className="list-none pl-3">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              {comment.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserComments;
