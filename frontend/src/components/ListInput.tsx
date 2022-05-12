import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

export interface ListProps {
  onChange?: (items: string[]) => void;
  value?: string[];
  maxListCount?: number;
  header?: string;
  placeholder?: string;
}

const ListInput: React.FunctionComponent<ListProps> = ({
  onChange,
  value,
  maxListCount,
  header = 'Values',
  placeholder = 'Enter text followed by ENTER...'
}) => {
  const [item, setItem] = React.useState('');
  const [list, setList] = useState<string[]>(value || []);

  const rerender = () => {
    // see https://stackoverflow.com/a/67354136/147530
    // for why we need to use slice
    setList([...list]);
    // using the pattern here: https://stackoverflow.com/a/70443467/147530
    // it is the simplest thing to do and it works
    onChange && onChange(list);
  };

  const handleUp = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    const temp = list[i];
    list[i] = list[i - 1];
    list[i - 1] = temp;
    rerender();
  };

  const handleDown = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    const temp = list[i];
    list[i] = list[i + 1];
    list[i + 1] = temp;
    rerender();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    list.splice(i, 1);
    rerender();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // @ts-ignore
      list.push(item);
      rerender();
      setItem('');
      event.preventDefault();
    }
  };

  // https://stackoverflow.com/a/49482317/147530
  // this method converts the list into an HTML table
  // for rendering
  const getTableBodyAsReactElement = () => {
    if (!list) {
      return null;
    }
    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th scope="col">{header}</th>
          </tr>
        </thead>
        <tbody>
        {/* eslint-disable-next-line no-shadow */}
          {list.map((item, i) => {
            // the keys are there to take care of react warning otherwise
            return (
              <tr key={i}>
                <td>
                  <Button
                    key={`${i  }:del`}
                    variant="light"
                    onClick={(e) => handleDelete(e, i)}
                  >
                    {String.fromCharCode(10006)}
                  </Button>
                  {item}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const renderAddButton = () => {
    return (
      <Form.Control
        type="text"
        value={item}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    );
  };

  // the render method should render the list of files
  // and display a button to choose more files
  return (
    <>
      {renderAddButton()}
      {getTableBodyAsReactElement()}
    </>
  );
};

export default ListInput;
