import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Room } from "../../../app/models/Room";
import { useStore } from "../../../app/stores/store";
import { Icon, Input, List } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const RoomSearchBar: React.FC = () => {
  const { roomStore } = useStore();
  const data = roomStore.rooms;
  const [filteredData, setFilteredData] = useState<Room[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");

  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  window.addEventListener("load", () => inputRef.current?.focus());

  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);

    const newFilter: Room[] = data.filter(({ name }): boolean =>
      name.toLowerCase().includes(searchWord)
    );

    if (!searchWord) return setFilteredData([]);
    setFilteredData(newFilter);
  };

  const clearInput = (): void => {
    setFilteredData([]);
    setWordEntered("");
    inputRef.current?.focus();
  };

  return (
    <>
      <Input
        id="searchBar"
        className="searchBar"
        transparent
        focus
        icon={<Icon name="search" color="purple" />}
        placeholder="Search rooms..."
        value={wordEntered}
        onChange={handleFilter}
      />

      {filteredData.length !== 0 && (
        <List divided animated relaxed style={{ color: "white" }}>
          {filteredData.map(({ name, id }) => (
            <List.Item
              key={id}
              as={NavLink}
              onClick={() => {
                roomStore.setSelectedRoom(id);
                clearInput();
              }}
            >
              <List.Icon inverted color="violet" name="users" />
              <List.Content>{name}</List.Content>
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
};

export default observer(RoomSearchBar);
