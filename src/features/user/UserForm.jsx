import { Button, Form, FormGroup } from "react-bootstrap";

export default function UserForm(props) {
  const { register, user, onSubmit, onChange } = props;
  return (
    <Form
      className={register ? "register-form" : "profile-form"}
      onSubmit={onSubmit}
    >
      <FormGroup className="form-group">
        <Form.Label>Identifiant</Form.Label>
        <Form.Control
          type="text"
          required
          name="username"
          defaultValue={user ? user.username : ""}
          onChange={onChange}
        />
      </FormGroup>
      {register && (
        <FormGroup className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            name="email"
            defaultValue={user ? user.email : ""}
            onChange={onChange}
          />
        </FormGroup>
      )}
      {register && (
        <FormGroup className="form-group">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" required name="password" />
        </FormGroup>
      )}
      {!register && (
        <FormGroup className="form-group">
          <Form.Label>Descrition</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            defaultValue={user ? user.description : ""}
            onChange={onChange}
          />
        </FormGroup>
      )}
      <FormGroup className="right-btn">
        <Button type="submit">
          Soumettre
        </Button>
      </FormGroup>
    </Form>
  );
}
