import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddGuestForm from "./AddGuestForm";

function AddGuest() {
  return (
    <Modal>
      <Modal.Open opensWindowName="guest-form">
        <Button>Add new guest</Button>
      </Modal.Open>

      <Modal.Window name="guest-form">
        <AddGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuest;
