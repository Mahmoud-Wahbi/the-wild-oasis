import styled from "styled-components";

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    height: 4.2rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
    font-size: 1.4rem;
    font-family: inherit;
  }

  .react-datepicker__input-container input:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  .react-datepicker {
    font-size: 1.4rem;
  }

  .react-datepicker__month-container {
    width: 30rem;
  }

  .react-datepicker__header {
    padding-top: 1rem;
  }

  .react-datepicker__current-month,
  .react-datepicker__month-select,
  .react-datepicker__year-select {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 3.2rem;
    line-height: 3.2rem;
    margin: 0.2rem;
  }
`;

export default DatePickerWrapper;
