import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const Header = () => {
  let history = useHistory();
  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    setCurrent(e.key);
    history.push('/');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Menu.Item key='mail' icon={<MailOutlined />}>
        Home
      </Menu.Item>
    </Menu>
  );
};

export default Header;
