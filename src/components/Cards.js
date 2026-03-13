import React from "react";
import { Card, Row, Col, Statistic, Button } from "antd";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

function Cards({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
  cardStyle,
  reset,
}) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card bordered={false} style={cardStyle}>
          <Statistic
            title="Current Balance"
            value={currentBalance}
            precision={2}
            prefix={<DollarOutlined />}
          />
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            size="small"
            style={{ marginTop: "1rem" }}
            onClick={reset}
          >
            Reset
          </Button>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card bordered={false} style={cardStyle}>
          <Statistic
            title="Total Income"
            value={income}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
          />
          <Button
            type="primary"
            size="small"
            style={{ marginTop: "1rem" }}
            onClick={showIncomeModal}
          >
            Add Income
          </Button>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card bordered={false} style={cardStyle}>
          <Statistic
            title="Total Expenses"
            value={expenses}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
          />
          <Button
            type="primary"
            danger
            size="small"
            style={{ marginTop: "1rem" }}
            onClick={showExpenseModal}
          >
            Add Expense
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default Cards;
