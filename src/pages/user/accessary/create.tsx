import { ReactElement, useEffect, useState } from 'react'

import type { NextPageWithLayout } from '@/types/next-page'
import User from '@/components/layouts/user'
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  notification,
  Select,
  SelectProps,
  Space
} from 'antd'
import router from 'next/router'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { PlusSquareTwoTone } from '@ant-design/icons'
import axios from 'axios'
import { accessaryService } from '@/services/accessary'
import { AccessaryGroup, Unit } from '@/types/accessary'
import { Accessary } from '@/types/accessary'

const Create: NextPageWithLayout = () => {
  const [groupOptions, setGroupOptions] = useState<SelectProps['options']>([])
  const [unitOptions, setUnitOptions] = useState<SelectProps['options']>([])

  const [groupName, setGroupName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const fetchListGroupService = async () => {
    const groupRes = await accessaryService.getListGroup()
    formatGroup(groupRes)
    const unitRes = await accessaryService.getListUnit()
    formatUnit(unitRes)
  }

  useEffect(() => {
    fetchListGroupService()
  }, [])

  const formatGroup = (groups: AccessaryGroup[]) => {
    const options = [{ value: 0, label: '-- Nhóm hàng --' }]
    groups.forEach(val => {
      options.push({
        value: val.id,
        label: val.name
      })
    })
    setGroupOptions(options)
  }

  const formatUnit = (units: Unit[]) => {
    const options = [{ value: 0, label: '-- Đơn vị --' }]
    units.forEach(val => {
      options.push({
        value: val.id,
        label: val.name
      })
    })
    setUnitOptions(options)
  }

  const [messageSuccess, contextHolder] = message.useMessage()
  const onSubmit = async (group: Accessary) => {
    try {
      setLoading(true)
      await accessaryService.addAccessary(group)
      messageSuccess.success({
        type: 'success',
        content: 'Tạo phụ tùng mới thành công!',
        duration: 1,
        onClose: () => router.push('/user/accessary')
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Phụ tùng này không tồn tại!')
        } else {
          notification.destroy()
          notificationError('Vui lòng nhập đủ dữ liệu !')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const onAddGroup = async () => {
    try {
      setConfirmLoading(true)
      await accessaryService.addAccessaryGroup(groupName)
      notificationSuccess('Thêm nhóm hàng thành công!')
      fetchListGroupService()
      setModalOpen(false)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          notification.destroy()
          notificationError('Có lỗi xảy ra!')
        }
      }
    } finally {
      setConfirmLoading(false)
    }
  }

  return (
    <div
      style={{
        margin: '5px 20px',
        background: '#fff',
        padding: '10px 10px',
        borderRadius: '6px',
        height: '100%'
      }}
    >
      {contextHolder}
      <Divider
        style={{ fontSize: 25, fontWeight: 'bold' }}
        orientation="left"
        plain
      >
        Thông tin mặt hàng
      </Divider>
      <Form
        name="accessary"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        size="large"
        style={{ maxWidth: 650 }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item label="Nhóm hàng" style={{ marginBottom: 0 }}>
          <Form.Item
            name="accessary_group_id"
            initialValue={0}
            style={{ display: 'inline-block', width: 'calc(90% - 10px)' }}
          >
            <Select options={groupOptions} />
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(1%)',
              margin: '0 15px'
            }}
          >
            <Button
              style={{ padding: 0, borderColor: 'white' }}
              type="text"
              block
              onClick={() => {
                setModalOpen(true)
              }}
            >
              <PlusSquareTwoTone
                style={{ fontSize: 40 }}
                twoToneColor=" #52c41a "
              />
            </Button>
            <Modal
              title="NHÓM MẶT HÀNG"
              style={{ top: 200 }}
              open={modalOpen}
              onOk={() => onAddGroup()}
              onCancel={() => setModalOpen(false)}
              okText="Thêm mới"
              cancelText="Đóng lại"
              confirmLoading={confirmLoading}
            >
              <span>Tên nhóm hàng:</span>
              <Input onChange={e => setGroupName(e.target.value)} />
            </Modal>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Mã hàng"
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập mã hàng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên hàng"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên mặt hàng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Đơn vị tính" name="unit_id" initialValue={0}>
          <Select options={unitOptions} />
        </Form.Item>
        <Form.Item
          label="Giá bán"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Miêu tả" name="description" initialValue={''}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Space style={{ display: 'flex', marginLeft: '100px' }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Tạo mới
            </Button>
            <Button
              size="large"
              onClick={() => {
                router.push('/user/accessary')
              }}
            >
              Quay lại
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Divider />
    </div>
  )
}

Create.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Create
