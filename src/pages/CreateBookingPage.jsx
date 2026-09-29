import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateBooking from "../features/bookings/CreateBooking";

function CreateBookingPage() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Create Booking</Heading>
      </Row>
      <CreateBooking />
    </>
  );
}

export default CreateBookingPage;
