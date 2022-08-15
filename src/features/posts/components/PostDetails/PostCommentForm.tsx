import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { Form } from "src/components/Elements/Form/Form";
import { TextAreaField } from "src/components/Elements/Form/TextAreaField";
import { auth, database } from "src/utils/firebaseConfig";
type CommentProps = {
  comment: string;
};
export default function PostCommentForm() {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const date = new Date();
  const commentRef = collection(database, "comments");
  const handleCommentSubmit = async (data: CommentProps) => {
    await addDoc(commentRef, {
      comment: data.comment,
      postId: id,
      commentAuthor: user?.displayName,
      commentAuthorId: user?.uid,
      dateCreated: date.toLocaleDateString(),
      likes: 0,
    });
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      {({ register, formState }) => (
        <>
          <TextAreaField
            registration={register("comment", {
              required: "Please enter a comment",
            })}
            placeholder="Enter a comment here"
            error={formState.errors.comment}

          />
          <button type="submit">Submit</button>
        </>
      )}
    </Form>
  );
}