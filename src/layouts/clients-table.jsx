import React, { useEffect, useMemo, useState } from "react";
// styles
import "./clients-table.css";
// libraries
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
// store
import { getCustomers, removeCustomers } from "../store/customer.store";
// UI
import TableDate from "../components/UI/table/helpers/table-date";
import CopyToClipboardId from "../components/UI/table/helpers/copy-to-clipboard-id";
// components
import Table from "../components/common/table/table";
import Button from "../components/common/button/buttons";
import CheckBox from "../common/form/checkbox";
import SearchField from "../common/form/search-field";
import Modal from "../common/form/modal";
import CreateCustomer from "../components/UI/page/create-customer/create-customer";
import EditCustomer from "../components/UI/page/edit-customer/edit-customer";

const ClientsTable = () => {
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const customers = useSelector(getCustomers());
  const dispatch = useDispatch();

  const columns = {
    checkbox: {
      path: "",
      name: "#",
      component: (customer) => (
        <CheckBox
          id={customer._id}
          onSelectedCustomers={handleSelectCustomers}
        />
      ),
    },
    name: {
      path: "name",
      name: "Имя",
    },
    education: {
      path: "id",
      name: "ID",
      component: (customer) => <CopyToClipboardId id={customer?._id} />,
    },
    email: {
      path: "email",
      name: "Email",
    },
    deferralDays: {
      path: "balance.available_amount",
      name: "Отсрочка оплаты",
    },
    createdAt: {
      path: "created_at",
      name: "Создан",
      component: (customer) => <TableDate date={customer?.created_at} />,
    },
    updatedAt: {
      path: "updated_at",
      name: "Изменен",
      component: (customer) => <TableDate date={customer?.updated_at} />,
    },
  };

  const searchedCustomers = useMemo(() => {
    let searchQueryArray = [];
    searchQueryArray = customers?.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    return searchQueryArray;
  }, [searchQuery, customers]);

  const sortedCustomers = _.orderBy(
    searchedCustomers?.length ? searchedCustomers : customers,
    [sortBy.path],
    [sortBy.order]
  );

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSelectCustomers = (id) => {
    if (!selectedCustomers.includes(id)) {
      setSelectedCustomers([...selectedCustomers, id]);
    } else {
      return setSelectedCustomers(selectedCustomers.filter((el) => el !== id));
    }
  };

  const handleDeleteCustomer = () => {
    for (let i = 0; i <= selectedCustomers.length; i++) {
      dispatch(removeCustomers(selectedCustomers[i]));
    }
    setSelectedCustomers([]);
  };

  const handleChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  useEffect(() => {
    setSortBy({ order: "desc", path: "created_at" });
  }, []);

  return (
    <div className="container-fluid">
      <h1>Наши клиенты</h1>
      <div className="d-flex justify-content-between  mb-3 mt-3">
        <div className="d-flex" style={{ gap: "1rem" }}>
          <Button
            text="Добавить клиента"
            styleBtn="success"
            dataBsToggle="modal"
            dataBsTarget="#createCustomer"
          />
          <Button
            text="Редактировать клиента"
            styleBtn="primary"
            disabled={selectedCustomers.length === 1 ? false : true}
            dataBsToggle="modal"
            dataBsTarget="#editCustomer"
          />
          <Button
            text={
              selectedCustomers.length > 1
                ? "Удалить клиентов"
                : "Удалить клиента"
            }
            styleBtn="danger"
            disabled={selectedCustomers.length > 0 ? false : true}
            onClick={handleDeleteCustomer}
          />
        </div>
        <SearchField
          placeholder="Найти клиента"
          width="30%"
          value={searchQuery}
          onChange={handleChange}
          name={searchQuery}
          icon={<i className="bi bi-search"></i>}
        />
      </div>

      <Modal
        header="Добавить клиента"
        id="createCustomer"
        component={<CreateCustomer />}
      />

      <Modal
        header="Добавить клиента"
        id="editCustomer"
        component={<EditCustomer id={selectedCustomers[0]}/>}
      />

      <Table
        onSort={handleSort}
        selectedSort={sortBy}
        columns={columns}
        data={sortedCustomers}
      />
    </div>
  );
};

export default ClientsTable;