import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { UseOutsideClick } from "../hooks/UseOutsideClick";
import Empty from "../ui/Empty";

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 7px;
  cursor: pointer;
  text-align: left;
  font-size: 1.6rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  height: ${({ $menuHeight }) => $menuHeight};
  overflow-y: scroll;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  box-shadow: var(--shadow-md);
  z-index: 10;
`;

const Option = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1rem;
  border: none;
  background: ${({ $active }) => ($active ? "var(--color-grey-100)" : "none")};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const ItemImage = styled.img`
  width: 11rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemName = styled.span`
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 600;
`;

function Dropdown({
  items,
  type,
  showImage = true,
  fontSize = "1.6rem",
  menuHeight = "40rem",
  disabled = false,
  initialSelectedItem = null,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const optionRefs = useRef([]);
  const searchCharRef = useRef("");

  useEffect(() => {
    if (highlightedIndex === -1) return;

    optionRefs.current[highlightedIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [highlightedIndex]);

  useEffect(() => {
    setSelectedItem(initialSelectedItem);
  }, [initialSelectedItem]);

  const ref = UseOutsideClick(() => setIsOpen(false));

  function handleSelect(item) {
    setSelectedItem(item);
    setIsOpen(false);

    onSelect?.(item);
  }

  function handleKeyDown(e) {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setHighlightedIndex((current) =>
        current < items.length - 1 ? current + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setHighlightedIndex((current) =>
        current > 0 ? current - 1 : items.length - 1,
      );
    }

    if (e.key.length === 1 && /^[a-z]$/i.test(e.key)) {
      const char = e.key.toLowerCase();

      const startIndex =
        searchCharRef.current === char ? highlightedIndex + 1 : 0;

      const firstPart = items.findIndex(
        (item, i) =>
          i >= startIndex && item.name.toLowerCase().startsWith(char),
      );

      const secondPart = items.findIndex(
        (item, i) => i < startIndex && item.name.toLowerCase().startsWith(char),
      );

      const index = firstPart !== -1 ? firstPart : secondPart;

      if (index !== -1) {
        setHighlightedIndex(index);
        searchCharRef.current = char;
      }
    }

    if (e.key === "Enter" && highlightedIndex !== -1) {
      e.preventDefault();
      handleSelect(items[highlightedIndex]);
    }
  }

  return (
    <DropdownContainer ref={ref}>
      <Trigger
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleKeyDown}
      >
        {selectedItem ? (
          <>
            {showImage && (
              <ItemImage src={selectedItem.image} alt={selectedItem.name} />
            )}
            <ItemName $fontSize={fontSize}>
              {type} ({selectedItem.name})
            </ItemName>
          </>
        ) : (
          <span>Select {type}</span>
        )}
      </Trigger>

      {isOpen && (
        <DropdownMenu $menuHeight={items.length !== 0 ? menuHeight : "7rem"}>
          {items.length === 0 ? (
            <Empty resourceName={`${type}s`} />
          ) : (
            items.map((item, index) => (
              <Option
                key={item.id || item.name}
                type="button"
                $active={index === highlightedIndex}
                ref={(el) => (optionRefs.current[index] = el)}
                onClick={() => handleSelect(item)}
              >
                {showImage && <ItemImage src={item.image} alt={item.name} />}

                <ItemName $fontSize={fontSize}>{item.name}</ItemName>
              </Option>
            ))
          )}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;
