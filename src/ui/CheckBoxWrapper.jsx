import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  input {
    width: 2.2rem;
    height: 2.2rem;
    accent-color: var(--color-brand-600);
    cursor: pointer;
  }

  label {
    font-size: 1.6rem;
    color: var(--color-grey-700);
    cursor: pointer;
  }
`;

export default CheckboxWrapper;
