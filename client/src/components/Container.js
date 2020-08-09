import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import Modal from "./modals/Modal";
import Form from "./Form";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Select from "./UI/Select";
import Option from "./UI/Option";

const currencies = [
  { value: "GBP", label: "£" },
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
  { value: "BTC", label: "฿" },
  { value: "JPY", label: "¥" },
];

const Container = ({
  data,
  loading,
  getData,
  addGroup,
  deleteGroup,
  addCategory,
  addItem,
  addUser,
}) => {
  const [groupOpen, setGroupOpen] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupCurrency, setGroupCurrency] = useState("GBP");
  const [groupShared, setGroupShared] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data.length === 0 && loading === false) {
      dispatch(getData(user._id));
    }
  }, [dispatch, user._id, data.length, loading, getData]);

  function submitNewGroup(e) {
    e.preventDefault();
    dispatch(
      addGroup(
        { name: groupName, currency: groupCurrency, shared: groupShared },
        { id: user._id, name: user.name }
      )
    );
    setGroupOpen(false);
  }

  return (
    <React.Fragment>
      <Button onClick={() => setGroupOpen(true)}>Add Group</Button>
      {groupOpen && (
        <Modal open={groupOpen} hide={() => setGroupOpen(false)}>
          <Form onSubmit={submitNewGroup}>
            {/* {id === "LOGIN_FAIL" ? msg : null} */}
            <Input
              name="group name"
              label="Group Name"
              type="text"
              value={groupName}
              onChange={setGroupName}
              autoFocus
            />
            <Select
              name="group currency"
              label="Group Currency"
              value={groupCurrency}
              onChange={setGroupCurrency}
              options={currencies}
            >
              {currencies.map((currency) => (
                <Option key={currency.value} value={currency.value}>
                  {currency.label}
                </Option>
              ))}
            </Select>
            <Input
              name="group shared"
              label="Group Shared"
              type="checkbox"
              value={groupShared}
              onChange={setGroupShared}
            />
            <Button type="submit">Add Group</Button>
          </Form>
        </Modal>
      )}
      {loading && <p>Loading...</p>}
      {data.map((group) => (
        <Card
          key={group._id}
          group={group}
          deleteGroup={deleteGroup}
          addCategory={addCategory}
          addItem={addItem}
          addUser={addUser}
        />
      ))}
    </React.Fragment>
  );
};

export default Container;
