import React, { useState, useEffect } from 'react';
import { Input, Modal, List, Typography, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';

const { Search } = Input;
const { Text } = Typography;

const GlobalSearch = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Phím tắt Ctrl + K để mở search
  useKeyboardShortcut('k', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setIsModalVisible(true);
    }
  });

  // Giả lập search results
  useEffect(() => {
    if (searchTerm) {
      // Thay thế bằng API call thực tế
      const results = [
        { id: 1, title: 'Quản lý người dùng', path: '/admin/users', type: 'page' },
        { id: 2, title: 'Tạo task mới', path: '/tasks/create', type: 'action' },
        { id: 3, title: 'Cài đặt hệ thống', path: '/admin/settings', type: 'page' },
      ].filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSelect = (item) => {
    navigate(item.path);
    setIsModalVisible(false);
    setSearchTerm('');
  };

  return (
    <>
      <Search
        placeholder="Tìm kiếm (Ctrl + K)"
        allowClear
        onSearch={() => setIsModalVisible(true)}
        style={{ width: 200 }}
        className="desktop-only"
      />
      <Modal
        title="Tìm kiếm"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSearchTerm('');
        }}
        footer={null}
        width={600}
      >
        <Search
          placeholder="Nhập từ khóa tìm kiếm..."
          allowClear
          autoFocus
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <List
          dataSource={searchResults}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleSelect(item)}
              style={{ cursor: 'pointer' }}
            >
              <Space>
                <SearchOutlined />
                <div>
                  <div>{item.title}</div>
                  <Text type="secondary">{item.path}</Text>
                </div>
              </Space>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default GlobalSearch; 