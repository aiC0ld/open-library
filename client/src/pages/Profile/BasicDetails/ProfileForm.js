import { Col, Form, message, Modal, Row } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function ProfileForm({
    open,
    setOpen,
    reloadUser,
    setFormType,
    formType,
    selectedUser,

}) {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());

            values.createdBy = user._id;
            let response = null;
            if (formType === "update") {
                values._id = selectedUser._id;
                response = await UpdateUser(values);
            }
            if (response.success) {
                message.success(response.message);
                setOpen(false);
                window.location.reload(false);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <Modal
            title={formType === "update" ? "Update User Profile" : ""}
            open={open}
            onCancel={() => setOpen(false)}
            centered
            width={800}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    ...selectedUser
                }}
            >
                <Row gutter={[20]}></Row>
                <Col span={24}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input user name" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input user email" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: "Please input user phone number" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>

                <div className="flex justify-end gap-2 mt-1">
                    <Button
                        type="button"
                        variant="outlined"
                        title="Cancel"
                        onClick={() => setOpen(false)}
                    />
                    <Button title="Save" type="submit" />
                </div>
            </Form>
        </Modal>
    );
}

export default ProfileForm;
