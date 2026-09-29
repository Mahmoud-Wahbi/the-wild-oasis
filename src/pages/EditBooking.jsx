import { useNavigate } from "react-router-dom";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import ButtonText from "../ui/ButtonText";
import CreateBookingForm from "../features/bookings/CreateBookingForm";
import { useBooking } from "../features/bookings/useBooking";

function EditBooking() {
  const { booking, isLoading, error } = useBooking();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (error || !booking) return <Empty resourceName="booking" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Edit Booking #{booking.id}</Heading>
        <ButtonText onClick={() => navigate(`/booking/${booking.id}`)}>
          &larr; Back
        </ButtonText>
      </Row>
      <CreateBookingForm bookingToEdit={booking} />
    </>
  );
}

export default EditBooking;
