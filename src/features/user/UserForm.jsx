import { Button, Form, FormGroup } from "react-bootstrap";

export default function UserForm({ register, onSubmit }) {
  return (
    <Form className="user-form" onSubmit={onSubmit}>
      <FormGroup className="form-group">
        <Form.Label>Identifiant</Form.Label>
        <Form.Control type="text" required name="username" />
      </FormGroup>
      <FormGroup className="form-group">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" required name="email" />
      </FormGroup>
      <FormGroup className="form-group">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" required name="password" />
      </FormGroup>
      {!register && (
        <FormGroup className="form-group">
          <Form.Label>Descrition</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" />
        </FormGroup>
      )}

      <Button type="submit">Soumettre</Button>
    </Form>
  );
}
