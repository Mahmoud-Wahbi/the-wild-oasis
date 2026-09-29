import styled from "styled-components";

import Table from "../../ui/Table";
import { Flag } from "../../ui/Flag";

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
`;

function GuestRow({ guest }) {
  return (
    <Table.Row>
      <Guest>{guest.fullName}</Guest>
      <div>{guest.emailAddress}</div>
      <Guest>
        {guest.countryFlag && (
          <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
        )}
        {guest.nationality}
      </Guest>
      <div>{guest.natinalID}</div>
    </Table.Row>
  );
}

export default GuestRow;
