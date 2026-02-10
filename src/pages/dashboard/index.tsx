import {
  FloatAutoComplete,
  FloatCascader,
  FloatDatePicker,
  FloatFormItem,
  FloatInput,
  FloatInputNumber,
  FloatItemList,
  FloatPassword,
  FloatRangePicker,
  FloatSelect,
  FloatTimePicker,
} from "@/components/antd-float-label"
import { BasicTable } from "@/components/basic-table"
import { Button, Col, Form, Row } from "antd"
import dayjs from "dayjs"
import { useEffect } from "react"

function Dashboard() {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      field1: "Initial Value",
      field2: "Initial Value",
      field3: dayjs(),
      field4: "Initial Input",
      field5: 1000,
      field6: "password123",
      field7: [dayjs(), dayjs().add(1, "day")],
      field8: dayjs(),
      field9: "1",
    })
  }, [])
  return (
    <section>
      <div className="text-lg font-medium">Mời bạn chọn phân hệ làm việc</div>
      <div className="mt-2">
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <FloatItemList name="float-items">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Col span={8} key={field.key}>
                      <FloatFormItem name={field.name} rules={[{ required: true }]} label="FloatFormItem ">
                        <FloatInput />
                      </FloatFormItem>
                    </Col>
                  ))}
                  <Col span={24} className="mb-4">
                    <Button type="dashed" onClick={() => add()} block>
                      Add FloatFormItem
                    </Button>
                  </Col>
                </>
              )}
            </FloatItemList>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <FloatFormItem name={"field1"} rules={[{ required: true }]} label="FloatAutoComplete ">
                <FloatAutoComplete value={"123123"} />
              </FloatFormItem>
            </Col>
            <Col span={8}>
              <Form.Item name={"field2"}>
                <FloatCascader placeholder="FloatCascader " required />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"field3"} rules={[{ required: true }]}>
                <FloatDatePicker placeholder="FloatDatePicker Ngày hết hạn" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"field4"} rules={[{ required: true }]}>
                <FloatInput placeholder="FloatInput " required />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"field5"} rules={[{ required: true }]}>
                <FloatInputNumber placeholder="FloatInputNumber " decimalSeparator="," required />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"field6"} rules={[{ required: true }]}>
                <FloatPassword placeholder="FloatPassword " required />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"field7"} rules={[{ required: true }]}>
                <FloatRangePicker placeholder={["StartDate", "EndDate"]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"field8"} rules={[{ required: true }]}>
                <FloatTimePicker placeholder="TimePicker" required />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"field9"} rules={[{ required: true }]}>
                <FloatSelect
                  placeholder="FloatTreeSelect"
                  required
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          <Button
            variant="solid"
            onClick={async e => {
              e.preventDefault()
              const values = await form.validateFields()
              const dateD = values.dateD
              if (dateD) {
                const d = dayjs(dateD)
                console.log("Formatted Date D:", d)
              }
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
      <BasicTable
        size="small"
        bordered
        toolBarRender={false}
        search={false}
        columns={[
          { title: "ID", dataIndex: "id", width: 60 },
          { title: "Name", dataIndex: "name", width: 120, sorter: true },
          { title: "Age", dataIndex: "age", width: 80 },
          {
            title: "Action",
            dataIndex: "action",
            width: 80,
            render: (_, record) => <a href="#">Edit {record.name}</a>,
          },
        ]}
        dataSource={[
          { id: 1, name: "John Doe", age: 28 },
          { id: 2, name: "Jane Smith", age: 34 },
          { id: 3, name: "Sam Johnson", age: 45 },
          { id: 4, name: "Alice Brown", age: 23 },
          { id: 5, name: "Bob Davis", age: 37 },
          { id: 6, name: "Charlie Wilson", age: 31 },
          { id: 7, name: "Diana Evans", age: 29 },
          { id: 8, name: "Frank Thomas", age: 41 },
          { id: 9, name: "Grace Lee", age: 27 },
          { id: 10, name: "Henry Martin", age: 36 },
          { id: 11, name: "Ivy Clark", age: 33 },
          { id: 12, name: "Jack Lewis", age: 38 },
          { id: 13, name: "Kathy Walker", age: 30 },
        ]}
      />
    </section>
  )
}

export default Dashboard
