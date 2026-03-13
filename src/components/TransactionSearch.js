import React, { useRef, useState } from "react";
import { Input, Table, Select, Radio, Button } from "antd";
import { SearchOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { parse } from "papaparse";
import { toast } from "react-toastify";
const { Search } = Input;
const { Option } = Select;

const TransactionSearch = ({
  transactions,
  exportToCsv,
  addTransaction,
  fetchTransactions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  async function importFromCsv(event) {
    try {
      const file = event.target.files[0];
      if (!file) return;
      parse(file, {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount) || 0,
            };
            await addTransaction(newTransaction, true);
          }
          toast.success("All Transactions Added");
          fetchTransactions();
        },
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      event.target.value = null;
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch = searchTerm
      ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const typeMatch = typeFilter ? transaction.type === typeFilter : true;
    return searchMatch && typeMatch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    }
    return 0;
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  return (
    <div className="transaction-search">
      <div className="controls" style={{ marginBottom: "1rem" }}>
        <Search
          placeholder="Search by name"
          onSearch={(value) => setSearchTerm(value)}
          enterButton
          style={{ maxWidth: 300 }}
        />

        <Select
          style={{ width: 150 }}
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Type"
          allowClear
        >
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>

        <Radio.Group
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Date</Radio.Button>
          <Radio.Button value="amount">Amount</Radio.Button>
        </Radio.Group>

        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          <Button
            icon={<DownloadOutlined />}
            onClick={exportToCsv}
          >
            Export
          </Button>

          <label htmlFor="file-csv">
            <Button icon={<UploadOutlined />} type="primary">
              Import
            </Button>
          </label>
          <input
            onChange={importFromCsv}
            id="file-csv"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="my-table">
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default TransactionSearch;
