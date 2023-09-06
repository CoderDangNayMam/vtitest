import axios from "axios";
import * as React from "react";
import { useState, useContext } from "react";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";

import { useRef } from "react";

// import thư viện antd
import { Button, Divider, Space, notification } from "antd";

import { Context } from "./root";
import { ContextValue } from "./contextValue";

export default function DataEditComponent() {
  // khai bao input ref name
  const inputRefName = useRef(null);
  const inputRefAddress = useRef(null);
  const inputRefPhone = useRef(null);
  const inputRefAvatar = useRef(null);

  const [contact, setContact] = useState({
    name: "",
    address: "",
    avatar: "",
    phone: "",
  });
  const paramUrl = useParams("dataId");
  const navigate = useNavigate();

  React.useEffect(() => {
    // call api get lay ra chi tiet cua item user data
    let data = "";
    axios
      .get(
        "https://643d4c83f0ec48ce90586ead.mockapi.io" +
          `/${paramUrl?.dataId}`
      )
      .then((res) => setContact(res.data))
      .then();
  }, []);

  const handlePostData = async () => {
   
    const dataPost = {
        name: inputRefName.current.value,
        phone: inputRefPhone.current.value,
        address: inputRefAress.current.value,
        avatar: inputRefAvatar.current.value
    }


    // call api
// dùng async await để tránh bất đống bộ
    await axios.put(envApi + `/${paramUrl?.dataId}`, dataPost).then(res => {
        console.log('oke');
    }).then ( () => {
        openNotification('topLeft'); //Sau khi call api thành công thì hiện ra thông báo
    }).then(() => {
        setTimeout(() => {
            navigate('/data');
        }, 3000); // Sau 3000ms thì trở về trang data
    }).catch(err => console.log(err, 'opp'));
    return;
}


    // khai bao context khoi tao
    const [api, contextHolder] = notification.useNotification();
    // khoi tao mở ra thông báo lấy dữ liệu từ contex
    const openNotification = (placement) => {
      api.info({
        message: `Notification ${placement}`,
        description: (
          <Context.Consumer>
            {({ name, file }) => `Hello, ${name} - ${file}!`}
          </Context.Consumer>
        ),
        placement,
      });
    };

  const handleCancel = () => {
    navigate('/data');
};
  return (
    <>
      {contextHolder}

    <ContextValue></ContextValue>

      <Button type="primary" onClick={() => openNotification("topLeft")}>
        Top Left
      </Button>

      <Form id="contact-form">
        <p>
          <span>Name</span>
          <input
            placeholder="name"
            aria-label="Last name"
            type="text"
            name="name"
            ref={inputRefName}
            defaultValue={contact.name}
          />
        </p>
        <label>
          <span>Adress</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            ref={inputRefAddress}
            defaultValue={contact.address}
          />
        </label>
        <label>
          <span>Avatar</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </label>
        <label>
          <span>phone</span>
          <input
            type="text"
            name="phone"
            placeholder="@098"
            defaultValue={contact.phone}
          />
        </label>
        <p>
          <button type="button" onClick={handlePostData}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </p>
        <p key="list-loadmore-more" onClick={() => handleShowModal(item, index)}>
        more
      </p>
      </Form>
    </>
  );
}
