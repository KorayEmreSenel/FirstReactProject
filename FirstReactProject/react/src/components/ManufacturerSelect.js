import {
  DropdownButton,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const listElement = (item, onClick) => {
  return (
    <button onClick={onClick} id={item}>
      {item.split("-").join(" ").split("  ").join(" - ")}
    </button>
  );
};

function ManufacturerSelect({ onClick, button }) {
  const [input, setInput] = useState("");
  const [manuList, setManuList] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const responseData = await axios.get(
          `http://localhost:3002/items?itemType_like=${button}`
        );
        return responseData.data;
      } catch (error) {
        console.error(error);
      }
    }
    getData().then(setResponse);
  }, [button]);

  useEffect(() => {
    response.map((item) => {
      if (manuList.indexOf(item.manufacturer) === -1) {
        setManuList([...manuList, item.manufacturer].sort());
      }
      return true;
    });
  }, [response, manuList]);

  return (
    <InputGroup>
      <DropdownButton
        id={`dropdown-button-drop-`}
        title="Manufacturer"
        variant="outline-primary"
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        {manuList.map((item) => listElement(item, onClick))}
      </DropdownButton>

      {input !== "" && (
        <ListGroup.Item action href="#" id="">
          <span style={{ color: "red" }}>Clear selection</span>
        </ListGroup.Item>
      )}
    </InputGroup>
  );
}

export default ManufacturerSelect;
