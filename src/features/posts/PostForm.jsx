import { Button, Form, FormGroup } from "react-bootstrap";

export default function PostForm(props) {
  // targetId sera utilisé comme requestType 'update_post ou create_post)
  const { onSubmit, onChange, postText, targetId} = props;
  return (
    <Form className="post-form" id={targetId} onSubmit={onSubmit}>
      <FormGroup className="form-group">
        <Form.Control
          as="textarea"
          rows={5}
          name="text"
          defaultValue={postText}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup className="right-btn">
        <Button type="submit">Enregistrer</Button>
      </FormGroup>
    </Form>
  );
}
