import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import axios, { isCancel, AxiosError } from "axios";
import { Link, NavLink } from "react-router-dom";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

export default function DataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = axios
      .get("https://64e5f67f09e64530d17f54dc.mockapi.io/getInfo")
      .then((res) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
    return () => data;
  }, []);

  // show modal info
  const [isModalOpen, setIsModalOpen] = useState(false); // ban đầu setIsModalOpen là false
  // show item
  const [itemInfo, setItemInfo] = useState(null); // set info truyền vào bên trong modal
  const handleShowModal = (item, index) => {
    console.log(item, index, "=====");
    setIsModalOpen(true); // khi click vào More thì show modal

    // click ban ghi thi setiTEMINFO is item
    setItemInfo(item);
  };
  // Khi Click vào Ok hoặc Cancel thì reset lại giá trị của item và setIsModalOpen về false
  const handleOk = () => {
    setItemInfo(null);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setItemInfo(null);
    setIsModalOpen(false);
  };

  // show modal delete
  const [isModalOpenDelete, setisModalOpenDelete] = useState(false);
  // Khi click vào delete thì show modal delete
  const handleDelete = (item, index) => {
    setisModalOpenDelete(true);
    setItemInfo(item);
  };
  // Khi click Ok thì gọi đến api xóa và đóng modal, setItemInfo về null
  const handleOkeDelete = () => {
    const data = axios
      .delete(envApi + `/${itemInfo.id}`)
      .then((res) => {
        console.log("res", res);
      })
      .then(() => {
        callapi();
        setisModalOpenDelete(false);
        setItemInfo(null);
      })
      .catch((err) => console.log(err));

    return () => data;
  };
  // function khi click vào Cancel
  const handleCancelDelete = () => {
    setItemInfo(null);
    setisModalOpenDelete(false);
  };

  return (
    <>
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
            <List.Item
                actions={[
                    <NavLink
                        to={`dataDeatail/${item.id}`}
                        className={({ isActive, isPending }) =>
                            isActive
                                ? "active"
                                : isPending
                                    ? "pending"
                                    : ""
                        }
                    ><p key="list-loadmore-edit">edit</p></NavLink>,
                    <p key="list-loadmore-more"
                        onClick={() => handleShowModal(item, index)}>more</p>,
                    <p key="list-loadmore-delete"
                        onClick={() => handleDelete(item, index)}>delete</p>
                ]
                }
            >
                <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={<>{item.name}</>}
                    description={item.address + '--' + item.phone}
                />
            </List.Item>
        )}
    />

    <Modal title="model detail" open={isModalOpen} onOk={handleOk}
        onCancel={handleCancel}>
        <p>{itemInfo?.name}</p>
        <p>{itemInfo?.phone}</p>
        <p>Some contents...</p>
    </Modal>

    <Modal title="model confirm" open={isModalOpenDelete} onOk={handleOkeDelete}
        onCancel={handleCancelDelete}>
        Do u want delete item ?
    </Modal>

</>
  );
}
