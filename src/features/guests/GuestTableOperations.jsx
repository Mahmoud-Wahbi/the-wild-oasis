import TableOperations from "../../ui/TableOperations";
import SearchFilter from "../../ui/SearchFilter";

function GuestTableOperations() {
  return (
    <TableOperations>
      <SearchFilter searchField="guestSearch" placeholder="Search guests..." />
    </TableOperations>
  );
}

export default GuestTableOperations;
