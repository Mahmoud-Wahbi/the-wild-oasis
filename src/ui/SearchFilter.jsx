import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.65rem 1rem;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-400);
  }
`;

const SearchInput = styled.input`
  width: 20rem;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-grey-700);
  font: inherit;

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

function SearchFilter({ searchField = "search", placeholder = "Search..." }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get(searchField) || "";

  function handleChange(e) {
    const value = e.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (value) nextSearchParams.set(searchField, value);
    else nextSearchParams.delete(searchField);

    nextSearchParams.delete("page");
    setSearchParams(nextSearchParams);
  }

  return (
    <SearchWrapper>
      <HiMagnifyingGlass />
      <SearchInput
        type="search"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </SearchWrapper>
  );
}

export default SearchFilter;
