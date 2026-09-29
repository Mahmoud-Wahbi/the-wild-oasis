import { useSearchParams } from "react-router-dom";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGuests } from "./useGuests";

function GuestTable() {
  const { data: guests = [], isLoading, error } = useGuests();
  const [searchParams] = useSearchParams();
  const searchValue = (searchParams.get("guestSearch") || "").toLowerCase();

  if (isLoading) return <Spinner />;
  if (error) return <Empty customText={error.message} />;

  const filteredGuests = guests.filter((guest) =>
    [guest.fullName, guest.emailAddress, guest.natinalID, guest.nationality]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(searchValue)),
  );

  if (!filteredGuests.length) return <Empty resourceName="guests" />;

  return (
    <Table columns="1.6fr 2fr 1.5fr 1.5fr">
      <Table.Header>
        <div>Guest</div>
        <div>Email</div>
        <div>Nationality</div>
        <div>National ID</div>
      </Table.Header>

      <Table.Body
        data={filteredGuests}
        render={(guest) => <GuestRow key={guest.id} guest={guest} />}
      />
    </Table>
  );
}

export default GuestTable;
